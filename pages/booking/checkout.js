import { useEffect } from 'react';
import Head from 'next/head';
import Stripe from 'stripe';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { parseCookies } from 'nookies';
import Icon from '@mdi/react';
import { mdiLock } from '@mdi/js';

import Layout from '@/Layout/Layout';
import CheckoutForm from '@/App/Checkout/CheckoutForm';
import PaymentIcons from '@/App/Checkout/PaymentIcons';
import BookingSummary from '@/App/Checkout/BookingSummary';
import MainSection from '@/UI/MainSection';
import Header from '@/UI/Header';
import Heading from '@/UI/Heading';
import Separator from '@/UI/Separator';

import * as gtag from 'lib/gtag';

const Checkout = ({ paymentIntent }) => {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
  useEffect(() => {
    gtag.pageView('Paiement de la réservation', '/booking/checkout');
  }, []);

  return (
    <Layout withoutNavbar withoutFooter>
      <Head>
        <title>Paiement - Wintr Travel</title>
      </Head>
      <MainSection className="py-2 md:py-6" layoutWithoutNavbarAndFooter>
        <Header className="px-4 lg:px-2 xl:px-0">
          <Heading className="text-3xl">
            <Icon path={mdiLock} size={1} color="#424242" />
            <span className="ml-1">Paiement Sécurisé</span>
          </Heading>
          <PaymentIcons className="hidden sm:flex" />
        </Header>
        <PaymentIcons className="sm:hidden mt-1 px-4" />
        <Separator className="mt-6" />
        <div className="px-4 lg:px-2 xl:px-0 xl:flex xl:justify-between">
          <Elements stripe={stripePromise} options={{ locale: 'fr' }}>
            <CheckoutForm intent={paymentIntent} />
          </Elements>
          <BookingSummary />
        </div>
      </MainSection>
    </Layout>
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
