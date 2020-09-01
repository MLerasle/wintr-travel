import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';

import Layout from 'components/Layout/Layout';
import MobileImage from 'components/UI/MobileImage';
import Hero from 'components/UI/Hero';
import BookingForm from 'components/App/BookingForm';
import HomeArgs from 'components/App/HomeArgs';
import Testimonials from 'components/App/Testimonials';
import HomeCta from '@/App/HomeCta';

const Index = ({ catalog }) => {
  const { t } = useTranslation();

  return (
    <Layout>
      <Head>
        <title>{t('home:title')}</title>
      </Head>
      <MobileImage />
      <Hero type="full">
        <BookingForm catalog={catalog} />
      </Hero>
      <HomeArgs />
      <Testimonials />
      <HomeCta />
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
