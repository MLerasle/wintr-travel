import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { parseCookies, setCookie } from 'nookies';
import * as Sentry from '@sentry/browser';

import BookingMainInfos from '@/App/Booking/BookingMainInfos';
import BookingFormSizes from '@/App/Booking/BookingFormSizes';
import BookingFormEmail from '@/App/Booking/BookingFormEmail';
import MainSection from '@/UI/MainSection';
import Alert from '@/UI/Alert';
import Button from '@/UI/Button';
import Loader from '@/UI/Loader';

import BookingContext from 'context/booking-context';
import * as gtag from 'lib/gtag';
import { isValid } from 'helpers/booking';
import { isEmailValid } from 'helpers/email';

const Details = () => {
  const router = useRouter();
  const booking = useContext(BookingContext);
  const [loading, setIsLoading] = useState(false);
  const [formWasSubmitted, setFormWasSubmitted] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    gtag.pageView('Détails de la réservation', '/booking/details');
  }, []);

  const validateBookingDetails = async () => {
    setFormWasSubmitted(true);
    // Send a request to /api/checkout which will handle Stripe Payment Intent creation
    if (isValid(booking) && isEmailValid(booking.email)) {
      setIsLoading(true);
      try {
        const response = await fetch('/api/checkout', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(booking),
        });
        const data = await response.json();
        // Store the Payment Intent id in a cookie if we don't already have one
        const { paymentIntentId } = parseCookies();
        if (!paymentIntentId) {
          setCookie(null, 'paymentIntentId', data.paymentIntent.id, {
            maxAge: 24 * 60 * 60,
          });
        }

        gtag.event({
          action: 'submit_details_form',
          category: 'Booking',
          label: 'Submission OK',
        });

        router.push('/booking/checkout').then(() => {
          setIsLoading(false);
        });
      } catch (err) {
        setIsLoading(false);
        setError({
          message:
            "Une erreur est survenue, veuillez réessayer ou prendre contact avec nous si l'erreur persiste.",
        });
        window.scrollTo(0, 0);
        Sentry.captureException(err);
        gtag.event({
          action: 'submit_details_form',
          category: 'Booking',
          label: 'Error while validating booking details',
        });
      }
    }
  };

  return (
    <>
      <Head>
        <title>Votre réservation - Wintr Travel</title>
      </Head>
      <MainSection className="py-2 md:py-6 max-w-screen-lg mx-auto">
        <div className="space-y-6">
          {error && (
            <Alert
              type="error"
              message={error.message}
              onClearMessage={() => setError(null)}
            />
          )}
          <BookingMainInfos booking={booking} />
          <BookingFormSizes booking={booking} />
          <BookingFormEmail
            booking={booking}
            formWasSubmitted={formWasSubmitted}
          />

          <Button
            classes="uppercase tracking-wide w-full md:w-64 bg-primary-green text-white"
            name="confirm"
            disabled={!isValid(booking) || loading}
            onClick={validateBookingDetails}
          >
            {loading ? <Loader /> : 'Suivant'}
          </Button>
        </div>
      </MainSection>
    </>
  );
};

export default Details;
