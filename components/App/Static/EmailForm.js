import { useState } from 'react';

import FormRow from '@/UI/FormRow';
import Divider from '@/UI/Divider';
import Alert from '@/UI/Alert';
import Loader from '@/UI/Loader';

import { EMAIL_PATTERN } from 'helpers/email';

const EmailForm = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const submitEmailForm = async (e) => {
    e.preventDefault();

    if (email.trim() === '' || !EMAIL_PATTERN.test(email)) {
      setError({
        message: "L'email saisi est incorrect.",
        type: 'invalid_email',
      });
      return;
    }

    setIsLoading(true);
    setError('');

    const response = await fetch('/api/createContact', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (response.status === 400) {
      setError({
        message:
          "Une erreur est survenue. Veuillez vérifier l'adresse email saisie et réessayer.",
      });
    }

    setIsSubmitted(true);
    setIsLoading(false);
    setEmail('');
  };

  return (
    <>
      {error && (
        <div className="mb-4 md:mb-8">
          <Alert
            type="error"
            message={error.message}
            onClearMessage={() => setError('')}
          />
        </div>
      )}
      {isSubmitted && !error && (
        <div className="mb-4 md:mb-8">
          <Alert
            type="success"
            message={'Merci! Votre inscription a bien été prise en compte.'}
            onClearMessage={() => setIsSubmitted(false)}
          />
        </div>
      )}
      <header className="flex justify-between items-baseline">
        <h2 className="items-center leading-tight font-bold text-gray-800 hidden md:flex text-xl sm:text-3xl">
          Livraison de skis au pied des pistes.
        </h2>
      </header>
      <Divider className="py-6 hidden md:block" />
      <section className="text-gray-700 text-lg">
        <p>
          En raison de la situation liée à la pandémie de COVID-19,{' '}
          <span className="font-bold">
            notre sytème de réservation est momentanément fermé
          </span>
          .
        </p>
        <p className="mt-4">
          <span className="font-bold">Les places étant limitées</span>, vous
          pouvez renseigner votre email ci-dessous pour être tenu informé de la
          réouverture de celui-ci pour la saison 2021/2022:
        </p>
      </section>
      <form className="md:mt-4">
        <FormRow className="w-full mt-4">
          <label className="label" htmlFor="email-address">
            Votre adresse email
          </label>
          <input
            type="email"
            id="email-address"
            name="email-address"
            className={`input my-0 w-full ${
              error && error.type === 'invalid_email' && 'input-error'
            }`}
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
          />
        </FormRow>
        <button
          type="submit"
          id="submitButton"
          className="btn w-full mt-2"
          name="validate"
          disabled={isLoading}
          onClick={submitEmailForm}
        >
          {isLoading ? <Loader /> : 'Soumettre'}
        </button>
      </form>
    </>
  );
};

export default EmailForm;
