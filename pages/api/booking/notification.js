const Sentry = require('@sentry/node');

import { sendBookingConfirmationEmail } from 'lib/sendinblue';
import { storeBookingInFirestore, updateBookingInFirestore } from 'lib/gcp';
import {
  findOrCreateCustomer,
  findOrCreateInvoice,
  updatePaymentIntent,
} from 'lib/stripe';

export default async (req, res) => {
  let booking;

  try {
    const message = req.body ? req.body.message : null;
    if (!message) {
      throw new Error('No message received');
    }

    booking = extractBookingFromMessage(message);

    await storeBookingInFirestore(booking);
    const customer = await findOrCreateCustomer(booking);
    const invoice = await findOrCreateInvoice(booking);
    await updatePaymentIntent(booking.paymentIntentId, {
      customer: customer.id,
    });
    await updateBookingInFirestore(booking.paymentIntentId, {
      notification_email_timestamp: Math.floor(Date.now() / 1000),
      stripeCustomerId: customer.id,
      stripeInvoiceId: invoice.id,
      stripeInvoiceUrl: invoice.hosted_invoice_url,
      stripeInvoicePdf: invoice.invoice_pdf,
    });
    await sendBookingConfirmationEmail(booking);

    res.status(201).end();
  } catch (error) {
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
