import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Head from 'next/head';
import Stripe from 'stripe';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { parseCookies } from 'nookies';

import Layout from '@/Layout/Layout';
import CheckoutForm from '@/App/CheckoutForm';
import MainSection from '@/UI/MainSection';

const Checkout = ({ paymentIntent }) => {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
  const booking = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!booking.paymentIntentId) {
      const { paymentIntentId } = parseCookies();
      dispatch({
        type: 'SET_PAYMENT_INTENT_ID',
        paymentIntentId,
      });
    }
  }, []);

  return (
    <Layout hideNavLinks withoutFooter>
      <Head>
        <title>Paiement - Wintr Travel</title>
      </Head>
      <MainSection className="py-2 md:py-6" layoutWithoutFooter>
        <Elements stripe={stripePromise} options={{ locale: 'fr' }}>
          <CheckoutForm booking={booking} paymentIntent={paymentIntent} />
        </Elements>
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

  paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

  return {
    props: {
      paymentIntent,
    },
  };
}

export default Checkout;
