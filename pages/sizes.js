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
        <header className="text-center px-4 sm:px-10 py-10 sm:py-16 bg-dark-blue">
          <h1 className="heading text-gray-100">
            Comment renseigner la bonne taille pour votre matériel?
          </h1>
          <p className="argument text-gray-300">
            Tout ce que vous devez savoir pour trouver chaussure à votre pied.
          </p>
        </header>
        <section className="md:text-lg pb-10 max-w-screen-lg mx-auto mt-10">
          <SizeSkis />
          <SizeShoes withDetails />
          <SizeHelmet withDetails />
        </section>
      </MainSection>
    </>
  );
};

export default Sizes;
