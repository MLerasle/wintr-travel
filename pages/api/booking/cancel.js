const Sentry = require('@sentry/node');

import { updateBookingInFirestore } from 'lib/gcp';
import { refundPaymentIntent, refundOrVoidInvoice } from 'lib/stripe';
import { sendBookingCancellationEmail } from 'lib/sendinblue';

export default async (req, res) => {
  if (req.method !== 'POST') {
    return;
  }

  try {
    const booking = req.body;

    if (booking.state === 'canceled') {
      return res.status(204).end();
    }

    await refundPaymentIntent(booking);
    await refundOrVoidInvoice(booking);
    await updateBookingInFirestore(booking.paymentIntentId, {
      state: 'canceled',
    });
    await sendBookingCancellationEmail(booking);

    res.status(200).json({
      message: `La réservation ${booking.paymentIntentId} a bien été annulée.`,
    });
  } catch (error) {
    Sentry.captureException(error);
    res.status(400).json({ message: 'Une erreur est survenue', error });
  }
};
