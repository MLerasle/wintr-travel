import { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import Router, { useRouter } from 'next/router';
import Head from 'next/head';

import Layout from '@/Layout/Layout';
import Recap from '@/App/Details/Recap';
import BookingFormSizes from '@/App/Details/BookingFormSizes';
import BookingFormValidate from '@/App/Details/BookingFormValidate';
import MainSection from '@/UI/MainSection';
import Separator from '@/UI/Separator';
import Modal from '@/UI/Modal';
import SizeSkis from '@/App/Sizes/SizeSkis';
import SizeShoes from '@/App/Sizes/SizeShoes';
import SizeHelmet from '@/App/Sizes/SizeHelmet';

import { setSkiers, initializeBooking } from 'store/actions';
import { getPrices } from 'helpers/booking';
import { PAID_BOOKING } from 'data/booking';

const Booking = () => {
  const router = useRouter();
  const { token } = router.query;
  const _isMounted = useRef(true);
  const [loading, setIsLoading] = useState(false);
  const [isSizesModalOpened, setIsModalSizesOpened] = useState(false);
  const booking = PAID_BOOKING;
  const prices = getPrices(booking.adults.length, booking.children.length);
  const dispatch = useDispatch();

  const skiers = [...booking.adults, ...booking.children];

  useEffect(() => {
    return () => {
      _isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    dispatch(initializeBooking(booking));
  }, []);

  const toggleSizesHelp = () => {
    setIsModalSizesOpened(!isSizesModalOpened);
  };

  const updateSkier = (skier, attribute, event) => {
    let skiers;
    if (skier.label.startsWith('Adulte')) {
      skiers = [...booking.adults];
    } else {
      skiers = [...booking.children];
    }
    const person = skiers.find((s) => s.label === skier.label);
    if (typeof event === 'string') {
      person[attribute] = event;
    } else {
      person[attribute] = +event.target.value;
    }

    if (skier.label.startsWith('Adulte')) {
      dispatch(setSkiers(skiers, booking.children));
    } else {
      dispatch(setSkiers(booking.adults, skiers));
    }
  };

  const validateBookingDetails = () => {
    // TODO : Send updated booking to the backend
    Router.push('/booking/checkout').then(() => {
      if (_isMounted.current) {
        setIsLoading(false);
      }
      window.scrollTo(0, 0);
    });
  };

  return (
    <Layout>
      <Head>
        <title>Votre réservation - Wintr Travel</title>
      </Head>
      <MainSection className="py-2 md:py-6">
        <Modal open={isSizesModalOpened} closed={toggleSizesHelp}>
          <section className="md:text-md p-6">
            <SizeSkis />
            <SizeShoes withDetails />
            <SizeHelmet withDetails />
          </section>
        </Modal>
        <Recap booking={booking} prices={prices} token={token} />
        <Separator className="md:hidden my-2" />
        <BookingFormSizes
          skiers={skiers}
          onUpdateSkier={updateSkier}
          onToggleSizesHelp={toggleSizesHelp}
          token={token}
        />
        <Separator className="md:hidden my-2" />
        <BookingFormValidate
          booking={booking}
          loading={loading}
          onValidate={validateBookingDetails}
          buttonLabel={`Enregistrer`}
        />
      </MainSection>
    </Layout>
  );
};

export default Booking;
