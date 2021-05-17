import Stripe from 'stripe';

import { ADULT_PRICE, CHILD_PRICE } from 'data/pack';
import { dayBeforeTimestamp } from 'helpers/dates';

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY, {
  apiVersion: null,
});

export const findOrCreateCustomer = async (booking) => {
  const { firstname, lastname, email } = booking;

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

  return customer;
};

export const findOrCreateInvoice = async (booking) => {
  const adultsPackQuantity = booking.adults.length;
  const childrenPackQuantity = booking.children.length;

  await stripe.invoiceItems.create({
    customer: booking.stripeCustomerId,
    currency: 'eur',
    quantity: adultsPackQuantity,
    unit_amount: ADULT_PRICE * 100,
    description: 'Pack Adulte',
  });

  if (childrenPackQuantity > 0) {
    await stripe.invoiceItems.create({
      customer: booking.stripeCustomerId,
      currency: 'eur',
      quantity: childrenPackQuantity,
      unit_amount: CHILD_PRICE * 100,
      description: 'Pack Enfant',
    });
  }

  await stripe.invoiceItems.create({
    customer: booking.stripeCustomerId,
    currency: 'eur',
    amount: '-5000',
    description: 'Pré-réservation',
  });

  let invoice = await stripe.invoices.create({
    customer: booking.stripeCustomerId,
    collection_method: 'send_invoice',
    due_date: dayBeforeTimestamp(booking.firstDay),
    metadata: { bookingId: booking.paymentIntentId },
  });

  invoice = await stripe.invoices.finalizeInvoice(invoice.id);

  return invoice;
};

export const updatePaymentIntent = async (paymentIntent, data) => {
  try {
    await stripe.paymentIntents.update(paymentIntent.id, data);
  } catch (error) {
    throw new Error(error);
  }
};
