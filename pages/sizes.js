import { useEffect } from 'react';
import Head from 'next/head';

import Layout from '@/Layout/Layout';
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
    <Layout>
      <Head>
        <title>Guide des Tailles - Wintr Travel</title>
      </Head>

      <MainSection>
        <header className="text-center px-4 sm:px-10 py-10 sm:py-16">
          <h1 className="heading">
            Comment renseigner la bonne taille pour votre matériel?
          </h1>
          <p className="argument">
            Tout ce que vous devez savoir pour trouver chaussure à votre pied.
          </p>
        </header>
        <section className="md:text-lg pb-10 sm:pb-16 px-4 xl:px-0">
          <SizeSkis />
          <SizeShoes withDetails />
          <SizeHelmet withDetails />
        </section>
      </MainSection>
    </Layout>
  );
};

export default Sizes;
