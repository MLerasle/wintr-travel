import { useReducer } from 'react';
import Router from 'next/router';
import Head from 'next/head';
import Icon from '@mdi/react';
import { mdiCheck } from '@mdi/js';

import Layout from '@/Layout/Layout';
import Card from '@/UI/Card';
import MainSection from '@/UI/MainSection';
import { INITIAL_BOOKING } from 'store/state';
import { reducer } from 'store/reducer';

const Confirmation = () => {
  const [, dispatch] = useReducer(reducer, INITIAL_BOOKING);

  const resetBooking = () => {
    dispatch({ type: 'RESET_BOOKING' });
    Router.push('/');
  };

  return (
    <Layout>
      <Head>
        <title>Commande validée - Wintr Travel</title>
      </Head>
      <MainSection className="py-2 md:py-6 flex justify-center items-center">
        <Card classes="max-w-2xl" subclasses="bg-gray-200 md:bg-white">
          <div className="flex flex-col items-center">
            <Icon path={mdiCheck} size={4} color="#0CB3FA" />
            <h1 className="md:mb-8 text-2xl sm:text-3xl leading-tight font-semibold text-gray-800">
              Commande validée
            </h1>

            <div className="text-center">
              <p className="my-8 md:my-0 md:mb-2 text-gray-700">
                Votre réservation et votre paiement ont bien été enregistrés.
              </p>
              <p className="my-8 md:my-0 md:mb-2 text-gray-700">
                Vous allez recevoir un email contenant les détails de votre
                réservation et les instructions pour récupérer votre matériel.
              </p>
              <p className="my-8 md:my-0 md:mb-2 text-gray-800 font-semibold">
                Bon séjour!
              </p>
            </div>
            <a
              href="/"
              onClick={resetBooking}
              className="bg-secondary-blue text-white text-center font-bold py-3 px-4 md:mt-8 w-32 rounded-lg shadow-md focus:outline-none focus:shadow-outline hover:opacity-90"
            >
              OK
            </a>
          </div>
        </Card>
      </MainSection>
    </Layout>
  );
};

export default Confirmation;
