import { useState, useRef, useEffect } from 'react';
import Icon from '@mdi/react';
import { mdiCheck } from '@mdi/js';
import 'react-phone-number-input/style.css';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';

import Input from '@/UI/Input';
import Button from '@/UI/Button';
import Loader from '@/UI/Loader';

import * as gtag from 'lib/gtag';

const PhoneNumberStep = ({ onPhoneNumberSubmitted }) => {
  const [mobileNumber, setMobileNumber] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const phoneNumberInputRef = useRef();

  useEffect(() => {
    phoneNumberInputRef.current.focus();
    phoneNumberInputRef.current.selectionStart = phoneNumberInputRef.current.selectionEnd =
      phoneNumberInputRef.current.value.length;
  }, []);

  const changeMobileNumber = (e) => {
    setError(null);
    setMobileNumber(e);
  };

  const submitPhoneNumber = (e) => {
    e.preventDefault();
    setIsLoading(true);
    let gtagLabel;
    if (isValidPhoneNumber(mobileNumber)) {
      // Send it to the backend
      gtagLabel = 'Phone number OK';
      onPhoneNumberSubmitted();
    } else {
      gtagLabel = 'Phone number incorrect';
      setError('Le numéro saisi est incorrect.');
    }
    gtag.event({
      action: 'submit_phone_number',
      category: 'Booking',
      label: gtagLabel,
    });
    setIsLoading(false);
  };

  return (
    <>
      <div className="flex flex-col items-center -mt-4">
        <Icon path={mdiCheck} size={4} color="#0CB3FA" />
        <h1 className="md:mb-8 text-2xl sm:text-3xl leading-tight font-semibold text-gray-800">
          Commande validée
        </h1>
      </div>

      <div className="text-center md:text-left text-gray-700 text-lg">
        <p className="my-8 md:my-4">
          Votre réservation et votre paiement ont bien été enregistrés.
        </p>
        <p className="my-8 md:my-4">
          Vous allez recevoir d'ici quelques minutes un email contenant les
          détails de votre réservation ainsi que votre facture.
        </p>
        <p className="my-8 md:my-6">
          Renseignez dès maintenant votre{' '}
          <span className="font-bold">numéro de mobile</span> pour rester
          informé en temps réel de la livraison de votre matériel:
        </p>
        <form className="max-w-sm">
          <PhoneInput
            placeholder="+33 6 12 34 56 78"
            defaultCountry="FR"
            country="FR"
            international
            withCountryCallingCode
            inputComponent={Input}
            ref={phoneNumberInputRef}
            value={mobileNumber}
            onChange={changeMobileNumber}
          />
          <div className="error text-red-600 pt-1 pl-1" role="alert">
            {error && error}
          </div>
          <Button
            type="submit"
            classes="w-full uppercase tracking-wide bg-white border border-secondary-blue text-secondary-blue mt-4"
            name="validate"
            disabled={isLoading}
            onClick={submitPhoneNumber}
          >
            {isLoading ? <Loader /> : 'Valider'}
          </Button>
        </form>
      </div>
    </>
  );
};

export default PhoneNumberStep;
