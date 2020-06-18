import { useEffect, useState, useRef } from 'react';
import Router, { useRouter } from 'next/router';
import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';

import LayoutCover from 'components/Layout/LayoutCover';
import BookingInfo from 'components/App/BookingInfo';
import BookingForm from 'components/App/BookingForm';

const Cart = ({ catalog }) => {
  const _isMounted = useRef(true);
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const {
    resort_id,
    resort_name,
    checkin,
    checkout,
    week_id,
    duration,
    adults,
    children,
    adults_amount,
    children_amount,
    total_amount,
  } = router.query;
  const booking = {
    resortId: +resort_id,
    resortName: resort_name,
    firstDay: checkin,
    lastDay: checkout,
    duration: +duration,
    weekId: +week_id,
    adultsCount: +adults,
    childrenCount: +children,
    adultsAmount: +adults_amount,
    childrenAmount: +children_amount,
    totalAmount: +total_amount,
    isValid: resort_id && checkin && adults > 0,
  };
  const { t, lang } = useTranslation();

  useEffect(() => {
    return () => {
      _isMounted.current = false;
    };
  }, []);

  const editBooking = () => setIsEditing(true);
  const onBookingUpdate = () => setIsEditing(false);

  const validateCart = () => {
    setIsLoading(true);
    if (booking.isValid) {
      Router.push({
        pathname: `/${lang}/checkout`,
        query: {
          resort_id: booking.resortId,
          resort_name: booking.resortName,
          checkin: booking.firstDay,
          checkout: booking.lastDay,
          week_id: booking.weekId,
          duration: booking.duration,
          adults: booking.adultsCount,
          children: booking.childrenCount,
          adults_amount: booking.adultsAmount,
          children_amount: booking.childrenAmount,
          total_amount: booking.totalAmount,
        },
      }).then(() => {
        if (_isMounted.current) {
          setIsLoading(false);
        }
        window.scrollTo(0, 0);
      });
    }
  };

  return (
    <LayoutCover>
      <Head>
        <title>{t('cart:title')} - Wintr Travel</title>
      </Head>
      {isEditing ? (
        <BookingForm
          catalog={catalog}
          booking={booking}
          onUpdate={onBookingUpdate}
        />
      ) : (
        <BookingInfo
          booking={booking}
          loading={loading}
          onValidate={validateCart}
          onEdit={editBooking}
        />
      )}
    </LayoutCover>
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

export default Cart;
