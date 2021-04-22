import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { parseCookies, setCookie } from 'nookies';
import * as Sentry from '@sentry/browser';

import Button from '@/UI/Button';
import Loader from '@/UI/Loader';
import Alert from '@/UI/Alert';

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
  } = useForm();

  const validateBookingDetails = async (data) => {
    // Send a request to /api/checkout which will handle Stripe Payment Intent creation
    try {
      setIsLoading(true);
      booking.update('email', data.email);
      booking.update('isRegisteredToNewsletter', data.registerToNewsletter);
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          ...booking,
          email: data.email,
          isRegisteredToNewsletter: data.registerToNewsletter,
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
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-semibold text-gray-800">
              Informations de contact
            </h3>
            <p className="mt-1 max-w-2xl text-gray-500">
              Pour vous tenir informé de l'état de votre réservation et
              effectuer les opérations d'après-vente.
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <div className="sm:px-6 py-4 sm:py-5">
              <input
                type="email"
                id="email"
                {...register('email', {
                  required: true,
                  pattern: EMAIL_PATTERN,
                })}
                className={`input my-4 md:my-0 w-full lg:w-1/2 ${
                  errors.email && 'input-error'
                }`}
                placeholder="Email"
              />
              {errors.email && (
                <p className="input-error-message">
                  L'email saisi est invalide.
                </p>
              )}
              <p className="text-gray-700 mt-4">
                Nous vous enverrons des codes de réduction et offres
                exceptionnelles.
              </p>
              <div className="flex items-center mt-2">
                <input
                  id="registerToNewsletter"
                  {...register('registerToNewsletter')}
                  type="checkbox"
                  className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="registerToNewsletter"
                  className="ml-2 block text-gray-700"
                >
                  Cochez cette case si vous ne souhaitez pas en recevoir.
                </label>
              </div>
            </div>
          </div>
        </div>
        <Button
          type="submit"
          classes="uppercase tracking-wide w-full md:w-64 bg-primary-green text-white mt-6"
          name="confirm"
          disabled={loading}
        >
          {loading ? <Loader /> : 'Suivant'}
        </Button>
      </form>
    </>
  );
};

export default BookingFormEmail;
