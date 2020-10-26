import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import Head from 'next/head';
import { parseCookies, setCookie } from 'nookies';

import Layout from '@/Layout/Layout';
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

import * as gtag from 'lib/gtag';
import { setSkiers, setEmail, setRegisteredToNewsLetter } from 'store/actions';
import { EMAIL_PATTERN } from 'helpers/email';
import { getPrices, isValid } from 'helpers/booking';

const Details = () => {
  const _isMounted = useRef(true);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [isSizesModalOpened, setIsModalSizesOpened] = useState(false);
  const [formWasSubmitted, setFormWasSubmitted] = useState(false);
  const booking = useSelector((state) => state);
  const dispatch = useDispatch();
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
    return () => {
      _isMounted.current = false;
    };
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
      dispatch(setSkiers(skiers, booking.children));
    } else {
      dispatch(setSkiers(booking.adults, skiers));
    }
  };

  const updateEmail = (event) => {
    const email = event.target.value;
    const error =
      email.trim() === '' || !EMAIL_PATTERN.test(email)
        ? 'Vous devez saisir une adresse email valide.'
        : '';
    setFormError(error);
    dispatch(setEmail(email));
  };

  const updateNewsletterRegistration = () => {
    const register = !booking.isRegisteredToNewsletter;
    dispatch(setRegisteredToNewsLetter(register));
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

        Router.push('/booking/checkout').then(() => {
          if (_isMounted.current) {
            setIsLoading(false);
          }
          window.scrollTo(0, 0);
        });
      } catch (err) {
        gtag.event({
          action: 'submit_details_form',
          category: 'Booking',
          label: 'Error while validating booking details',
        });
        setIsLoading(false);
        setError({
          message:
            "Une erreur est survenue, veuillez réessayer ou prendre contact avec nous si l'erreur persiste.",
        });
      }
    }
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
    </Layout>
  );
};

export default Details;
