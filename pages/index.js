import Head from 'next/head';

import Layout from '@/Layout/Layout';
import MobileImage from '@/UI/MobileImage';
import Hero from '@/UI/Hero';
import BookingForm from '@/App/BookingForm';
import HomeArgs from '@/App/HomeArgs';
import Testimonials from '@/App/Testimonials';
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
        email: null,
        name: null,
        countryCode: 'FR',
        deliveryAddress: null,
        paymentIntentId: null,
        isRegisteredToNewsletter: true,
        isValid: false,
        isPaid: false,
      },
    },
  };
}

export default Index;
