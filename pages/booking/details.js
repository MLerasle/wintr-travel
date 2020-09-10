import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import Head from 'next/head';

import Layout from '@/Layout/Layout';
import BookingForm from '@/App/BookingForm';
import BookingMainInfo from '@/App/BookingMainInfo';
import BookingFormDetails from '@/App/BookingFormDetails';
import BookingFormDeliveryAddress from '@/App/BookingFormDeliveryAddress';
import BookingFormValidate from '@/App/BookingFormValidate';
import MainSection from '@/UI/MainSection';
import Separator from '@/UI/Separator';

const Cart = ({ catalog }) => {
  const _isMounted = useRef(true);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const booking = useSelector((state) => state);
  const dispatch = useDispatch();

  const skiers = [...booking.adults, ...booking.children];

  useEffect(() => {
    return () => {
      _isMounted.current = false;
    };
  }, []);

  const editBooking = () => setIsEditing(true);
  const validateBooking = () => setIsEditing(false);

  const updateSkier = (skier, attribute, event) => {
    let skiers;
    if (skier.label.startsWith('Adulte')) {
      skiers = [...booking.adults];
    } else {
      skiers = [...booking.children];
    }
    const person = skiers.find((s) => s.label === skier.label);
    person[attribute] = +event.target.value;

    if (skier.label.startsWith('Adulte')) {
      dispatch({
        type: 'SET_SKIERS',
        adults: skiers,
        children: [...booking.children],
      });
    } else {
      dispatch({
        type: 'SET_SKIERS',
        adults: [...booking.adults],
        children: skiers,
      });
    }
  };

  const updateAddress = (event) => {
    dispatch({
      type: 'SET_DELIVERY_ADDRESS',
      deliveryAddress: event.target.value,
    });
  };

  const validateCart = () => {
    setIsLoading(true);
    if (booking.isValid) {
      Router.push('/booking/checkout').then(() => {
        if (_isMounted.current) {
          setIsLoading(false);
        }
        window.scrollTo(0, 0);
      });
    }
  };

  return (
    <Layout>
      <Head>
        <title>Votre réservation - Wintr Travel</title>
      </Head>
      <MainSection className="py-2 md:py-6">
        {isEditing ? (
          <BookingForm
            catalog={catalog}
            booking={booking}
            isEditing
            onUpdate={validateBooking}
          />
        ) : (
          <>
            <BookingMainInfo booking={booking} onEditBooking={editBooking} />
            <Separator className="md:hidden my-2" />
            <BookingFormDetails skiers={skiers} onUpdateSkier={updateSkier} />
            <Separator className="md:hidden my-2" />
            <BookingFormDeliveryAddress
              booking={booking}
              onAddressUpdate={updateAddress}
            />
            <BookingFormValidate
              booking={booking}
              loading={loading}
              onValidate={validateCart}
            />
          </>
        )}
      </MainSection>
    </Layout>
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
