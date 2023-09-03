import { updateBookingInFirestore } from 'lib/gcp';
import { refundPaymentIntent, refundOrVoidInvoice } from 'lib/stripe';

async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }

  const booking = req.body;

  if (booking.state === 'canceled') {
    return res.status(204).end();
  }

  await refundPaymentIntent(booking);
  await refundOrVoidInvoice(booking);
  await updateBookingInFirestore(booking.paymentIntentId, {
    state: 'canceled',
  });

  res.status(200).json({
    message: `La réservation ${booking.paymentIntentId} a bien été annulée.`,
  });
}

export default handler;
