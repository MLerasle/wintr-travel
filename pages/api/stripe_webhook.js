import Stripe from 'stripe';
import * as Sentry from '@sentry/nextjs';
import { buffer } from 'micro';

import { sendBookingConfirmationEmail } from 'lib/sendinblue';
import { getBooking, updateBookingInFirestore } from 'lib/gcp';
import {
  findOrCreateCustomer,
  findOrCreateInvoice,
  updatePaymentIntent,
} from 'lib/stripe';

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY, {
  apiVersion: null,
});

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const requestBuffer = await buffer(req);
    const signature = req.headers['stripe-signature'];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        requestBuffer.toString(),
        signature,
        process.env.STRIPE_WEBHOOK_SECRET // Set this variable, value is given by Stripe when registering a new endpoint
      );
    } catch (error) {
      res.status(400).send(`Webhook Error: ${error.message}`);
      return;
    }

    // Now we know that we have received an event that actually originated from Stripe.
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;
      // Execute this code only after booking is prepaid
      if (
        paymentIntent.amount !== 5000 ||
        paymentIntent.amount === paymentIntent.amount_received
      ) {
        return;
      }
      try {
        const booking = await getBooking(paymentIntent.id);
        const customer = await findOrCreateCustomer(booking);
        const invoice = await findOrCreateInvoice(booking, customer);
        await updatePaymentIntent(booking.paymentIntentId, {
          customer: customer.id,
        });
        await updateBookingInFirestore(booking.paymentIntentId, {
          notification_email_timestamp: Math.floor(Date.now() / 1000),
          stripeCustomerId: customer.id,
          stripeInvoiceId: invoice.id,
          stripeInvoiceUrl: invoice.hosted_invoice_url,
          stripeInvoicePdf: invoice.invoice_pdf,
          state: 'prepaid',
        });
        await sendBookingConfirmationEmail(booking);
      } catch (error) {
        Sentry.captureException(error);
      }
    } else if (event.type === 'invoice.payment_succeeded') {
      // When an invoice is paid, i.e booking is fully paid
      const invoice = event.data.object;
      const bookingId = invoice.metadata.bookingId;
      updateBookingInFirestore(bookingId, {
        state: 'paid',
      });
    } else if (event.type === 'payment_intent.canceled') {
      // When a payment_intent is canceled (verify this), i.e booking is canceled
    }

    res.status(200).json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};

export default handler;
