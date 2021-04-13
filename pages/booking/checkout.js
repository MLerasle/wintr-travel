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
      <MainSection
        className="pt-4 pb-8 md:py-8 max-w-screen-lg mx-auto"
        layoutWithoutNavbarAndFooter
      >
        <header className="flex justify-between items-baseline px-4 lg:px-2 xl:px-0">
          <h1 className="flex items-center leading-tight font-bold text-gray-800 text-3xl">
            <IconContext.Provider value={{ color: '#1F2937', size: '1.5rem' }}>
              <MdLock />
            </IconContext.Provider>
            <span className="ml-1">Paiement Sécurisé</span>
          </h1>
          <PaymentIcons className="hidden sm:flex" />
        </header>
        <PaymentIcons className="sm:hidden mt-1 px-4" />
        <Separator className="mt-6" />
        <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2">
          <Elements stripe={stripePromise} options={{ locale: 'fr' }}>
            <CheckoutForm intent={paymentIntent} />
          </Elements>
          <BookingSummary />
        </div>
      </MainSection>
    </>
  );
};

export async function getServerSideProps(context) {
  const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);
  let paymentIntent;

  const { paymentIntentId } = parseCookies(
    typeof window === 'undefined' ? context : {}
  );

  if (paymentIntentId) {
    paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
  } else {
    // Go back to previous step if paymentIntent id is missing
    context.res.writeHead(302, { Location: '/booking/details' });
    context.res.end();
  }

  return {
    props: {
      paymentIntent,
    },
  };
}

export default Checkout;
