import { useEffect, useContext } from 'react';
import Head from 'next/head';

import BookingSummary from '@/App/Booking/BookingSummary';
import BookingFormSizes from '@/App/Booking/BookingFormSizes';
import BookingFormEmail from '@/App/Booking/BookingFormEmail';
import MainSection from '@/UI/MainSection';
import Divider from '@/UI/Divider';

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
          <header className="flex justify-between items-baseline">
            <h1 className="flex items-center leading-tight font-bold text-gray-800 text-3xl">
              Informations complémentaires
            </h1>
          </header>
          <Divider className="pt-6" />
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 lg:grid-cols-2 lg:gap-x-12">
            <div className="space-y-6 pt-6">
              <BookingFormEmail booking={booking} />
              <BookingFormSizes booking={booking} />
            </div>
            <div className="space-y-6">
              <BookingSummary page="details" />
            </div>
          </div>
        </div>
      </MainSection>
    </>
  );
};

export default Details;
