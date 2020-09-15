import { useState, useEffect, useRef } from 'react';
import Router from 'next/router';
import {
  CardElement,
  PaymentRequestButtonElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { destroyCookie } from 'nookies';
import Icon from '@mdi/react';
import { mdiLock } from '@mdi/js';

import { isoCountries } from 'data/countries';

import StripeCardElement from '@/App/StripeCardElement';
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

const CheckoutForm = ({ booking, paymentIntent }) => {
  const _isMounted = useRef(true);
  const stripe = useStripe();
  const elements = useElements();
  const [paymentRequest, setPaymentRequest] = useState(null);
  const countries = Object.entries(isoCountries()).sort((a, b) =>
    a[1] > b[1] ? 1 : b[1] > a[1] ? -1 : 0
  );
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    country: { value: 'FR', label: 'France' },
    acceptTerms: false,
    isValid: false,
    errors: {
      name: 'Vous devez renseigner votre nom.',
      email: 'Vous devez saisir une adresse email valide.',
      country: '',
      acceptTerms: 'Invalide',
    },
  });
  const [formWasSubmitted, setFormWasSubmitted] = useState(false);
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    return () => {
      _isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (stripe) {
      const pr = stripe.paymentRequest({
        country: 'CH', // country_code of Stripe Account
        currency: 'eur',
        total: {
          label: 'Booking Wintr Travel',
          amount: +booking.totalPrice * 100,
        },
        requestPayerName: true,
        requestPayerEmail: true,
        requestShipping: true,
        shippingOptions: [
          {
            id: 'free-shipping',
            label: 'Free shipping',
            detail: '',
            amount: 0,
          },
        ],
      });

      pr.canMakePayment()
        .then((result) => {
          if (result) {
            setPaymentRequest(pr);
          }
        })
        .catch((error) => console.log(error));
    }
  }, [stripe]);

  const handleChange = (event) => {
    let name;
    let value;

    if (event === undefined) {
      // Toggle acceptTerms with keyboard
      name = 'acceptTerms';
    } else if (event === null || event.value) {
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
        formErrors.name =
          value.trim() === '' ? 'Vous devez renseigner votre nom.' : '';
        break;
      case 'email':
        formErrors.email =
          value.trim() === '' || !EMAIL_PATTERN.test(value)
            ? 'Vous devez saisir une adresse email valide.'
            : '';
        break;
      case 'country':
        formErrors.country = !value ? '' : '';
        break;
      case 'acceptTerms':
        value = !formState.acceptTerms;
        formErrors.acceptTerms = !value ? 'Invalide' : '';
        break;
      default:
        break;
    }

    setFormState({
      ...formState,
      [name]: value,
      errors: { ...formState.errors, ...formErrors },
      isValid:
        !formErrors.name &&
        !formErrors.email &&
        !formErrors.country &&
        !formErrors.acceptTerms,
    });
  };

  // Handle one click payment
  if (paymentRequest) {
    paymentRequest.on('paymentmethod', async (ev) => {
      console.log('One click payment', ev);

      // This is necessary to work around a weird Stripe issue at the moment
      // https://github.com/stripe/stripe-payments-demo/issues/101
      const intent = paymentIntent;

      // Confirm the PaymentIntent without handling potential next actions (yet).
      const { error: confirmError } = await stripe.confirmCardPayment(
        paymentIntent.client_secret,
        { payment_method: ev.paymentMethod.id },
        { handleActions: false }
      );

      if (confirmError) {
        // Report to the browser that the payment failed, prompting it to
        // re-show the payment interface, or show an error message and close
        // the payment interface.
        console.log('confirm error', confirmError);
        ev.complete('fail');
      } else {
        // Report to the browser that the confirmation was successful, prompting
        // it to close the browser payment method collection interface.
        console.log('Successful one click payment');
        ev.complete('success');

        // Let Stripe.js handle the rest of the payment flow.
        const { error, paymentIntent } = await stripe.confirmCardPayment(
          intent.client_secret
        );

        if (error) {
          // The payment failed -- ask your customer for a new payment method.
          // Redirect to checkout and display an error message
          console.log('ERROR', error);
        } else {
          // The payment has succeeded.
          console.log('SUCCESS', paymentIntent);
          const updatedBooking = {
            ...booking,
            name: ev.payerName,
            email: ev.payerEmail,
            countryCode: ev.paymentMethod.billing_details.address.country,
            paymentIntentId: paymentIntent.id,
          };
          console.log('Booking to send to the API', updatedBooking);
          destroyCookie(null, 'paymentIntentId');
          Router.push('/booking/confirmation').then(() => {
            if (_isMounted.current) {
              setIsLoading(false);
            }
          });
        }
      }
    });
  }

  // Handle form submission.
  const handlePaymentSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setFormWasSubmitted(true);
    // Add checkout informations to booking data before sending it to the backend
    const updatedBooking = {
      ...booking,
      name: formState.name,
      email: formState.email,
      countryCode: formState.country.value,
      paymentIntentId: paymentIntent.id,
    };
    console.log('Booking to send to the API', updatedBooking);
    if (!formState.isValid) {
      setIsLoading(false);
      return;
    }
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
        Router.push('/booking/confirmation').then(() => {
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

  let paymentRequestButton = null;
  if (paymentRequest) {
    paymentRequestButton = (
      <PaymentRequestButtonElement
        options={{
          paymentRequest,
          style: {
            paymentRequestButton: { height: '48px' },
          },
        }}
      />
    );
  }

  return (
    <Card>
      <Header>
        <Heading className="text-xl sm:text-3xl">
          <Icon path={mdiLock} size={1} color="#424242" />
          <span className="ml-1">Paiement Sécurisé</span>
        </Heading>
        <div className="flex items-center h-8">
          <img src="/images/powered_by_stripe.svg" alt="Powered By Stripe" />
          <img src="/images/visa.svg" alt="Visa Logo" className="ml-1" />
          <img
            src="/images/mastercard.svg"
            alt="Mastercard Logo"
            className="ml-1"
          />
          <img
            src="/images/amex.svg"
            alt="American Express Logo"
            className="ml-1"
          />
        </div>
      </Header>
      <Separator className="my-6" />
      {paymentRequestButton ? (
        <>
          {paymentRequestButton}
          <Separator label="Ou" className="my-10" />
        </>
      ) : null}
      <form className="flex flex-col max-w-md mx-auto">
        <FormRow>
          <Label title="Nom" for="name" />
          <Input
            type="text"
            id="name"
            name="name"
            onChange={handleChange}
            className={`w-full ${
              formState.errors.name && formWasSubmitted
                ? 'border-red-600 bg-red-100'
                : ''
            }`}
          />
          <div className="error text-red-600 pt-1 pl-1" role="alert">
            {formWasSubmitted && formState.errors.name}
          </div>
        </FormRow>
        <FormRow>
          <Label title="Email" for="email" />
          <Input
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            className={`w-full ${
              formState.errors.name && formWasSubmitted
                ? 'border-red-600 bg-red-100'
                : ''
            }`}
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
            label="Pays"
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
          <Label title="Données de votre carte" for="card-element" />
          <StripeCardElement CardElement={CardElement} />
        </FormRow>
        <FormRow>
          <Checkbox
            name="acceptTerms"
            value={formState.acceptTerms}
            onChange={handleChange}
            error={formWasSubmitted && !!formState.errors.acceptTerms}
          >
            J'accepte les Conditions Générales de Vente.
          </Checkbox>
        </FormRow>
        <Button
          type="submit"
          name="pay"
          onClick={handlePaymentSubmit}
          disabled={loading}
          classes="my-4 w-full uppercase tracking-wide bg-secondary-blue text-white"
        >
          {loading ? <Loader /> : `Payer ${booking.totalPrice.toFixed(2)} €`}
        </Button>
      </form>
    </Card>
  );
};

export default CheckoutForm;
