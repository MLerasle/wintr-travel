import { useEffect } from 'react';
import Head from 'next/head';

import MainSection from '@/UI/MainSection';
import PageHeader from '@/UI/PageHeader';
import SizeSkis from '@/App/Static/SizeSkis';
import SizeShoes from '@/App/Static/SizeShoes';
import SizeHelmet from '@/App/Static/SizeHelmet';

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
        <div className="max-w-7xl mx-auto px-4 pb-16 sm:pb-24 sm:px-6 lg:px-8">
          <div className="lg:bg-white lg:pt-14 lg:pb-20 lg:shadow-xl">
            <div className="prose prose-blue prose-lg text-gray-500 mx-auto">
              <SizeSkis />
              <SizeShoes withDetails />
              <SizeHelmet withDetails />
            </div>
          </div>
        </div>
      </MainSection>
    </>
  );
};

export default Sizes;
