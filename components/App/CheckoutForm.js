import { useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { CardElement } from '@stripe/react-stripe-js';

import { countries } from 'data/countries';

import Card from '@/UI/Card';
import Header from '@/UI/Header';
import Button from '@/UI/Button';
import Label from '@/UI/Label';
import SelectInput from '@/UI/SelectInput';

const CARD_ELEMENT_OPTIONS = {
  classes: {
    base:
      'border border-gray-300 rounded-lg px-2 py-3 h-12 w-full appearance-none',
    focus: 'outline-none border-secondary-blue',
  },
  style: {
    base: {
      color: '#2D3748',
      // fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#A0AEC0',
        fontWeight: '500',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};

const CheckoutForm = () => {
  const { t } = useTranslation();
  const [error, setError] = useState(null);

  // Handle real-time validation errors from the card Element.
  const handleChange = (event) => {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
  };

  const handleCountryChange = (event) => {
    console.log('Country select changed', event);
  };

  // Handle form submission.
  const handleSubmit = async (event) => {
    event.preventDefault();
    // SEND REQUEST TO PAYMENT INTENT API INSTEAD
    console.log('Submit checkout form');
    // const card = elements.getElement(CardElement);
    // const result = await stripe.createToken(card);
    // if (result.error) {
    //   // Inform the user if there was an error.
    //   setError(result.error.message);
    // } else {
    //   setError(null);
    //   // Send the token to your server.
    //   stripeTokenHandler(result.token);
    // }
  };

  // async function stripeTokenHandler(token) {
  //   const response = await fetch('/charge', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ token: token.id }),
  //   });
  //   return response.json();
  // }

  const payButton = (
    <Button name={t('common:button.pay')} onClick={handleSubmit}>
      {t('common:button.pay')}
    </Button>
  );

  return (
    <>
      <Card>
        <header className="flex justify-between items-baseline">
          <Header className="text-xl sm:text-3xl">{t('checkout:title')}</Header>
        </header>
        <form
          className="flex flex-col mt-6 pt-6 border-t border-gray-300 mb-8"
          onSubmit={handleSubmit}
        >
          <div className="form-row">
            <Label title={t('common:form.nameLabel')} for="name" />
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Chandler Bing"
              className="border border-gray-300 rounded-lg px-2 py-2 h-12 focus:outline-none focus:border-secondary-blue w-full text-gray-800 appearance-none"
            />
          </div>
          <div className="form-row mt-4 mt-4">
            <Label title={t('common:form.emailLabel')} for="email" />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="chandler@bing.com"
              className="border border-gray-300 rounded-lg px-2 py-2 h-12 focus:outline-none focus:border-secondary-blue w-full text-gray-800 appearance-none"
            />
          </div>
          <div className="form-row mt-4">
            <SelectInput
              options={countries.map((c) => {
                return { value: c, label: c };
              })}
              label={t('common:form.countryLabel')}
              placeholder={t('common:form.countryPlaceholder')}
              defaultValue={{ label: 'France', value: 'France' }}
              handleChange={handleCountryChange}
            />
          </div>
          <div className="form-row mt-4">
            <Label title={t('checkout:creditCardLabel')} for="card-element" />
            <CardElement
              id="card-element"
              onChange={handleChange}
              options={CARD_ELEMENT_OPTIONS}
            />
            <div className="card-errors" role="alert">
              {error}
            </div>
          </div>
        </form>
        <section className={`hidden md:block`}>{payButton}</section>
      </Card>
      <div className="fixed bottom-0 w-full p-4 border-t border-gray-300 z-10 bg-white md:hidden">
        {payButton}
      </div>
    </>
  );
};

export default CheckoutForm;
