import Stripe from 'stripe';
const Sentry = require('@sentry/node');

export default async (req, res) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);
    const { paymentIntentId, customerId } = req.body;

    await stripe.paymentIntents.update(paymentIntentId, {
      customer: customerId,
    });

    res.status(201).json({});
  } catch (error) {
    Sentry.captureException(error);
    res.status(400).json({ message: 'Une erreur est survenue', error });
  }
};
