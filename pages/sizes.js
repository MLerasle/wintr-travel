import Head from 'next/head';

import Layout from '@/Layout/Layout';
import MainSection from '@/UI/MainSection';
import GridArg from '@/App/GridArg';
import SizeSkis from '@/App/SizeSkis';
import SizeShoes from '@/App/SizeShoes';
import SizeHelmet from '@/App/SizeHelmet';

const Sizes = () => (
  <Layout>
    <Head>
      <title>Guide des Tailles - Wintr Travel</title>
    </Head>

    <MainSection>
      <header className="text-center px-4 sm:px-10 py-10 sm:py-16">
        <GridArg title="Comment renseigner la bonne taille pour votre matériel?">
          Tout ce que vous devez savoir pour trouver chaussure à votre pied.
        </GridArg>
      </header>
      <section className="md:text-lg pb-10 sm:pb-16 px-4 xl:px-0">
        <SizeSkis />
        <SizeShoes withDetails />
        <SizeHelmet withDetails />
      </section>
    </MainSection>
  </Layout>
);

export default Sizes;
