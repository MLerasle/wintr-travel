import { useReducer } from 'react';
import Router from 'next/router';
import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';
import Icon from '@mdi/react';
import { mdiCheck } from '@mdi/js';

import Layout from 'components/Layout/Layout';
import Card from 'components/UI/Card';
import Hero from 'components/UI/Hero';
import { INITIAL_BOOKING } from 'store/state';
import { reducer } from 'store/reducer';

const Confirmation = () => {
  const [, dispatch] = useReducer(reducer, INITIAL_BOOKING);
  const { t, lang } = useTranslation();

  const resetBooking = () => {
    dispatch({ type: 'RESET_BOOKING' });
    Router.push(`/${lang}`);
  };

  return (
    <Layout>
      <Head>
        <title>{t('confirmation:title')} - Wintr Travel</title>
      </Head>
      <Hero>
        <Card>
          <div className="flex flex-col items-center">
            <Icon path={mdiCheck} size={4} color="#0CB3FA" />
            <h1 className="md:mb-8 text-2xl sm:text-3xl leading-tight font-semibold text-gray-800">
              {t('confirmation:title')}
            </h1>

            <div className="text-center">
              <p className="my-8 md:my-0 md:mb-2 text-gray-700">
                {t('confirmation:infos1')}
              </p>
              <p className="my-8 md:my-0 md:mb-2 text-gray-700">
                {t('confirmation:infos2')}
              </p>
              <p className="my-8 md:my-0 md:mb-2 text-gray-800 font-semibold">
                {t('confirmation:infos3')}
              </p>
            </div>
            <a
              href="/"
              onClick={resetBooking}
              className="bg-secondary-blue text-white text-center font-bold py-3 px-4 md:mt-8 w-32 rounded-lg shadow-md focus:outline-none focus:shadow-outline hover:opacity-90"
            >
              {t('common:button.ok')}
            </a>
          </div>
        </Card>
      </Hero>
    </Layout>
  );
};

export default Confirmation;
