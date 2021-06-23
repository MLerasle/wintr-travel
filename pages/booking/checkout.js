import { useEffect, useContext } from 'react';
import Head from 'next/head';
import Stripe from 'stripe';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { parseCookies, setCookie } from 'nookies';
import { IconContext } from 'react-icons';
import { HiLockClosed } from 'react-icons/hi';
import * as Sentry from '@sentry/nextjs';

import CheckoutForm from '@/App/Checkout/CheckoutForm';
import PaymentIcons from '@/App/Checkout/PaymentIcons';
import BookingSummary from '@/App/Booking/BookingSummary';
import MainSection from '@/UI/MainSection';
import Divider from '@/UI/Divider';

import BookingContext from 'context/booking-context';
import * as gtag from 'lib/gtag';

const Checkout = ({ paymentIntent }) => {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
  const booking = useContext(BookingContext);

  useEffect(() => {
    gtag.pageView('Paiement de la réservation', '/booking/checkout');
  }, []);

  return (
    <>
      <Head>
        <title>Paiement - Wintr Travel</title>
      </Head>
      <MainSection>
        <div className="max-w-7xl mx-auto px-4 pt-8 pb-16 sm:pb-24 sm:px-6 lg:px-8">
          <header className="flex justify-between items-baseline">
            <h1 className="flex items-center leading-tight font-bold text-gray-800 text-3xl">
              <IconContext.Provider
                value={{ className: 'text-gray-800 h-6 w-6' }}
              >
                <HiLockClosed />
              </IconContext.Provider>
              <span className="ml-1">Paiement Sécurisé</span>
            </h1>
            <PaymentIcons className="hidden sm:flex" />
          </header>
          <PaymentIcons className="sm:hidden mt-1" />
          <Divider className="pt-6" />
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 lg:grid-cols-2 lg:gap-x-12">
            <Elements stripe={stripePromise} options={{ locale: 'fr' }}>
              <CheckoutForm booking={booking} intent={paymentIntent} />
            </Elements>
            <BookingSummary booking={booking} page="checkout" />
          </div>
        </div>
      </MainSection>
    </>
  );
};

export async function getServerSideProps(context) {
  const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);
  let paymentIntent;

  const { paymentIntentId } = parseCookies(context);

  if (paymentIntentId) {
    try {
      paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    } catch (error) {
      Sentry.captureException(error);
      return {
        redirect: {
          destination: '/booking/details',
          permanent: false,
        },
      };
    }

    if (paymentIntent.amount_received > 0) {
      paymentIntent = null;
    } else {
      return {
        props: {
          paymentIntent,
        },
      };
    }
  }

  try {
    paymentIntent = await stripe.paymentIntents.create({
      amount: '5000',
      currency: 'eur',
    });
  } catch (error) {
    Sentry.captureException(error);
    return {
      redirect: {
        destination: '/booking/details',
        permanent: false,
      },
    };
  }

  setCookie(context, 'paymentIntentId', paymentIntent.id, {
    maxAge: 24 * 60 * 60,
  });

  return {
    props: {
      paymentIntent,
    },
  };
}

export default Checkout;
