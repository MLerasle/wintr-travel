import Head from 'next/head';

import Layout from 'components/Layout/Layout';
import MobileImage from 'components/UI/MobileImage';
import Hero from 'components/UI/Hero';
import BookingForm from 'components/App/BookingForm';
import HomeArgs from 'components/App/HomeArgs';
import Testimonials from 'components/App/Testimonials';
import HomeCta from '@/App/HomeCta';

const Index = ({ catalog, initialReduxState }) => {
  return (
    <Layout footerMaxWidth="max-w-screen-xxl">
      <Head>
        <title>Location et livraison de skis et forfaits - Wintr Travel</title>
      </Head>
      <MobileImage />
      <Hero type="full">
        <BookingForm catalog={catalog} booking={initialReduxState} />
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
      initialReduxState: {
        resort: null,
        firstDay: null,
        lastDay: null,
        duration: null,
        adultsPrice: 0,
        childrenPrice: 0,
        totalPrice: 0,
        adults: [],
        children: [],
        deliveryAddress: null,
        isValid: false,
      },
    },
  };
}

export default Index;
