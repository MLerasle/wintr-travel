import { useEffect } from 'react';
import Head from 'next/head';

import Layout from '@/Layout/Layout';
import MainSection from '@/UI/MainSection';
import PriceCard from '@/App/Prices/PriceCard';

import * as gtag from 'lib/gtag';

const Prices = () => {
  useEffect(() => {
    gtag.pageView('Tarifs', '/prices');
  }, []);

  return (
    <Layout>
      <Head>
        <title>Tarifs Wintr Travel</title>
        <meta
          name="description"
          content="Budgéter ses vacances au ski n'a jamais été aussi simple grâce à la politique de tarification unique de Wintr Travel."
        />
      </Head>

      <MainSection>
        <header className="text-center px-4 sm:px-10 py-10 sm:py-16 bg-dark-blue">
          <h1 className="heading text-gray-100">Un tarif unique.</h1>
          <p className="argument text-gray-300">
            Budgéter ses vacances n'a jamais été aussi simple.
          </p>
        </header>

        <article className="sm:flex sm:justify-between sm:items-center max-w-screen-lg mx-auto mt-10">
          <PriceCard category="Adulte" price="130" />
          <PriceCard category="Enfant" price="78" />
        </article>
      </MainSection>
    </Layout>
  );
};

export default Prices;
