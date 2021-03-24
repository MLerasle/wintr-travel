import { useEffect, useState, useContext } from 'react';
import Router, { useRouter } from 'next/router';
import Head from 'next/head';
import Firestore from '@google-cloud/firestore';
import * as Sentry from '@sentry/browser';
import * as SentryNode from '@sentry/node';

import BookingValidatedInfos from '@/App/BookingEdit/BookingValidatedInfos';
import BookingDeliveryInfos from '@/App/BookingEdit/BookingDeliveryInfos';
// import BookingCancel from '@/App/BookingEdit/BookingCancel';
import BookingFormSizes from '@/App/Details/BookingFormSizes';
import BookingFormValidate from '@/App/Details/BookingFormValidate';
import MainSection from '@/UI/MainSection';
import Separator from '@/UI/Separator';
import Modal from '@/UI/Modal';
import SizeSkis from '@/App/Sizes/SizeSkis';
import SizeShoes from '@/App/Sizes/SizeShoes';
import SizeHelmet from '@/App/Sizes/SizeHelmet';
import Alert from '@/UI/Alert';
import Button from '@/UI/Button';

import BookingContext from 'context/booking-context';
import * as gtag from 'lib/gtag';
import { GCP_CREDENTIALS } from 'lib/gcp';

const Booking = ({ fetchedBooking }) => {
  const router = useRouter();
  const { token } = router.query;
  const [loading, setIsLoading] = useState(false);
  const [isSizesModalOpened, setIsModalSizesOpened] = useState(false);
  const [isConfirmCancelModalOpened, setIsConfirmCancelModalOpened] = useState(
    false
  );
  const [alert, setAlert] = useState(null);
  const booking = useContext(BookingContext);

  const skiers = [...fetchedBooking.adults, ...fetchedBooking.children];

  useEffect(() => {
    localStorage.setItem('booking', JSON.stringify(fetchedBooking));
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
      booking.update('adults', skiers);
    } else {
      booking.update('children', skiers);
    }
  };

  const validateBookingDetails = async () => {
    setIsLoading(true);
    try {
      console.log('Payment intent id', booking.paymentIntentId);
      const response = await fetch('/api/booking/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pid: booking.paymentIntentId,
          prevPhoneNumber: fetchedBooking.phoneNumber,
          phoneNumber: booking.phoneNumber,
          deliveryAddress: booking.deliveryAddress,
          placeId: booking.placeId,
          adults: booking.adults,
          children: booking.children,
        }),
      });
      let alert;
      if (response.status === 200) {
        alert = {
          message:
            'Les modifications de votre réservation ont bien été prises en compte.',
          type: 'success',
        };
      } else {
        alert = {
          message:
            "Une erreur est survenue durant la mise à jour de votre réservation. \nVeuillez réessayer ou prendre contact avec nous si l'erreur persiste.",
          type: 'error',
        };
      }
      setAlert(alert);
    } catch (error) {
      Sentry.captureException(error);
      setAlert({
        message:
          "Une erreur est survenue durant la mise à jour de votre réservation. \nVeuillez réessayer ou prendre contact avec nous si l'erreur persiste.",
        type: 'error',
      });
    }

    setIsLoading(false);
    window.scrollTo(0, 0);

    gtag.event({
      action: 'update_booking',
      category: 'Booking',
      label: '',
    });
  };

  const toggleConfirmCancel = () => {
    setIsConfirmCancelModalOpened(!isConfirmCancelModalOpened);
  };

  const cancelBooking = async () => {
    setIsLoading(true);
    toggleConfirmCancel();
    await fetch('/api/booking/cancel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(booking),
    });
    Router.push('/').then(() => {
      setIsLoading(false);
      window.scrollTo(0, 0);
    });
  };

  return (
    <>
      <Head>
        <title>Votre réservation - Wintr Travel</title>
      </Head>
      <MainSection className="py-2 md:py-6 max-w-screen-lg mx-auto">
        <Modal open={isSizesModalOpened} closed={toggleSizesHelp}>
          <section className="md:text-md p-6">
            <SizeSkis />
            <SizeShoes withDetails />
            <SizeHelmet withDetails />
          </section>
        </Modal>
        <Modal open={isConfirmCancelModalOpened} closed={toggleConfirmCancel}>
          <section className="md:text-md px-6 py-6 text-center">
            <p className="text-gray-800 text-lg my-6 font-semibold">
              Êtes-vous sûr de vouloir annuler votre réservation?
            </p>
            <Button
              classes="uppercase tracking-wide w-full md:w-64 bg-primary-red text-white"
              onClick={cancelBooking}
            >
              Confirmer
            </Button>
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
          onCancel={toggleConfirmCancel}
          buttonLabel={`Enregistrer`}
          token={token}
        />
        {/* {!booking.canceled && <BookingCancel onCancel={toggleConfirmCancel} />} */}
      </MainSection>
    </>
  );
};

export async function getServerSideProps(context) {
  const db = new Firestore(GCP_CREDENTIALS);
  const token = context.params.token;
  const docRef = db
    .collection(process.env.GOOGLE_FIRESTORE_BOOKINGS)
    .doc(token);
  let fetchedBooking;
  try {
    const doc = await docRef.get();
    if (doc.exists) {
      fetchedBooking = doc.data();
      if (fetchedBooking.canceled) {
        context.res.writeHead(302, { Location: '/' });
        context.res.end();
      }
      return {
        props: {
          fetchedBooking,
        },
      };
    } else {
      return {
        notFound: true,
      };
    }
  } catch (error) {
    SentryNode.captureException(error);
    return {
      notFound: true,
    };
  }
  // const fetchedBooking = {
  //   firstDay: '2021-02-06',
  //   adults: [{ label: 'Adulte 1' }, { label: 'Adulte 2' }],
  //   children: [],
  //   email: 'maxlerasle@test.com',
  //   name: 'Maxime Lerasle',
  //   phoneNumber: '+33612345678',
  //   countryCode: 'FR',
  //   deliveryAddress: '',
  //   placeId: null,
  //   isRegisteredToNewsletter: true,
  //   paymentIntentId: 'pi_1I6z5NExu4LJSLGAqJt6nTDH',
  //   stripeInvoiceId: null,
  //   stripeCustomerId: 'cus_IiMdlcFLOKSvXs',
  //   state: 'prepaid',
  // };
  // if (fetchedBooking.state === 'canceled') {
  //   context.res.writeHead(302, { Location: '/' });
  //   context.res.end();
  // }
  // return {
  //   props: {
  //     fetchedBooking,
  //   },
  // };
}

export default Booking;
