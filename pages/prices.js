import { useEffect } from 'react';
import Head from 'next/head';

import MainSection from '@/UI/MainSection';
import PriceCard from '@/App/Prices/PriceCard';

import * as gtag from 'lib/gtag';
import { UNIT_ADULT_PRICE, UNIT_CHILD_PRICE } from 'data/booking';

const Prices = () => {
  useEffect(() => {
    gtag.pageView('Tarifs', '/prices');
  }, []);

  return (
    <>
      <Head>
        <title>Tarifs Wintr Travel</title>
        <meta
          name="description"
          content="Budgéter ses vacances au ski n'a jamais été aussi simple grâce à la politique de tarification unique de Wintr Travel."
        />
      </Head>

      <MainSection>
        <header className="md:text-center px-4 md:px-10 py-6 md:py-16 bg-dark-blue">
          <h1 className="text-2xl md:text-4xl font-semibold md:font-bold pb-1 md:pb-3 leading-tight text-gray-100">
            Un tarif unique.
          </h1>
          <p className="md:text-xl text-gray-300">
            Budgéter ses vacances n'a jamais été aussi simple.
          </p>
        </header>

        <article className="sm:flex sm:justify-between sm:items-center max-w-screen-lg mx-auto mt-10">
          <PriceCard category="Adulte" price={UNIT_ADULT_PRICE} />
          <PriceCard category="Enfant" price={UNIT_CHILD_PRICE} />
        </article>
      </MainSection>
    </>
  );
};

export default Prices;
