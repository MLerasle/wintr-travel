import { parseCookies } from 'nookies';
import Stripe from 'stripe';

export default async (req, res) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);
    const booking = req.body;
    let paymentIntent;

    const { paymentIntentId } = parseCookies(
      typeof window === 'undefined' ? { req } : {}
    );

    const bookingPrice = Math.round(+booking.totalPrice * 100);

    // If we already have an unconfirmed paymentIntent we reuse it
    if (paymentIntentId) {
      paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      // Update its amount if it changed
      if (bookingPrice !== paymentIntent.amount) {
        await stripe.paymentIntents.update(paymentIntentId, {
          amount: bookingPrice,
        });
      }
    } else {
      paymentIntent = await stripe.paymentIntents.create({
        amount: bookingPrice,
        currency: 'eur',
        payment_method_types: ['card'],
        // Temp before verifying the integration
        metadata: { integration_check: 'accept_a_payment' },
      });
    }

    res.status(200).json({ paymentIntent });
  } catch (error) {
    console.log('ERROR', { error });
    res.status(404).json({ message: 'Une erreur est survenue', error });
  }
};
