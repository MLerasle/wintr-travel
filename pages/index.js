import { useEffect } from 'react';
import Head from 'next/head';

import Layout from '@/Layout/Layout';
import MobileImage from '@/UI/MobileImage';
import Hero from '@/UI/Hero';
import BookingForm from '@/App/BookingForm';
import HomeArgs from '@/App/HomeArgs';
import Testimonials from '@/App/Testimonials';
import HomeCta from '@/App/HomeCta';

import * as gtag from 'lib/gtag';

const Index = () => {
  useEffect(() => {
    gtag.pageView('Location et livraison de skis et forfaits', '/');
  }, []);

  return (
    <Layout footerMaxWidth="max-w-screen-xxl">
      <Head>
        <title>Location et livraison de skis et forfaits - Wintr Travel</title>
      </Head>
      <MobileImage />
      <Hero type="full">
        <BookingForm />
      </Hero>
      <HomeArgs />
      <Testimonials />
      <HomeCta />
    </Layout>
  );
};

export default Index;
