import { useState } from 'react';
import { IconContext } from 'react-icons';
import { MdDone } from 'react-icons/md';
import { isValidPhoneNumber } from 'react-phone-number-input';

import InputPhone from '@/UI/InputPhone';
import Loader from '@/UI/Loader';

import * as gtag from 'lib/gtag';

const PhoneNumberStep = ({ onPhoneNumberSubmitted }) => {
  const [phoneNumber, setPhoneNumber] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const changeMobileNumber = (e) => {
    setError(null);
    setPhoneNumber(e);
  };

  const submitPhoneNumber = (e) => {
    e.preventDefault();
    setIsLoading(true);
    let gtagLabel;
    if (isValidPhoneNumber(phoneNumber)) {
      // Send it to the backend
      gtagLabel = 'Phone number OK';
      onPhoneNumberSubmitted(phoneNumber);
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
      <div className="flex flex-col items-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
          <IconContext.Provider value={{ color: '#389469', size: '1.5rem' }}>
            <MdDone />
          </IconContext.Provider>
        </div>
        <h1 className="mt-4 md:mb-8 text-3xl font-bold text-gray-800 leading-tight sm:text-4xl">
          Commande validée
        </h1>
      </div>

      <div className="text-center text-gray-500 text-lg">
        <p className="my-8 md:my-4">
          Votre réservation et votre paiement ont bien été enregistrés.
        </p>
        <p className="my-8 md:my-4">
          Vous allez recevoir d'ici quelques minutes un email contenant les
          détails de votre réservation ainsi que votre facture.
        </p>
        <p className="my-8 md:mt-6">
          Renseignez dès maintenant votre numéro de mobile pour rester informé
          en temps réel de la livraison de votre matériel.
        </p>
        <form className="md:mx-auto md:max-w-xs">
          <div className="min-w-0 flex-1">
            <InputPhone
              value={phoneNumber}
              onChange={changeMobileNumber}
              focus
              error={error}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary mt-6 w-full md:mt-4"
            name="validate"
            disabled={isLoading}
            onClick={submitPhoneNumber}
          >
            {isLoading ? <Loader /> : 'Valider'}
          </button>
        </form>
      </div>
    </>
  );
};

export default PhoneNumberStep;
