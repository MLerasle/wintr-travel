import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Firestore from '@google-cloud/firestore';
import * as Sentry from '@sentry/browser';
import * as SentryNode from '@sentry/node';

import BookingMainInfos from '@/App/Booking/BookingMainInfos';
import BookingFormDeliveryInfos from '@/App/Booking/BookingFormDeliveryInfos';
// import BookingCancel from '@/App/Booking/BookingCancel';
import BookingFormSizes from '@/App/Booking/BookingFormSizes';
import MainSection from '@/UI/MainSection';
import PageHeader from '@/UI/PageHeader';
import Alert from '@/UI/Alert';
import Button from '@/UI/Button';
import Loader from '@/UI/Loader';

import BookingContext from 'context/booking-context';
import * as gtag from 'lib/gtag';
import { GCP_CREDENTIALS } from 'lib/gcp';
import { isValid } from 'helpers/booking';

const Booking = ({ fetchedBooking }) => {
  const router = useRouter();
  const booking = useContext(BookingContext);
  const { token } = router.query;
  const [loading, setIsLoading] = useState(false);
  // const [isConfirmCancelModalOpened, setIsConfirmCancelModalOpened] = useState(
  //   false
  // );
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    localStorage.setItem('booking', JSON.stringify(fetchedBooking));
  }, []);

  const validateBookingDetails = async () => {
    setIsLoading(true);
    try {
      console.log('Payment intent id', fetchedBooking.paymentIntentId);
      const response = await fetch('/api/booking/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pid: fetchedBooking.paymentIntentId,
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

  // const toggleConfirmCancel = () => {
  //   setIsConfirmCancelModalOpened(!isConfirmCancelModalOpened);
  // };

  // const cancelBooking = async () => {
  //   setIsLoading(true);
  //   toggleConfirmCancel();
  //   await fetch('/api/booking/cancel', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(booking),
  //   });
  //   router.push('/').then(() => {
  //     setIsLoading(false);
  //     window.scrollTo(0, 0);
  //   });
  // };

  return (
    <>
      <Head>
        <title>Votre réservation - Wintr Travel</title>
      </Head>
      <MainSection className="py-2 md:py-6 max-w-screen-lg mx-auto">
        {/* <Modal open={isConfirmCancelModalOpened} closed={toggleConfirmCancel}>
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
        </Modal> */}
        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClearMessage={() => setAlert(null)}
          />
        )}

        <PageHeader title="Votre réservation">
          <p>Numéro: {token}</p>
          <div className="mt-3 space-y-3 md:space-x-3">
            {booking.state === 'prepaid' && (
              <a
                href={booking.stripeInvoiceUrl}
                target="_blank"
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-green hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-green"
                rel="noreferrer"
              >
                Payer la facture en ligne
              </a>
            )}
            <a
              href={booking.stripeInvoicePdf}
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-green"
            >
              Télécharger la facture
            </a>
          </div>
        </PageHeader>
        <div className="space-y-6">
          <BookingMainInfos booking={booking} bookingIsPrepaid />
          <BookingFormDeliveryInfos booking={booking} token={token} />
          <BookingFormSizes booking={booking} bookingIsPrepaid />
          <Button
            classes="uppercase tracking-wide w-full md:w-64 bg-primary-green text-white"
            name="save"
            disabled={!isValid(booking) || loading}
            onClick={validateBookingDetails}
          >
            {loading ? <Loader /> : 'Enregistrer'}
          </Button>
          {/* {!booking.canceled && <BookingCancel onCancel={toggleConfirmCancel} />} */}
        </div>
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
        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        };
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
