import { useState, useEffect } from 'react';
import Head from 'next/head';
import 'react-phone-number-input/style.css';

import Layout from '@/Layout/Layout';
import Card from '@/UI/Card';
import MainSection from '@/UI/MainSection';
import PhoneNumberStep from '@/App/Confirmation/PhoneNumberStep';
import ShareStep from '@/App/Confirmation/ShareStep';

import * as gtag from 'lib/gtag';

const Confirmation = () => {
  const [isPhoneNumberSubmitted, setIsPhoneNumberSubmitted] = useState(false);

  useEffect(() => {
    gtag.pageView('Confirmation de la réservation', '/booking/confirmation');
  }, []);

  const updateView = () => {
    setIsPhoneNumberSubmitted(true);
    window.scrollTo(0, 0);
  };

  const view = isPhoneNumberSubmitted ? (
    <ShareStep />
  ) : (
    <PhoneNumberStep onPhoneNumberSubmitted={updateView} />
  );

  return (
    <Layout>
      <Head>
        <title>Commande validée - Wintr Travel</title>
      </Head>
      <MainSection className="py-2 md:py-6 flex justify-center items-center">
        <Card
          classes="max-w-2xl"
          subclasses="bg-gray-100 md:bg-white p-4 md:p-8"
        >
          {view}
        </Card>
      </MainSection>
    </Layout>
  );
};

export default Confirmation;
