import { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

import MainSection from '@/UI/MainSection';
import PageHeader from '@/UI/PageHeader';
import PriceCard from '@/App/Prices/PriceCard';
import Button from '@/UI/Button';

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
        <PageHeader title="Un tarif simple">
          Pré-réservez pour 5€. Payez le reste la veille de votre arrivée.
        </PageHeader>

        <article className="sm:flex sm:justify-between sm:items-center max-w-3xl mx-auto">
          <PriceCard category="Adulte" price={UNIT_ADULT_PRICE} />
          <PriceCard category="Enfant" price={UNIT_CHILD_PRICE} />
        </article>

        <article className="flex justify-center md:hidden">
          <Button classes="w-full mx-4 mb-10 uppercase tracking-wide bg-primary-green text-white">
            <Link href="/">
              <a>Réserver</a>
            </Link>
          </Button>
        </article>
      </MainSection>
    </>
  );
};

export default Prices;
