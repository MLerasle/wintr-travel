import { parseCookies } from 'nookies';
import Stripe from 'stripe';
import * as Sentry from '@sentry/node';

export default async (req, res) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);
    const { email, firstDay, adults, children } = req.body;
    let paymentIntent;
    const { paymentIntentId } = parseCookies({ req });

    // If we already have an unconfirmed paymentIntent we reuse it
    if (paymentIntentId) {
      paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    } else {
      paymentIntent = await stripe.paymentIntents.create({
        amount: '500',
        currency: 'eur',
        payment_method_types: ['card'],
        receipt_email: email,
        metadata: {
          firstDay,
          email,
          adults: adults.length,
          children: children.length,
        },
      });
    }
    res.status(200).json({ paymentIntent });
  } catch (error) {
    Sentry.captureException(error);
    res.status(404).json({ message: 'Une erreur est survenue', error });
  }
};
