import { useState } from 'react';
import { useForm } from 'react-hook-form';

import FormRow from '@/UI/FormRow';
import Button from '@/UI/Button';
import Alert from '@/UI/Alert';
import Loader from '@/UI/Loader';

import { EMAIL_PATTERN } from 'helpers/email';

const ContactForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const submitContactForm = async (data, e) => {
    const { firstname, lastname, email, message } = data;
    const name = `${firstname} ${lastname}`;
    setIsLoading(true);
    setError('');

    const response = await fetch('/api/submitContactForm', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    });

    if (response.status === 200) {
      e.target.reset();
    } else {
      setError({
        message: 'Une erreur est survenue. Veuillez réessayer ultérieurement.',
      });
    }

    setIsSubmitted(true);
    setIsLoading(false);
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
            message={
              "Nous avons bien reçu votre message. Nous reviendrons vers vous d'ici 48 heures."
            }
            onClearMessage={() => setIsSubmitted(false)}
          />
        </div>
      )}
      <form
        className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
        onSubmit={handleSubmit(submitContactForm)}
      >
        <FormRow>
          <label className="label" htmlFor="firstname">
            Prénom
          </label>
          <input
            type="text"
            id="firstname"
            {...register('firstname', { required: true })}
            className={`input my-0 w-full ${errors.firstname && 'input-error'}`}
          />
          {errors.name && (
            <p className="input-error-message">
              Merci de renseigner votre prénom.
            </p>
          )}
        </FormRow>
        <FormRow>
          <label className="label" htmlFor="lastname">
            Nom
          </label>
          <input
            type="text"
            id="lastname"
            {...register('lastname', { required: true })}
            className={`input my-0 w-full ${errors.lastname && 'input-error'}`}
          />
          {errors.name && (
            <p className="input-error-message">
              Merci de renseigner votre nom.
            </p>
          )}
        </FormRow>
        <FormRow className="sm:col-span-2">
          <label className="label" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register('email', {
              required: true,
              pattern: EMAIL_PATTERN,
            })}
            className={`input my-0 w-full ${errors.email && 'input-error'}`}
          />
          {errors.email && (
            <p className="input-error-message">L'email saisi est invalide.</p>
          )}
        </FormRow>
        <FormRow className="sm:col-span-2">
          <label className="label" htmlFor="message">
            Votre message
          </label>
          <textarea
            id="message"
            {...register('message', { required: true })}
            rows="6"
            className={`input h-auto my-0 w-full ${
              errors.message && 'input-error'
            }`}
          ></textarea>
          {errors.email && (
            <p className="input-error-message">
              Vous devez renseigner la nature de votre demande!
            </p>
          )}
        </FormRow>
        <div className="sm:col-span-2 sm:flex sm:justify-end">
          <Button
            type="submit"
            id="submitButton"
            classes="mt-2 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 focus:outline-none sm:w-44"
            name="validate"
            disabled={isLoading}
          >
            {isLoading ? <Loader /> : 'Envoyer'}
          </Button>
        </div>
      </form>
    </>
  );
};

export default ContactForm;
