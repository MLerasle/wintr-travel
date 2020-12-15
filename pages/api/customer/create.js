import Stripe from 'stripe';
const Sentry = require('@sentry/node');

export default async (req, res) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);
    const { name, email } = req.body;

    const customer = await stripe.customers.create({
      name,
      email,
    });

    res.status(201).json(customer);
  } catch (error) {
    Sentry.captureException(error);
    res.status(400).json({ message: 'Une erreur est survenue', error });
  }
};
