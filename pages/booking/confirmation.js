import { useState } from 'react';
import Head from 'next/head';

import Card from '@/UI/Card';
import MainSection from '@/UI/MainSection';
import PhoneNumberStep from '@/App/Checkout/PhoneNumberStep';
import ShareStep from '@/App/Checkout/ShareStep';

const Confirmation = ({ pid }) => {
  const [isPhoneNumberSubmitted, setIsPhoneNumberSubmitted] = useState(false);

  const updateBooking = async (phoneNumber) => {
    try {
      await fetch(`/api/booking/${pid}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber }),
      });
      setIsPhoneNumberSubmitted(true);
    } catch (error) {
      console.log('ERROR while updating phone number');
    }
  };

  const view = isPhoneNumberSubmitted ? (
    <ShareStep />
  ) : (
    <PhoneNumberStep
      onPhoneNumberSubmitted={updateBooking}
      onSkip={() => setIsPhoneNumberSubmitted(true)}
    />
  );

  return (
    <>
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
    </>
  );
};

export async function getServerSideProps(context) {
  // /confirmation is reachable only after checkout
  const pid = context.query.pid;
  let prevPath;
  if (context.req.headers.referer) {
    prevPath = context.req.headers.referer.split('/').reverse()[0];
  }
  if (!pid || !prevPath || prevPath !== 'checkout') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {
      pid,
    },
  };
}

export default Confirmation;
