import { useEffect } from 'react';
import Head from 'next/head';

import MainSection from '@/UI/MainSection';
import PageHeader from '@/UI/PageHeader';
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
        <PageHeader title="Guide des tailles">
          Ce que vous devez savoir pour ne pas vous tromper.
        </PageHeader>
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
