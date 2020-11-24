import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Head from 'next/head';
import { useRouter } from 'next/router';
import 'react-phone-number-input/style.css';

import Layout from '@/Layout/Layout';
import Card from '@/UI/Card';
import MainSection from '@/UI/MainSection';
import PhoneNumberStep from '@/App/Confirmation/PhoneNumberStep';
import ShareStep from '@/App/Confirmation/ShareStep';

import { setPhoneNumber } from 'store/actions';

import * as gtag from 'lib/gtag';

const Confirmation = () => {
  const router = useRouter();
  const pid = router.query.pid;
  const dispatch = useDispatch();
  const [isPhoneNumberSubmitted, setIsPhoneNumberSubmitted] = useState(false);

  useEffect(() => {
    gtag.pageView('Confirmation de la réservation', '/booking/confirmation');
  }, []);

  const updateBooking = async (mobileNumber) => {
    try {
      dispatch(setPhoneNumber(mobileNumber));
      await fetch('/api/booking/update', {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ mobileNumber, pid }),
      });
      setIsPhoneNumberSubmitted(true);
    } catch (error) {
      console.log('ERROR while updating phone number');
    }
    window.scrollTo(0, 0);
  };

  const view = isPhoneNumberSubmitted ? (
    <ShareStep />
  ) : (
    <PhoneNumberStep onPhoneNumberSubmitted={updateBooking} />
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
