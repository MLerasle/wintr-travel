import { useState } from 'react';

import Card from '@/UI/Card';
import FormRow from '@/UI/FormRow';
import Header from '@/UI/Header';
import Heading from '@/UI/Heading';
import Separator from '@/UI/Separator';
import Label from '@/UI/Label';
import Input from '@/UI/Input';
import Button from '@/UI/Button';
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
    <Card classes="md:py-6" subclasses="p-4 md:p-8 md:max-w-2xl bg-gray-100">
      {error && (
        <Alert
          type="error"
          message={error.message}
          onClearMessage={() => setError('')}
        />
      )}
      {isSubmitted && !error && (
        <Alert
          type="success"
          message={
            "Vous allez recevoir un email de confirmation d'ici quelques minutes.\n Veuillez cliquer sur le lien contenu dans cet email pour valider votre inscription."
          }
          onClearMessage={() => setIsSubmitted(false)}
        />
      )}
      <Header>
        <Heading className="hidden md:block text-xl sm:text-3xl">
          Vos skis livrés à Praz sur Arly pour une semaine.
        </Heading>
      </Header>
      <Separator className="my-6 hidden md:block" />
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
          réouverture de celui-ci:
        </p>
      </section>
      <form className="md:mt-4">
        <FormRow className="w-full mt-4">
          <Label for="email-address">Votre adresse email</Label>
          <Input
            type="email"
            id="email-address"
            name="email-address"
            className={`my-0 w-full ${
              error &&
              error.type === 'invalid_email' &&
              'border-primary-red bg-light-red'
            }`}
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
          />
        </FormRow>
        <Button
          type="submit"
          id="submitButton"
          classes="w-full uppercase tracking-wide bg-primary-green text-white mt-2"
          name="validate"
          disabled={isLoading}
          onClick={submitEmailForm}
        >
          {isLoading ? <Loader /> : 'Soumettre'}
        </Button>
      </form>
    </Card>
  );
};

export default EmailForm;
