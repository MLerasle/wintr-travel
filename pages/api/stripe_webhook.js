import Stripe from 'stripe';
import { buffer } from 'micro';

import { updateBookingInFirestore } from 'lib/gcp';

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

    if (event.type === 'invoice.payment_succeeded') {
      // Quand une facture a été payée, i.e la réservation est payée intégralement.
      const invoice = event.data.object;
      const bookingId = invoice.metadata.bookingId;
      updateBookingInFirestore(bookingId, {
        state: 'paid',
      });
    } else if (event.type === 'payment_intent.canceled') {
      // Quand un payment_intent est annulé (à vérifier), i.e une réservation est annulée
    }

    res.status(200).json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};

export default handler;
