import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';

// import LayoutCover from 'components/Layout/LayoutCover';
import Layout from 'components/Layout/Layout';
import MobileImage from 'components/UI/MobileImage';
import BookingForm from 'components/App/BookingForm';
// import PackContent from 'components/App/PackContent';

const Index = ({ catalog }) => {
  const { t } = useTranslation();

  return (
    <Layout>
      <Head>
        <title>{t('home:title')}</title>
      </Head>
      <MobileImage />
      <BookingForm catalog={catalog} />
      <section className="flex justify-center items-center">
        <div className="text-center px-10 py-10 md:rounded-lg -my-16 bg-white">
          <h2 className="font-semibold text-gray-800 text-3xl">
            Louez votre matériel. Nous vous livrons.
          </h2>
          <p className="text-gray-700">
            Nous vous livrons vos skis et votre forfait directement en station,
            dans votre résidence.
          </p>
        </div>
      </section>
      {/* <PackContent className="md:hidden mx-4 md:mx-6 mt-2 mb-6" title /> */}
    </Layout>
  );
};

export async function getStaticProps() {
  const response = await fetch('https://catalog.wintr.travel/v1/catalog.json');
  const catalog = await response.json();

  return {
    props: {
      catalog,
    },
  };
}

export default Index;
