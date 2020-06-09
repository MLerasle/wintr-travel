import { useState, useEffect, useRef } from 'react';
import Router from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { destroyCookie } from 'nookies';

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
import Loader from '@/UI/Loader';

const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const CARD_ELEMENT_OPTIONS = {
  classes: {
    base:
      'border border-gray-300 rounded-lg px-2 py-3 h-12 w-full appearance-none',
    focus: 'outline-none border-secondary-blue',
    invalid:
      'border border-red-600 bg-red-100 rounded-lg px-2 py-3 h-12 w-full appearance-none',
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
      color: '#E53E3E',
      iconColor: '#E53E3E',
    },
  },
  hidePostalCode: true,
};

const CheckoutForm = ({ booking, paymentIntent }) => {
  const _isMounted = useRef(true);
  const { t, lang } = useTranslation();
  const stripe = useStripe();
  const elements = useElements();
  const countries = Object.entries(isoCountries(lang)).sort((a, b) =>
    a[1] > b[1] ? 1 : b[1] > a[1] ? -1 : 0
  );
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    country: { value: 'FR', label: 'France' },
    acceptTerms: false,
    errors: {
      name: 'Your name is required',
      email: 'Your email is required and must be valid',
      country: '',
      acceptTerms: 'Invalid',
    },
  });
  const [formWasSubmitted, setFormWasSubmitted] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    return () => {
      _isMounted.current = false;
    };
  }, []);

  const handleChange = (event) => {
    let name;
    let value;

    if (event === null || event.value) {
      // Handle country react-select field
      name = 'country';
      value = event;
    } else {
      name = event.target.name;
      value = event.target.value;
    }

    let formErrors = formState.errors;

    switch (name) {
      case 'name':
        formErrors.name = value.trim() === '' ? 'Your name is required' : '';
        break;
      case 'email':
        formErrors.email =
          formState.email.trim() === '' || !EMAIL_PATTERN.test(formState.email)
            ? 'Your email is required and must be valid'
            : '';
        break;
      case 'country':
        formErrors.country = !value ? 'Country is required' : '';
        break;
      case 'acceptTerms':
        value = !formState.acceptTerms;
        formErrors.acceptTerms = !value ? 'Invalid' : '';
        break;
      default:
        break;
    }

    setFormState({
      ...formState,
      [name]: value,
      errors: { ...formState.errors, ...formErrors },
    });
  };

  // Handle real-time validation errors from the card Element.
  const handleCardChange = (event) => {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
  };

  // Handle form submission.
  const handlePaymentSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setFormWasSubmitted(true);

    // Add checkout informations to booking data before sending it to the backend
    const updatedBooking = {
      ...booking,
      ...formState.name,
      ...formState.email,
      ...formState.country,
      ...formState.acceptTerms,
      paymentIntentId: paymentIntent.id,
    };

    console.log(updatedBooking);

    try {
      const {
        error,
        paymentIntent: { status },
      } = await stripe.confirmCardPayment(paymentIntent.client_secret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
        receipt_email: formState.email,
      });

      if (error) throw new Error(error.message);

      if (status === 'succeeded') {
        destroyCookie(null, 'paymentIntentId');
        // Cookie should also be destroyed when tab is closed (if we store booking in sessionStorage)

        // Send booking infos to the backend
        // fetch('https://wintr.travel/booking', {
        //   method: 'post',
        //   body: JSON.stringify(updatedBooking),
        // })
        //   .then((response) => {
        //     // We succesfully saved the booking on the backend
        //     // Redirect
        //     console.log(response);
        //   })
        //   .catch((error) => {
        //     // The booking is paid but we failed saving it on the backend
        //     // See how to handle this...
        //     console.log(error);
        //   });
        Router.push(`/${lang}/confirmation`).then(() => {
          if (_isMounted.current) {
            setIsLoading(false);
          }
        });
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  return (
    <>
      <Card>
        <Header>
          <Heading className="text-xl sm:text-3xl">
            {t('checkout:title')}
          </Heading>
        </Header>
        <Separator className="my-6" />
        <form className="flex flex-col">
          <FormRow>
            <Label title={t('common:form.nameLabel')} for="name" />
            <Input
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
              className={
                formState.errors.name && formWasSubmitted
                  ? 'border-red-600 bg-red-100'
                  : ''
              }
            />
            <div className="error text-red-600 pt-1 pl-1" role="alert">
              {formWasSubmitted && formState.errors.name}
            </div>
          </FormRow>
          <FormRow>
            <Label title={t('common:form.emailLabel')} for="email" />
            <Input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              className={
                formState.errors.email && formWasSubmitted
                  ? 'border-red-600 bg-red-100'
                  : ''
              }
            />
            <div className="error text-red-600 pt-1 pl-1" role="alert">
              {formWasSubmitted && formState.errors.email}
            </div>
          </FormRow>
          <FormRow>
            <SelectInput
              options={countries.map((c) => {
                return { value: c[0], label: c[1] };
              })}
              label={t('common:form.countryLabel')}
              placeholder=""
              defaultValue={formState.country}
              name="country"
              styles={
                formState.errors.country && formWasSubmitted
                  ? {
                      control: (base) => ({
                        ...base,
                        '&:hover': { borderColor: 'none' },
                        boxShadow: 'none',
                        height: '48px',
                        borderColor: '#E53E3E',
                        backgroundColor: '#FFF5F5',
                      }),
                    }
                  : null
              }
              handleChange={handleChange}
            />
            <div className="error text-red-600 pt-1 pl-1" role="alert">
              {formWasSubmitted && formState.errors.country}
            </div>
          </FormRow>
          <FormRow>
            <Label title={t('checkout:creditCardLabel')} for="card-element" />
            <CardElement
              id="card-element"
              options={CARD_ELEMENT_OPTIONS}
              onChange={handleCardChange}
            />
            <div
              className="card-errors text-red-600 pt-1 pl-1 font-sans"
              role="alert"
            >
              {error}
            </div>
          </FormRow>
          <FormRow>
            <Checkbox
              name="acceptTerms"
              value={formState.acceptTerms}
              onChange={handleChange}
              error={formWasSubmitted && !!formState.errors.acceptTerms}
            >
              {t('checkout:acceptTerms')}
            </Checkbox>
          </FormRow>
          <section className="fixed bottom-0 w-full p-4 border-t border-gray-300 z-10 bg-white -mx-4 md:static md:m-0 md:p-0 md:border-none md:mt-6">
            <Button
              type="submit"
              name={t('common:button.pay')}
              onClick={handlePaymentSubmit}
              disabled={loading}
            >
              {loading ? (
                <Loader />
              ) : (
                `${t('common:button.pay')} ${booking.totalAmount.toFixed(2)} €`
              )}
            </Button>
          </section>
        </form>
      </Card>
    </>
  );
};

export default CheckoutForm;
