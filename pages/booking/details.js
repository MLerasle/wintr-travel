import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import Head from 'next/head';
import { parseCookies, setCookie } from 'nookies';

import Layout from '@/Layout/Layout';
import BookingForm from '@/App/BookingForm';
import BookingMainInfo from '@/App/BookingMainInfo';
import BookingFormDetails from '@/App/BookingFormDetails';
import BookingFormEmail from '@/App/BookingFormEmail';
import BookingFormValidate from '@/App/BookingFormValidate';
import MainSection from '@/UI/MainSection';
import Separator from '@/UI/Separator';
import Modal from '@/UI/Modal';
import SizeSkis from '@/App/SizeSkis';
import SizeShoes from '@/App/SizeShoes';
import SizeHelmet from '@/App/SizeHelmet';
import ErrorAlert from '@/UI/ErrorAlert';

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
    return () => {
      _isMounted.current = false;
    };
  }, []);

  const toggleSizesHelp = () => {
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
    if (attribute === 'headSize') {
      person[attribute] = event.target.value;
    } else {
      person[attribute] = +event.target.value;
    }

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

  const updateEmail = (event) => {
    const email = event.target.value;
    const error =
      email.trim() === '' || !EMAIL_PATTERN.test(email)
        ? 'Vous devez saisir une adresse email valide.'
        : '';
    setFormError(error);
    dispatch({
      type: 'SET_EMAIL',
      email,
    });
  };

  const updateNewsletterRegistration = () => {
    const register = !booking.isRegisteredToNewsletter;
    dispatch({
      type: 'SET_REGISTERED_TO_NEWSLETTER',
      register,
    });
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
        // if (!data.paymentIntent) {
        //   // TODO: display a message to the user and send a report
        //   console.log('ERROR', data.error);
        //   setIsLoading(false);
        //   return;
        // }
        // Store the Payment Intent id in a cookie if we don't already have one
        const { paymentIntentId } = parseCookies();
        if (!paymentIntentId) {
          setCookie(null, 'paymentIntentId', data.paymentIntent.id);
        }
        Router.push('/booking/checkout').then(() => {
          if (_isMounted.current) {
            setIsLoading(false);
          }
          window.scrollTo(0, 0);
        });
      } catch (err) {
        setIsLoading(false);
        setError(
          "Une erreur est survenue, veuillez réessayer ou prendre contact avec nous si l'erreur persiste."
        );
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
          <ErrorAlert
            error={error.message}
            onClearError={() => setError(null)}
          />
        )}
        {isEditing ? (
          <BookingForm isEditing onUpdate={validateBooking} />
        ) : (
          <>
            <BookingMainInfo
              booking={booking}
              prices={prices}
              onEditBooking={editBooking}
            />
            <Separator className="md:hidden my-2" />
            <BookingFormDetails
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
