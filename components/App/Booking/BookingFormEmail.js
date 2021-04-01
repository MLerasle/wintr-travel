import { useState } from 'react';

import Input from '@/UI/Input';
import Checkbox from '@/UI/Checkbox';

import { EMAIL_PATTERN } from 'helpers/email';
import { isEmailValid } from 'helpers/email';

const BookingFormEmail = ({ booking, formWasSubmitted }) => {
  const [error, setError] = useState(
    !EMAIL_PATTERN.test(booking.email)
      ? 'Vous devez saisir une adresse email valide.'
      : ''
  );

  const updateEmail = (event) => {
    const email = event.target.value;
    const emailError = isEmailValid(email)
      ? ''
      : 'Vous devez saisir une adresse email valide.';
    setError(emailError);
    booking.update('email', email);
  };

  const updateNewsletterRegistration = () => {
    const register = !booking.isRegisteredToNewsletter;
    booking.update('isRegisteredToNewsletter', register);
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-semibold text-gray-800">
          Informations de contact
        </h3>
        <p className="mt-1 max-w-2xl text-gray-500">
          Pour vous tenir informé de l'état de votre réservation et effectuer
          les opérations d'après-vente.
        </p>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <div className="sm:px-6 py-4 sm:py-5">
          <Input
            type="email"
            id="email-address"
            name="email-address"
            className={`my-4 md:my-0 w-full lg:w-1/2 ${
              formWasSubmitted && error && 'border-primary-red bg-light-red'
            }`}
            placeholder="Email"
            onChange={(event) => updateEmail(event)}
            value={booking.email}
          />
          <div className="error text-primary-red pt-1 pl-1" role="alert">
            {formWasSubmitted && error && error}
          </div>
          <p className="text-gray-700 mt-4">
            Nous vous enverrons des codes de réduction et offres
            exceptionnelles.
          </p>
          <Checkbox
            name="registerToNewsletter"
            value={!booking.isRegisteredToNewsletter}
            onChange={(event) => updateNewsletterRegistration(event)}
          >
            Cochez cette case si vous ne souhaitez pas en recevoir.
          </Checkbox>
        </div>
      </div>
    </div>
  );
};

export default BookingFormEmail;
