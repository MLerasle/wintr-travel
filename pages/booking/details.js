import { useEffect, useContext } from 'react';
import Head from 'next/head';

import BookingMainInfos from '@/App/Booking/BookingMainInfos';
import BookingFormSizes from '@/App/Booking/BookingFormSizes';
import BookingFormEmail from '@/App/Booking/BookingFormEmail';
import MainSection from '@/UI/MainSection';

import BookingContext from 'context/booking-context';
import * as gtag from 'lib/gtag';

const Details = () => {
  const booking = useContext(BookingContext);

  useEffect(() => {
    gtag.pageView('Détails de la réservation', '/booking/details');
  }, []);

  return (
    <>
      <Head>
        <title>Votre réservation - Wintr Travel</title>
      </Head>
      <MainSection>
        <div className="max-w-7xl mx-auto px-4 pt-8 pb-16 sm:pb-24 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <BookingMainInfos booking={booking} />
            <BookingFormSizes booking={booking} />
            <BookingFormEmail booking={booking} />
          </div>
        </div>
      </MainSection>
    </>
  );
};

export default Details;
