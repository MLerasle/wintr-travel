import Stripe from 'stripe';
import Sentry from '@sentry/node';

import { UNIT_ADULT_PRICE, UNIT_CHILD_PRICE } from 'data/booking';
import { dayBeforeTimestamp } from 'helpers/dates';

export default async (req, res) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);
    const booking = req.body;

    const adultsPackQuantity = booking.adults.length;
    const childrenPackQuantity = booking.children.length;

    await stripe.invoiceItems.create({
      customer: booking.stripeCustomerId,
      currency: 'eur',
      quantity: adultsPackQuantity,
      unit_amount: UNIT_ADULT_PRICE * 100,
      description: 'Pack Adulte',
    });

    if (childrenPackQuantity > 0) {
      await stripe.invoiceItems.create({
        customer: booking.stripeCustomerId,
        currency: 'eur',
        quantity: childrenPackQuantity,
        unit_amount: UNIT_CHILD_PRICE * 100,
        description: 'Pack Enfant',
      });
    }

    await stripe.invoiceItems.create({
      customer: booking.stripeCustomerId,
      currency: 'eur',
      amount: '-500',
      description: 'Pré-réservation',
    });

    let invoice = await stripe.invoices.create({
      customer: booking.stripeCustomerId,
      collection_method: 'send_invoice',
      due_date: dayBeforeTimestamp(booking.firstDay),
    });

    invoice = await stripe.invoices.finalizeInvoice(invoice.id);

    res.status(201).json(invoice);
  } catch (error) {
    Sentry.captureException(error);
    console.log({ error });
    res.status(400).json({ message: 'Une erreur est survenue', error });
  }
};
