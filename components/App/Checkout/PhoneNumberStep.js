import { useState, useEffect } from 'react';
import { IconContext } from 'react-icons';
import { HiOutlineCheck } from 'react-icons/hi';
import { isValidPhoneNumber } from 'libphonenumber-js';

import InputPhone from '@/UI/InputPhone';
import Loader from '@/UI/Loader';

const PhoneNumberStep = ({ onPhoneNumberSubmitted, onSkip }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    document.getElementById('phone_number').focus();
  }, []);

  const changeMobileNumber = (e) => {
    setError(null);
    setPhoneNumber(e);
  };

  const submitPhoneNumber = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (isValidPhoneNumber(`+${phoneNumber}`)) {
      // Send it to the backend
      onPhoneNumberSubmitted(phoneNumber);
    } else {
      setError('Le numéro saisi est incorrect.');
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
          <IconContext.Provider value={{ color: '#389469', size: '1.5rem' }}>
            <HiOutlineCheck />
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
        <form onSubmit={submitPhoneNumber} className="md:mx-auto md:max-w-xs">
          <div className="min-w-0 flex-1">
            <InputPhone
              value={phoneNumber}
              onChange={changeMobileNumber}
              error={error}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary mt-6 w-full md:mt-4"
            name="validate"
            disabled={isLoading}
          >
            {isLoading ? <Loader /> : 'Valider'}
          </button>
        </form>
        <button
          type="button"
          className="mt-4 lg:bg-white text-sm underline text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={onSkip}
        >
          Passer cette étape
        </button>
      </div>
    </>
  );
};

export default PhoneNumberStep;
