import { useState, useEffect } from 'react';
import Head from 'next/head';

import MainSection from '@/UI/MainSection';
import Card from '@/UI/Card';
import FormRow from '@/UI/FormRow';
// import Header from '@/UI/Header';
// import Heading from '@/UI/Heading';
// import Separator from '@/UI/Separator';
import Label from '@/UI/Label';
import Input from '@/UI/Input';
import Textarea from '@/UI/Textarea';
import Button from '@/UI/Button';
// import Alert from '@/UI/Alert';
import Loader from '@/UI/Loader';

import * as gtag from 'lib/gtag';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    gtag.pageView('Contact', '/contact');
  }, []);

  const submitContactForm = () => {
    console.log('Submit contact form ', name, email, message);
  };

  return (
    <>
      <Head>
        <title>Contact - Wintr Travel</title>
        <meta name="description" content="Contact Wintr Travel" />
      </Head>
      <MainSection>
        <header className="md:text-center px-4 md:px-10 py-6 md:py-16 bg-dark-blue">
          <h1 className="text-2xl md:text-4xl font-semibold md:font-bold pb-1 md:pb-3 leading-tight text-gray-100">
            Contactez-nous
          </h1>
          <p className="md:text-xl text-gray-300">
            Nous vous répondrons sous 48 heures.
          </p>
        </header>

        <Card
          classes="md:py-6 md:-mt-14"
          subclasses="p-4 md:p-8 md:max-w-2xl bg-gray-100"
        >
          <form className="md:mt-4">
            <FormRow className="w-full mt-4">
              <Label for="name">Votre nom</Label>
              <Input
                type="text"
                id="name"
                name="name"
                className={`my-0 w-full ${
                  error &&
                  error.type === 'empty_name' &&
                  'border-primary-red bg-light-red'
                }`}
                onChange={(event) => setName(event.target.value)}
                value={name}
              />
            </FormRow>
            <FormRow className="w-full mt-4">
              <Label for="email">Votre adresse email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                className={`my-0 w-full ${
                  error &&
                  error.type === 'invalid_email' &&
                  'border-primary-red bg-light-red'
                }`}
                onChange={(event) => setEmail(event.target.value)}
                value={email}
              />
            </FormRow>
            <FormRow className="w-full mt-4">
              <Label for="message">Votre message</Label>
              <Textarea
                id="message"
                name="message"
                rows="6"
                className={`my-0 w-full ${
                  error &&
                  error.type === 'empty_message' &&
                  'border-primary-red bg-light-red'
                }`}
                onChange={(event) => setMessage(event.target.value)}
                value={message}
              ></Textarea>
            </FormRow>
            <Button
              type="submit"
              id="submitButton"
              classes="w-full uppercase tracking-wide bg-primary-green text-white mt-2"
              name="validate"
              disabled={isLoading}
              onClick={submitContactForm}
            >
              {isLoading ? <Loader /> : 'Envoyer'}
            </Button>
          </form>
        </Card>
      </MainSection>
    </>
  );
};

export default Contact;
