import { useState } from 'react';

import Card from '@/UI/Card';
import FormRow from '@/UI/FormRow';
import Header from '@/UI/Header';
import Heading from '@/UI/Heading';
import Separator from '@/UI/Separator';
import Label from '@/UI/Label';
import Input from '@/UI/Input';
import Button from '@/UI/Button';

const EmailForm = () => {
  const [email, setEmail] = useState('');

  const submitEmailForm = (e) => {
    e.preventDefault();
    console.log('submit', { email });
  };

  return (
    <Card classes="md:py-6" subclasses="p-4 md:p-8 md:max-w-2xl bg-white">
      <Header>
        <Heading className="hidden md:block text-xl sm:text-3xl">
          Vos skis livrés à Flaine pour une semaine.
        </Heading>
      </Header>
      <Separator className="my-6 hidden md:block" />
      <section className="text-gray-700 text-lg">
        <p>
          En raison de la situation liée à la pandémie de Covid-19,{' '}
          <span className="font-semibold">
            notre sytème de réservation est momentanément fermé
          </span>
          .
        </p>
        <p className="mt-4">
          <span className="font-semibold">Les places étant limitées</span>, vous
          pouvez renseigner votre email ci-dessous pour être informé dès la
          réouverture de celui-ci:
        </p>
      </section>
      <form className="md:mt-4">
        <FormRow className="w-full mt-4">
          <Label for="name">Votre adresse email</Label>
          <Input
            type="email"
            id="email-address"
            name="email-address"
            className={`my-0 w-full`}
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
          />
        </FormRow>
        <Button
          type="submit"
          id="submitButton"
          classes="w-full uppercase tracking-wide bg-primary-green text-white"
          name="validate"
          onClick={submitEmailForm}
        >
          Soumettre
        </Button>
      </form>
    </Card>
  );
};

export default EmailForm;
