import Stripe from 'stripe';
import Sentry from '@sentry/node';

export default async (req, res) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);
    const { firstname, lastname, email } = req.body;

    const customers = await stripe.customers.list({ email });
    let customer;

    if (customers.data.length > 0) {
      customer = customers.data[0];
    } else {
      customer = await stripe.customers.create({
        name: `${firstname} ${lastname}`,
        email,
      });
    }

    res.status(201).json(customer);
  } catch (error) {
    Sentry.captureException(error);
    res.status(400).json({ message: 'Une erreur est survenue', error });
  }
};
