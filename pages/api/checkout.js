import { parseCookies } from 'nookies';
import Stripe from 'stripe';
const Sentry = require('@sentry/node');

import { getLastDay } from 'helpers/booking';

export default async (req, res) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);
    const booking = req.body;
    let paymentIntent;

    const { paymentIntentId } = parseCookies(
      typeof window === 'undefined' ? { req } : {}
    );

    // const prices = getPrices(booking.adults.length, booking.children.length);
    // const amount = Math.round(+prices.total * 100);

    // If we already have an unconfirmed paymentIntent we reuse it
    if (paymentIntentId) {
      paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      // Update its amount if it changed
      // if (amount !== paymentIntent.amount) {
      //   await stripe.paymentIntents.update(paymentIntentId, {
      //     amount,
      //   });
      // }
    } else {
      paymentIntent = await stripe.paymentIntents.create({
        amount: '500',
        currency: 'eur',
        payment_method_types: ['card'],
        receipt_email: booking.email,
        metadata: {
          firstDay: booking.firstDay,
          lastDay: getLastDay(booking.firstDay),
          email: booking.email,
          adults: booking.adults.length,
          children: booking.children.length,
        },
      });
    }
    res.status(200).json({ paymentIntent });
  } catch (error) {
    Sentry.captureException(error);
    res.status(404).json({ message: 'Une erreur est survenue', error });
  }
};
