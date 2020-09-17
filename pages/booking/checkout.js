import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Head from 'next/head';
import Stripe from 'stripe';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { parseCookies } from 'nookies';
import Icon from '@mdi/react';
import { mdiLock } from '@mdi/js';

import Layout from '@/Layout/Layout';
import CheckoutForm from '@/App/CheckoutForm';
import PaymentIcons from '@/App/PaymentIcons';
import MainSection from '@/UI/MainSection';
import Header from '@/UI/Header';
import Heading from '@/UI/Heading';
import Separator from '@/UI/Separator';

import { formatDate } from 'helpers/dates';

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
    <Layout withoutNavbar withoutFooter>
      <Head>
        <title>Paiement - Wintr Travel</title>
      </Head>
      <MainSection className="py-2 md:py-6" layoutWithoutNavbarAndFooter>
        <Header>
          <Heading className="text-3xl">
            <Icon path={mdiLock} size={1} color="#424242" />
            <span className="ml-1">Paiement Sécurisé</span>
          </Heading>
          <PaymentIcons className="hidden sm:flex" />
        </Header>
        <PaymentIcons className="sm:hidden mt-1" />
        <Separator className="mt-6" />
        <div className="lg:flex">
          <Elements stripe={stripePromise} options={{ locale: 'fr' }}>
            <CheckoutForm booking={booking} paymentIntent={paymentIntent} />
          </Elements>
          <div className="bg-white md:w-1/2 p-6 text-gray-800 hidden lg:block">
            <Heading className="text-xl mb-4">Votre réservation</Heading>
            <p>
              Un email de confirmation sera envoyée à{' '}
              <span className="font-bold">{booking.email}</span> juste après le
              paiement.
            </p>
            <Separator className="my-6" />
            <div className="flex justify-between items-center my-2">
              <p className="text-gray-800">Station</p>
              <p className="font-semibold">{booking.resort}</p>
            </div>
            <div className="flex justify-between items-center my-2">
              <p className="text-gray-800">Arrivée</p>
              <p className="font-semibold">{formatDate(booking.firstDay)}</p>
            </div>
            <div className="flex justify-between items-center my-2">
              <p className="text-gray-800">Départ</p>
              <p className="font-semibold">{formatDate(booking.lastDay)}</p>
            </div>
            <Separator className="my-6" />
            {booking.adults.map((skier) => (
              <div
                className="flex justify-between items-start my-2"
                key={skier.label}
              >
                <div>
                  <p className="text-gray-800">{skier.label}</p>
                  <span className="text-gray-600 text-sm">
                    Taille {skier.size ? `${skier.size} cm` : 'inconnue'} -{' '}
                  </span>
                  <span className="text-gray-600 text-sm">
                    Pointure {skier.shoeSize ? skier.shoeSize : 'inconnue'} -{' '}
                  </span>
                  <span className="text-gray-600 text-sm">
                    Casque {skier.headSize ? skier.headSize : 'inconnu'}
                  </span>
                </div>
                <p className="font-semibold">
                  {(booking.duration * 55).toFixed(2)} €
                </p>
              </div>
            ))}
            {booking.children.length > 0 &&
              booking.children.map((skier) => (
                <div
                  className="flex justify-between items-start my-2"
                  key={skier.label}
                >
                  <div>
                    <p className="text-gray-800">{skier.label}</p>
                    <span className="text-gray-600 text-sm">
                      Taille {skier.size ? `${skier.size} cm` : 'inconnue'} -{' '}
                    </span>
                    <span className="text-gray-600 text-sm">
                      Pointure {skier.shoeSize ? skier.shoeSize : 'inconnue'} -{' '}
                    </span>
                    <span className="text-gray-600 text-sm">
                      Casque {skier.headSize ? skier.headSize : 'inconnu'}
                    </span>
                  </div>
                  <p className="font-semibold">
                    {(booking.duration * 40).toFixed(2)} €
                  </p>
                </div>
              ))}
            <Separator className="my-6" />
            <div className="flex justify-between items-center my-2">
              <p className="text-gray-800">Total Prix Adulte</p>
              <p className="font-semibold">
                {booking.adultsPrice.toFixed(2)} €
              </p>
            </div>
            <div className="flex justify-between items-center my-2">
              <p className="text-gray-800">Total Prix Enfant</p>
              <p className="font-semibold">
                {booking.childrenPrice.toFixed(2)} €
              </p>
            </div>
            <div className="flex justify-between items-center my-2">
              <p className="text-gray-800">Livraison</p>
              <div className="w-2 h-0.4 bg-gray-800"></div>
            </div>
            <Separator className="my-6" />
            <div className="flex justify-between items-center my-2">
              <p className="text-gray-800">Total</p>
              <p className="font-bold text-2xl">
                {booking.totalPrice.toFixed(2)} €
              </p>
            </div>
          </div>
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

  paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

  return {
    props: {
      paymentIntent,
    },
  };
}

export default Checkout;
