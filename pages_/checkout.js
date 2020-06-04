import { useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';
import Stripe from 'stripe';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { parseCookies, setCookie } from 'nookies';

import LayoutCover from '@/Layout/LayoutCover';
import CheckoutForm from '@/App/CheckoutForm';

const Checkout = ({ paymentIntent }) => {
  const { t, lang } = useTranslation();
  const router = useRouter();
  const stripePromise = loadStripe('pk_test_Wah9lA5G9KC0JfKICOBK0b7j');
  const {
    resort_id,
    resort_name,
    checkin,
    checkout,
    week_id,
    duration,
    adults,
    children,
    adults_amount,
    children_amount,
    total_amount,
  } = router.query;
  const booking = {
    resortId: +resort_id,
    resortName: resort_name,
    firstDay: checkin,
    lastDay: checkout,
    duration: +duration,
    weekId: +week_id,
    adultsCount: +adults,
    childrenCount: +children,
    adultsAmount: +adults_amount,
    childrenAmount: +children_amount,
    totalAmount: +total_amount,
    isValid: resort_id && checkin && adults > 0,
  };

  useEffect(() => {
    if (!booking.isValid) {
      Router.push(`/${lang}`);
    }
  }, []);

  return (
    <LayoutCover>
      <Head>
        <title>{t('checkout:title')} - Wintr Travel</title>
      </Head>
      <Elements stripe={stripePromise} options={{ locale: lang }}>
        <CheckoutForm booking={booking} paymentIntent={paymentIntent} />
      </Elements>
    </LayoutCover>
  );
};

export async function getServerSideProps(context) {
  const stripe = new Stripe('sk_test_klYc0uPTKRpd0fvXFlQEUf9O');

  let paymentIntent;

  const { paymentIntentId } = parseCookies(context);

  const booking = context.query;
  const bookingAmount = Math.round(+booking.total_amount * 100);

  // If we already have an unconfirmed paymentIntent we reuse it
  if (paymentIntentId) {
    paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    // Update its amount if it changed
    if (bookingAmount !== paymentIntent.amount) {
      await stripe.paymentIntents.update(paymentIntentId, {
        amount: bookingAmount,
      });
    }
  } else {
    paymentIntent = await stripe.paymentIntents.create({
      amount: bookingAmount,
      currency: 'eur',
      payment_method_types: ['card'],
    });

    setCookie(context, 'paymentIntentId', paymentIntent.id);
  }

  return {
    props: {
      paymentIntent,
    },
  };
}

export default Checkout;
