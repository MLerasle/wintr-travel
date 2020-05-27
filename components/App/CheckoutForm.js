import { useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { CardElement } from '@stripe/react-stripe-js';

import { isoCountries } from 'data/countries';

import Card from '@/UI/Card';
import Header from '@/UI/Header';
import Heading from '@/UI/Heading';
import Button from '@/UI/Button';
import FormRow from '@/UI/FormRow';
import Label from '@/UI/Label';
import Input from '@/UI/Input';
import Checkbox from '@/UI/Checkbox';
import SelectInput from '@/UI/SelectInput';
import Separator from '@/UI/Separator';

const CARD_ELEMENT_OPTIONS = {
  classes: {
    base:
      'border border-gray-300 rounded-lg px-2 py-3 h-12 w-full appearance-none',
    focus: 'outline-none border-secondary-blue',
  },
  style: {
    base: {
      color: '#2D3748',
      fontFamily: 'system-ui, sans-serif',
      fontSize: '16px',
      '::placeholder': {
        color: '#A0AEC0',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};

const CheckoutForm = ({ booking }) => {
  const { t, lang } = useTranslation();
  const countries = Object.entries(isoCountries(lang)).sort((a, b) =>
    a[1] > b[1] ? 1 : b[1] > a[1] ? -1 : 0
  );
  const [error, setError] = useState(null);
  const [acceptTerms, setAcceptTerms] = useState(false);

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

  const handleAcceptTerms = (event) => {
    setAcceptTerms(!acceptTerms);
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
      {`${t('common:button.pay')} ${booking.totalAmount} €`}
    </Button>
  );

  return (
    <>
      <Card>
        <Header>
          <Heading className="text-xl sm:text-3xl">
            {t('checkout:title')}
          </Heading>
        </Header>
        <Separator className="my-6" />
        <form className="flex flex-col mb-4" onSubmit={handleSubmit}>
          <FormRow>
            <Label title={t('common:form.nameLabel')} for="name" />
            <Input type="text" id="name" name="name" />
          </FormRow>
          <FormRow>
            <Label title={t('common:form.emailLabel')} for="email" />
            <Input type="email" id="email" name="email" />
          </FormRow>
          <FormRow>
            <SelectInput
              options={countries.map((c) => {
                return { value: c[0], label: c[1] };
              })}
              label={t('common:form.countryLabel')}
              placeholder={t('common:form.countryPlaceholder')}
              defaultValue={{ label: 'France', value: 'France' }}
              handleChange={handleCountryChange}
            />
          </FormRow>
          <FormRow>
            <Label title={t('checkout:creditCardLabel')} for="card-element" />
            <CardElement
              id="card-element"
              onChange={handleChange}
              options={CARD_ELEMENT_OPTIONS}
            />
            <div className="card-errors" role="alert">
              {error}
            </div>
          </FormRow>
          <FormRow>
            <Checkbox
              name="acceptTerms"
              value={acceptTerms}
              onChange={handleAcceptTerms}
            >
              {t('checkout:acceptTerms')}
            </Checkbox>
          </FormRow>
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
