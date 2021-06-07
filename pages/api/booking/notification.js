const Sentry = require('@sentry/node');

import { sendBookingConfirmationEmail } from 'lib/sendinblue';
import { storeBookingInFirestore, updateBookingInFirestore } from 'lib/gcp';
import {
  findOrCreateCustomer,
  findOrCreateInvoice,
  updatePaymentIntent,
} from 'lib/stripe';

export default async (req, res) => {
  try {
    console.log('Req body in notification', req.body);
    const { message } = req.body;
    console.log({ message });
    if (!message) {
      throw new Error('No message received');
    }

    const booking = extractBookingFromMessage(message);
    console.log('Booking extracted from message', booking);

    await storeBookingInFirestore(booking);
    console.log('Booking stored in Firestore');
    const customer = await findOrCreateCustomer(booking);
    console.log('Customer found', customer);
    const invoice = await findOrCreateInvoice(booking);
    console.log('Invoice found', invoice);
    await updatePaymentIntent(booking.paymentIntentId, {
      customer: customer.id,
    });
    console.log('Payment intent updated with customer informations');
    await updateBookingInFirestore(booking.paymentIntentId, {
      notification_email_timestamp: Math.floor(Date.now() / 1000),
      stripeCustomerId: customer.id,
      stripeInvoiceId: invoice.id,
      stripeInvoiceUrl: invoice.hosted_invoice_url,
      stripeInvoicePdf: invoice.invoice_pdf,
    });
    console.log('Booking updated in Firestore');
    await sendBookingConfirmationEmail(booking);
    console.log('Confirmation email sent');

    res.status(201).end();
  } catch (error) {
    console.log('Error in notification', error);
    Sentry.captureException(error);
    res.status(400).json({
      message: 'Error while sending notification',
      error,
    });
  }
};

const extractBookingFromMessage = (message) => {
  const buffer = Buffer.from(message.data, 'base64');
  const data = buffer && buffer.toString();
  return data && JSON.parse(data);
};
