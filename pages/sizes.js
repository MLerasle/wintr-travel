import { useEffect } from 'react';
import Head from 'next/head';

import MainSection from '@/UI/MainSection';
import SizeSkis from '@/App/Sizes/SizeSkis';
import SizeShoes from '@/App/Sizes/SizeShoes';
import SizeHelmet from '@/App/Sizes/SizeHelmet';

import * as gtag from 'lib/gtag';

const Sizes = () => {
  useEffect(() => {
    gtag.pageView('Guide des tailles', '/sizes');
  }, []);

  return (
    <>
      <Head>
        <title>Choisir les bons skis - Wintr Travel</title>
        <meta
          name="description"
          content="Tout ce qu'il vous faut savoir pour trouver le matériel de ski à votre taille. Skis, chaussures, casque, on vous explique tout."
        />
      </Head>

      <MainSection>
        <header className="md:text-center px-4 md:px-10 py-6 md:py-16 bg-dark-blue">
          <h1 className="text-2xl md:text-4xl font-semibold md:font-bold pb-1 md:pb-3 leading-tight text-gray-100">
            Guide des tailles
          </h1>
          <p className="md:text-xl text-gray-200">
            Ce que vous devez savoir pour ne pas vous tromper.
          </p>
        </header>
        <section className="px-4 xl:px-0 md:text-lg pb-10 max-w-screen-lg mx-auto">
          <SizeSkis />
          <SizeShoes withDetails />
          <SizeHelmet withDetails />
        </section>
      </MainSection>
    </>
  );
};

export default Sizes;
