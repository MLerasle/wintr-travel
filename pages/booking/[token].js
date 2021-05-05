import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Firestore from '@google-cloud/firestore';
import * as Sentry from '@sentry/browser';
import * as SentryNode from '@sentry/node';

import BookingSummary from '@/App/Booking/BookingSummary';
import BookingDeliveryAddress from '@/App/Booking/BookingFormDeliveryAddress';
// import BookingCancel from '@/App/Booking/BookingCancel';
import BookingFormSizes from '@/App/Booking/BookingFormSizes';
import MainSection from '@/UI/MainSection';
import Alert from '@/UI/Alert';
import Loader from '@/UI/Loader';
import FormRow from '@/UI/FormRow';
import InputPhone from '@/UI/InputPhone';
import Divider from '@/UI/Divider';

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
    sessionStorage.setItem('booking', JSON.stringify(fetchedBooking));
    return () => {
      // Clear booking context and session storage before leaving the page
      booking.clear();
    };
  }, []);

  const onDeliveryAddressUpdate = (address, placeId) => {
    booking.update({
      deliveryAddress: address,
      placeId: placeId,
    });
  };

  const onPhoneNumberUpdate = (phoneNumber) => {
    booking.update({ phoneNumber: phoneNumber });
  };

  const validateBookingDetails = async () => {
    setIsLoading(true);
    try {
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
      <MainSection>
        {/* <Modal open={isConfirmCancelModalOpened} closed={toggleConfirmCancel}>
          <section className="md:text-md px-6 py-6 text-center">
            <p className="text-gray-800 text-lg my-6 font-semibold">
              Êtes-vous sûr de vouloir annuler votre réservation?
            </p>
            <Button
              classes="uppercase tracking-wide w-full md:w-64 bg-red-600 text-white"
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

        {/* <PageHeader title="Votre réservation">
          <p>Numéro: {token}</p>
          <p className="mt-3 space-y-3 md:space-x-3">
            {booking.state === 'prepaid' && (
              <a
                href={booking.stripeInvoiceUrl}
                target="_blank"
                type="button"
                className="btn btn-small btn-primary"
                rel="noreferrer"
              >
                Payer la facture en ligne
              </a>
            )}
            <a
              href={booking.stripeInvoicePdf}
              type="button"
              className="btn btn-small btn-white"
            >
              Télécharger la facture
            </a>
          </p>
        </PageHeader> */}
        <div className="max-w-7xl mx-auto px-4 pt-8 pb-16 sm:pb-24 sm:px-6 lg:px-8">
          <header className="lg:flex justify-between items-baseline">
            <section>
              <h1 className="leading-tight font-bold text-gray-800 text-3xl">
                Informations sur votre réservation
              </h1>
              <p className="max-w-3xl text-lg md:text-xl leading-normal text-gray-500">
                Numéro: {token}
              </p>
            </section>
            <section className="mt-3 md:space-x-3 space-y-3 md:space-y-0">
              {booking.state === 'prepaid' && (
                <a
                  href={booking.stripeInvoiceUrl}
                  target="_blank"
                  type="button"
                  className="btn btn-small btn-primary w-full md:w-auto"
                  rel="noreferrer"
                >
                  Payer la facture en ligne
                </a>
              )}
              <a
                href={booking.stripeInvoicePdf}
                type="button"
                className="btn btn-small btn-white w-full md:w-auto"
              >
                Télécharger la facture
              </a>
            </section>
          </header>
          <Divider className="pt-6" />
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 lg:grid-cols-2 lg:gap-x-12">
            <div className="pt-6">
              <FormRow>
                <BookingDeliveryAddress
                  booking={booking}
                  token={token}
                  onDeliveryAddressUpdate={onDeliveryAddressUpdate}
                />
              </FormRow>
              <FormRow className="pt-6">
                <InputPhone
                  value={booking.phoneNumber}
                  onChange={onPhoneNumberUpdate}
                  className="w-full"
                  withLabel
                />
              </FormRow>
              <BookingFormSizes booking={booking} bookingIsPrepaid />
              <button
                className="btn btn-primary btn-large w-full mt-8"
                name="save"
                disabled={!isValid(booking) || loading}
                onClick={validateBookingDetails}
              >
                {loading ? <Loader /> : 'Enregistrer'}
              </button>
            </div>
            <BookingSummary page="edit" />
          </div>
        </div>
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
}

export default Booking;
