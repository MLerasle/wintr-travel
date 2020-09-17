import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import Router from 'next/router';
import {
  CardElement,
  PaymentRequestButtonElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { destroyCookie } from 'nookies';

import { isoCountries } from 'data/countries';

import StripeCardElement from '@/App/StripeCardElement';
import Heading from '@/UI/Heading';
import Button from '@/UI/Button';
import FormRow from '@/UI/FormRow';
import Label from '@/UI/Label';
import Input from '@/UI/Input';
import Checkbox from '@/UI/Checkbox';
import SelectInput from '@/UI/SelectInput';
import Separator from '@/UI/Separator';
import Loader from '@/UI/Loader';

const CheckoutForm = ({ booking, paymentIntent }) => {
  const _isMounted = useRef(true);
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const [paymentRequest, setPaymentRequest] = useState(null);
  const countries = Object.entries(isoCountries()).sort((a, b) =>
    a[1] > b[1] ? 1 : b[1] > a[1] ? -1 : 0
  );
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [formWasSubmitted, setFormWasSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({
    name: 'Vous devez renseigner votre nom.',
    country: '',
    acceptTerms: 'Invalide',
  });
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

  const onNameUpdate = (event) => {
    const updatedName = event.target.value;
    dispatch({ type: 'SET_NAME', name: updatedName });
    setFormErrors({
      ...formErrors,
      name: updatedName.trim() === '' ? 'Vous devez renseigner votre nom.' : '',
    });
    updateFormValidity();
  };

  const onCountryCodeUpdate = (event) => {
    const updatedCountry = event ? event.value : null;
    dispatch({ type: 'SET_COUNTRY_CODE', countryCode: updatedCountry });
    setFormErrors({
      ...formErrors,
      country: !updatedCountry
        ? 'Veuillez renseigner votre pays de résidence.'
        : '',
    });
    updateFormValidity();
  };

  const onDeliveryAddressUpdate = (event) => {
    dispatch({ type: 'SET_DELIVERY_ADDRESS', address: event.target.value });
    updateFormValidity();
  };

  const onToggleAcceptTerms = () => {
    setAcceptTerms(!acceptTerms);
    setFormErrors({
      ...formErrors,
      acceptTerms: !acceptTerms ? 'Invalide' : '',
    });
    updateFormValidity();
  };

  const updateFormValidity = () => {
    setFormIsValid(!!booking.name && !!booking.countryCode && acceptTerms);
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
    console.log('Booking to send to the API', booking);
    if (!formIsValid) {
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
        receipt_email: booking.email,
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
    <div className="lg:w-1/2 pt-6">
      {paymentRequestButton ? (
        <>
          {paymentRequestButton}
          <Separator label="Ou" className="my-10" />
        </>
      ) : null}
      <form className="flex flex-col max-w-md mx-auto lg:mx-0">
        <Heading className="text-xl mb-4">Informations Client</Heading>
        <FormRow>
          <Label title="Prénom et Nom" for="name" />
          <Input
            type="text"
            id="name"
            name="name"
            onChange={onNameUpdate}
            className={`w-full ${
              formErrors.name && formWasSubmitted
                ? 'border-red-600 bg-red-100'
                : ''
            }`}
          />
          <div className="error text-red-600 pt-1 pl-1" role="alert">
            {formWasSubmitted && formErrors.name}
          </div>
        </FormRow>
        <FormRow>
          <SelectInput
            options={countries.map((c) => {
              return { value: c[0], label: c[1] };
            })}
            label="Pays de résidence"
            placeholder=""
            defaultValue={{ value: 'FR', label: 'France' }}
            name="country"
            styles={
              formErrors.country && formWasSubmitted
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
            handleChange={onCountryCodeUpdate}
          />
          <div className="error text-red-600 pt-1 pl-1" role="alert">
            {formWasSubmitted && formErrors.country}
          </div>
        </FormRow>
        <Heading className="text-xl my-4">Addresse de Livraison</Heading>
        <FormRow>
          <Label title="Où devons-nous vous livrer?" for="deliveryAddress" />
          <Input
            type="text"
            id="deliveryAddress"
            name="deliveryAddress"
            className="w-full"
            placeholder="Saisissez l'adresse complète ici"
            onChange={onDeliveryAddressUpdate}
            value={booking.deliveryAddress}
          />
          <p className="text-orange-600 text-sm md:text-base mt-2">
            Vous pouvez renseigner cette information ultérieurement.
          </p>
        </FormRow>
        <Heading className="text-xl my-4">Méthode de Règlement</Heading>
        <FormRow>
          <Label title="Données de votre carte" for="card-element" />
          <StripeCardElement CardElement={CardElement} />
        </FormRow>
        <FormRow>
          <Checkbox
            name="acceptTerms"
            value={acceptTerms}
            onChange={onToggleAcceptTerms}
            error={formWasSubmitted && !acceptTerms}
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
    </div>
  );
};

export default CheckoutForm;
