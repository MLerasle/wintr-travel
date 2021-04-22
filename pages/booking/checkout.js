import { useEffect } from 'react';
import Head from 'next/head';
import Stripe from 'stripe';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { parseCookies } from 'nookies';
import { IconContext } from 'react-icons';
import { MdLock } from 'react-icons/md';

import CheckoutForm from '@/App/Checkout/CheckoutForm';
import PaymentIcons from '@/App/Checkout/PaymentIcons';
import BookingSummary from '@/App/Booking/BookingSummary';
import MainSection from '@/UI/MainSection';
import Separator from '@/UI/Separator';

import * as gtag from 'lib/gtag';

const Checkout = ({ paymentIntent }) => {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
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
                value={{ color: '#1F2937', size: '1.5rem' }}
              >
                <MdLock />
              </IconContext.Provider>
              <span className="ml-1">Paiement Sécurisé</span>
            </h1>
            <PaymentIcons className="hidden sm:flex" />
          </header>
          <PaymentIcons className="sm:hidden mt-1" />
          <Separator className="mt-6" />
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:gap-x-12">
            <Elements stripe={stripePromise} options={{ locale: 'fr' }}>
              <CheckoutForm intent={paymentIntent} />
            </Elements>
            <BookingSummary />
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
    paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
  } else {
    // Go back to previous step if paymentIntent id is missing
    return {
      redirect: {
        destination: '/booking/details',
        permanent: false,
      },
    };
  }

  return {
    props: {
      paymentIntent,
    },
  };
}

export default Checkout;
