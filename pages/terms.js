import Head from 'next/head';

import MainSection from '@/UI/MainSection';

const Terms = () => {
  return (
    <>
      <Head>
        <title>CGV - Wintr Travel</title>
        <meta
          name="description"
          content="Conditions Générales de Vente Wintr Travel"
        />
      </Head>
      <MainSection>
        <header className="sm:text-center px-4 sm:px-10 py-8 sm:py-12">
          <h1 className="heading">Conditions Générales de Vente</h1>
        </header>
        <section className="md:text-lg pb-10 sm:pb-16 px-4 xl:px-0 text-gray-600 leading-loose">
          <h2 className="pb-3 text-2xl font-bold text-gray-900">
            1. Lorem ipsum
          </h2>
          <p className="py-3">
            Duis vitae pretium dui. Nullam eget nisl diam. Cras dapibus mattis
            suscipit. In efficitur in enim id vestibulum. Nullam nibh metus,
            ultricies at ornare vitae, volutpat nec nisi. Duis id est est. Nam
            lacus ligula, accumsan vestibulum porttitor convallis, fringilla eu
            nisl. Nulla accumsan erat non efficitur dapibus.
          </p>
          <p className="py-3">
            Duis vitae pretium dui. Nullam eget nisl diam. Cras dapibus mattis
            suscipit. In efficitur in enim id vestibulum. Nullam nibh metus,
            ultricies at ornare vitae, volutpat nec nisi. Duis id est est. Nam
            lacus ligula, accumsan vestibulum porttitor convallis, fringilla eu
            nisl. Nulla accumsan erat non efficitur dapibus.
          </p>
          <p className="py-3">
            Duis vitae pretium dui. Nullam eget nisl diam. Cras dapibus mattis
            suscipit. In efficitur in enim id vestibulum. Nullam nibh metus,
            ultricies at ornare vitae, volutpat nec nisi. Duis id est est. Nam
            lacus ligula, accumsan vestibulum porttitor convallis, fringilla eu
            nisl. Nulla accumsan erat non efficitur dapibus.
          </p>
          <h2 className="pt-6 pb-3 text-2xl font-bold text-gray-900">
            2. Lorem ipsum
          </h2>
          <h3 className="py-3 text-xl font-bold underline text-gray-900">
            2.1 Lorem ipsum dolor
          </h3>
          <h3 className="py-3 text-xl font-bold underline text-gray-900">
            2.2 Lorem ipsum dolor
          </h3>
          <h2 className="pt-6 pb-3 text-2xl font-bold text-gray-900">
            3. Lorem ipsum
          </h2>
        </section>
      </MainSection>
    </>
  );
};

export default Terms;
