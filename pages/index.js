import Head from 'next/head';

import Layout from '@/Layout/Layout';
import MobileImage from '@/UI/MobileImage';
import Hero from '@/UI/Hero';
import BookingForm from '@/App/BookingForm';
import HomeArgs from '@/App/HomeArgs';
import Testimonials from '@/App/Testimonials';
import HomeCta from '@/App/HomeCta';

const Index = ({ initialReduxState }) => {
  return (
    <Layout footerMaxWidth="max-w-screen-xxl">
      <Head>
        <title>Location et livraison de skis et forfaits - Wintr Travel</title>
      </Head>
      <MobileImage />
      <Hero type="full">
        <BookingForm booking={initialReduxState} />
      </Hero>
      <HomeArgs />
      <Testimonials />
      <HomeCta />
    </Layout>
  );
};

export async function getStaticProps() {
  return {
    props: {
      initialReduxState: {
        resort: null,
        firstDay: null,
        lastDay: null,
        duration: 0,
        adultsPrice: 0,
        childrenPrice: 0,
        totalPrice: 0,
        adults: [],
        children: [],
        email: '',
        name: '',
        countryCode: 'FR',
        deliveryAddress: '',
        paymentIntentId: null,
        isRegisteredToNewsletter: true,
        isValid: false,
        isPaid: false,
      },
    },
  };
}

export default Index;
