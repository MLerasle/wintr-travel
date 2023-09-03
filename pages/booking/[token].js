import { useEffect, useState, useContext } from 'react';
import Head from 'next/head';

import BookingStripeLinks from '@/App/Booking/BookingStripeLinks';
import BookingFormEdit from '@/App/Booking/BookingFormEdit';
import BookingSummary from '@/App/Booking/BookingSummary';
import MainSection from '@/UI/MainSection';
import Alert from '@/UI/Alert';
import Divider from '@/UI/Divider';

import BookingContext from 'context/booking-context';
import { getBookingDocRef } from 'lib/gcp';

const SUCCESS_MESSAGE =
  'Les modifications de votre réservation ont bien été prises en compte.';
const ERROR_MESSAGE =
  "Une erreur est survenue durant la mise à jour de votre réservation. \nVeuillez réessayer ou prendre contact avec nous si l'erreur persiste.";

const Booking = ({ fetchedBooking, token }) => {
  const booking = useContext(BookingContext);
  const [loading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    sessionStorage.setItem('booking', JSON.stringify(fetchedBooking));
    return () => {
      // Clear booking context and session storage before leaving the page
      booking.clear();
    };
  });

  const validateBookingDetails = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `/api/booking/${fetchedBooking.paymentIntentId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prevPhoneNumber: fetchedBooking.phoneNumber,
            phoneNumber: booking.phoneNumber,
            deliveryAddress: booking.deliveryAddress,
            placeId: booking.placeId,
            adults: booking.adults,
            children: booking.children,
          }),
        }
      );

      if (response.status === 200) {
        setAlert({ message: SUCCESS_MESSAGE, type: 'success' });
      } else {
        setAlert({ message: ERROR_MESSAGE, type: 'error' });
      }
    } catch (error) {
      setAlert({ message: ERROR_MESSAGE, type: 'error' });
    }

    setIsLoading(false);
    window.scrollTo(0, 0);
  };

  const onBookingCancel = (status) => {
    // TODO: Once this works, redirect after a few sec to the home page?
    // Don't display booking informations anymore?
    // Decide what to do to get a good UX
    let message;
    if (status === 'success') {
      message =
        "Votre réservation a été annulée avec succès. Vous allez recevoir un email de confirmation d'ici quelques minutes.";
    } else {
      message =
        "Une erreur est survenue durant l'annulation de votre réservaion. Veuillez réessayer ou contacter notre service client si l'erreur persiste.";
    }

    window.scrollTo(0, 0);
    setAlert({
      message,
      type: status,
    });
  };

  return (
    <>
      <Head>
        <title>Votre réservation - Wintr Travel</title>
      </Head>
      <MainSection>
        {alert && (
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 pt-6 sm:pt-10">
            <Alert
              type={alert.type}
              message={alert.message}
              onClearMessage={() => setAlert(null)}
            />
          </div>
        )}

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
            <BookingStripeLinks booking={booking} />
          </header>
          <Divider className="pt-6" />
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 lg:grid-cols-2 lg:gap-x-12">
            <BookingFormEdit
              booking={booking}
              token={token}
              loading={loading}
              onValidate={validateBookingDetails}
            />
            <BookingSummary
              booking={fetchedBooking}
              page="edit"
              onCancel={(status) => onBookingCancel(status)}
            />
          </div>
        </div>
      </MainSection>
    </>
  );
};

export async function getServerSideProps(context) {
  const token = context.params.token;
  const docRef = getBookingDocRef(token);
  let fetchedBooking;

  try {
    const doc = await docRef.get();
    if (doc.exists) {
      fetchedBooking = doc.data();
      if (fetchedBooking.state === 'canceled') {
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
          token,
        },
      };
    } else {
      return {
        notFound: true,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}

export default Booking;
