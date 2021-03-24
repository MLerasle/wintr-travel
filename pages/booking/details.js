import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { parseCookies, setCookie } from 'nookies';
import * as Sentry from '@sentry/browser';

import BookingForm from '@/App/Home/BookingForm';
import Recap from '@/App/Details/Recap';
import BookingFormSizes from '@/App/Details/BookingFormSizes';
import BookingFormEmail from '@/App/Details/BookingFormEmail';
import BookingFormValidate from '@/App/Details/BookingFormValidate';
import MainSection from '@/UI/MainSection';
import Separator from '@/UI/Separator';
import Modal from '@/UI/Modal';
import SizeSkis from '@/App/Sizes/SizeSkis';
import SizeShoes from '@/App/Sizes/SizeShoes';
import SizeHelmet from '@/App/Sizes/SizeHelmet';
import Alert from '@/UI/Alert';

import BookingContext from 'context/booking-context';
import * as gtag from 'lib/gtag';
import { EMAIL_PATTERN } from 'helpers/email';
import { getPrices, isValid } from 'helpers/booking';

const Details = () => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [isSizesModalOpened, setIsModalSizesOpened] = useState(false);
  const [formWasSubmitted, setFormWasSubmitted] = useState(false);
  const booking = useContext(BookingContext);
  const [formError, setFormError] = useState(
    !EMAIL_PATTERN.test(booking.email)
      ? 'Vous devez saisir une adresse email valide.'
      : ''
  );
  const [error, setError] = useState();
  const skiers = [...booking.adults, ...booking.children];
  const prices = getPrices(booking.adults.length, booking.children.length);

  useEffect(() => {
    gtag.pageView('Détails de la réservation', '/booking/details');
    if (!isValid(booking)) {
      setIsEditing(true);
    }
  }, []);

  const toggleSizesHelp = () => {
    gtag.event({
      action: 'toggle_sizes_help',
      category: 'Booking',
      label: isSizesModalOpened ? 'hide' : 'show',
    });
    setIsModalSizesOpened(!isSizesModalOpened);
  };

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
    person[attribute] = event.target.value;

    if (skier.label.startsWith('Adulte')) {
      booking.update('adults', skiers);
    } else {
      booking.update('children', skiers);
    }
  };

  const updateEmail = (event) => {
    const email = event.target.value;
    const error =
      email.trim() === '' || !EMAIL_PATTERN.test(email)
        ? 'Vous devez saisir une adresse email valide.'
        : '';
    setFormError(error);
    booking.update('email', email);
  };

  const updateNewsletterRegistration = () => {
    const register = !booking.isRegisteredToNewsletter;
    booking.update('isRegisteredToNewsletter', register);
  };

  const validateBookingDetails = async () => {
    setFormWasSubmitted(true);
    // Send a request to /api/checkout which will handle Stripe Payment Intent creation
    if (isValid(booking) && !formError) {
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
        <Modal open={isSizesModalOpened} closed={toggleSizesHelp}>
          <section className="md:text-md p-6">
            <SizeSkis />
            <SizeShoes withDetails />
            <SizeHelmet withDetails />
          </section>
        </Modal>
        {error && (
          <Alert
            type="error"
            message={error.message}
            onClearMessage={() => setError(null)}
          />
        )}
        {isEditing ? (
          <BookingForm isEditing onUpdate={validateBooking} />
        ) : (
          <>
            <Recap
              booking={booking}
              prices={prices}
              onEditBooking={editBooking}
            />
            <Separator className="md:hidden my-2" />
            <BookingFormSizes
              skiers={skiers}
              onUpdateSkier={updateSkier}
              onToggleSizesHelp={toggleSizesHelp}
            />
            <Separator className="md:hidden my-2" />
            <BookingFormEmail
              booking={booking}
              onEmailUpdate={updateEmail}
              onNewsletterRegistration={updateNewsletterRegistration}
              error={formWasSubmitted && formError ? formError : null}
            />
            <BookingFormValidate
              booking={booking}
              loading={loading}
              onValidate={validateBookingDetails}
              buttonLabel="Suivant"
            />
          </>
        )}
      </MainSection>
    </>
  );
};

export default Details;
