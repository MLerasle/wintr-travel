import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useRouter } from 'next/router';
import Head from 'next/head';

import Layout from '@/Layout/Layout';
import BookingValidatedInfos from '@/App/BookingEdit/BookingValidatedInfos';
import BookingDeliveryInfos from '@/App/BookingEdit/BookingDeliveryInfos';
import BookingFormSizes from '@/App/Details/BookingFormSizes';
import BookingFormValidate from '@/App/Details/BookingFormValidate';
import MainSection from '@/UI/MainSection';
import Separator from '@/UI/Separator';
import Modal from '@/UI/Modal';
import SizeSkis from '@/App/Sizes/SizeSkis';
import SizeShoes from '@/App/Sizes/SizeShoes';
import SizeHelmet from '@/App/Sizes/SizeHelmet';
import Alert from '@/UI/Alert';

import * as gtag from 'lib/gtag';
import { setSkiers, initializeBooking } from 'store/actions';
import { PAID_BOOKING } from 'data/booking';

const Booking = () => {
  const router = useRouter();
  const { token } = router.query;
  const _isMounted = useRef(true);
  const [loading, setIsLoading] = useState(false);
  const [isSizesModalOpened, setIsModalSizesOpened] = useState(false);
  const [alert, setAlert] = useState(null);
  const booking = useSelector((state) => state, shallowEqual);
  const dispatch = useDispatch();

  const skiers = [...booking.adults, ...booking.children];

  useEffect(() => {
    return () => {
      _isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    dispatch(initializeBooking(PAID_BOOKING));
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
    person[attribute] = event.target.value;

    if (skier.label.startsWith('Adulte')) {
      dispatch(setSkiers(skiers, booking.children));
    } else {
      dispatch(setSkiers(booking.adults, skiers));
    }
  };

  const validateBookingDetails = async () => {
    setIsLoading(true);
    try {
      await fetch('/api/booking/publish', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(booking),
      });
      setAlert({
        message:
          'Les modifications de votre réservation ont bien été prises en compte.',
        type: 'success',
      });
    } catch (error) {
      setAlert({
        message:
          "Une erreur est survenue durant la mise à jour de votre réservation. \nVeuillez réessayer ou prendre contact avec nous si l'erreur persiste.",
        type: 'error',
      });
      console.log({ error });
    }

    setIsLoading(false);
    window.scrollTo(0, 0);

    gtag.event({
      action: 'update_booking',
      category: 'Booking',
      label: '',
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
        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClearMessage={() => setAlert(null)}
          />
        )}
        <BookingValidatedInfos booking={booking} />
        <Separator className="md:hidden my-2" />
        <BookingDeliveryInfos booking={booking} token={token} />
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
