import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useForm, Controller } from 'react-hook-form';
import { parseCookies, setCookie } from 'nookies';
import * as Sentry from '@sentry/browser';

import Loader from '@/UI/Loader';
import Alert from '@/UI/Alert';
import Toggle from '@/UI/Toggle';

import { EMAIL_PATTERN } from 'helpers/email';
import * as gtag from 'lib/gtag';

const BookingFormEmail = ({ booking }) => {
  const router = useRouter();
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm({
    reValidateMode: 'onChange',
    defaultValues: useMemo(() => {
      return {
        email: booking.email,
        isRegisteredToNewsletter: booking.isRegisteredToNewsletter,
      };
    }, [booking.email, booking.isRegisteredToNewsletter]),
  });

  useEffect(() => {
    if (booking.email) {
      reset({
        email: booking.email,
        isRegisteredToNewsletter: booking.isRegisteredToNewsletter,
      });
    }
  }, [booking.email, booking.isRegisteredToNewsletter]);

  const validateBookingDetails = async (data) => {
    // Send a request to /api/checkout which will handle Stripe Payment Intent creation
    try {
      setIsLoading(true);
      booking.update({
        email: data.email,
        isRegisteredToNewsletter: data.isRegisteredToNewsletter,
      });
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          ...booking,
          email: data.email,
          isRegisteredToNewsletter: data.isRegisteredToNewsletter,
        }),
      });
      const respData = await response.json();
      // Store the Payment Intent id in a cookie if we don't already have one
      const { paymentIntentId } = parseCookies();
      if (!paymentIntentId) {
        setCookie(null, 'paymentIntentId', respData.paymentIntent.id, {
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
      Sentry.captureException(err);
      gtag.event({
        action: 'submit_details_form',
        category: 'Booking',
        label: 'Error while validating booking details',
      });
    }
  };

  return (
    <>
      {error && (
        <div className="mb-4 md:mb-8">
          <Alert
            type="error"
            message={error.message}
            onClearMessage={() => setError(null)}
          />
        </div>
      )}
      <form onSubmit={handleSubmit(validateBookingDetails)}>
        <h3 className="text-lg leading-6 font-semibold text-gray-800 mb-4">
          Adresse Email
        </h3>
        <p className="mt-1 max-w-2xl text-gray-500">
          Pour vous tenir informé de l'état de votre réservation et effectuer
          les opérations d'après-vente.
        </p>
        <div className="py-4 sm:py-5">
          <input
            type="email"
            id="email"
            {...register('email', {
              required: true,
              pattern: EMAIL_PATTERN,
            })}
            className={`input my-4 md:my-0 w-full ${
              errors.email && 'input-error'
            }`}
            placeholder="Saisissez votre email ici"
          />
          {errors.email && (
            <p className="input-error-message">L'email saisi est invalide.</p>
          )}
          <Controller
            render={({ field: { onChange, value } }) => (
              <Toggle
                label="Je souhaite recevoir des codes de réduction et offres exceptionnelles."
                onChange={onChange}
                value={value}
                containerClassName="mt-6"
              />
            )}
            control={control}
            name="isRegisteredToNewsletter"
          />
        </div>
        <button
          type="submit"
          className={`btn btn-large btn-primary w-full mt-6 ${
            loading && 'btn-disabled'
          }`}
          name="confirm"
          disabled={loading}
        >
          {loading ? <Loader /> : 'Suivant'}
        </button>
      </form>
    </>
  );
};

export default BookingFormEmail;
