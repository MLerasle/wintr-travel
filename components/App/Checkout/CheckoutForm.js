import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import {
  CardElement,
  PaymentRequestButtonElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { destroyCookie } from 'nookies';

import BookingDeliveryAddress from '@/App/Checkout/BookingFormDeliveryAddress';
import StripeCardElement from '@/App/Checkout/StripeCardElement';
import Heading from '@/UI/Heading';
import Button from '@/UI/Button';
import FormRow from '@/UI/FormRow';
import Label from '@/UI/Label';
import Input from '@/UI/Input';
import Checkbox from '@/UI/Checkbox';
import SelectInput from '@/UI/SelectInput';
import Separator from '@/UI/Separator';
import Loader from '@/UI/Loader';
import ErrorAlert from '@/UI/ErrorAlert';

import * as gtag from 'lib/gtag';
import { setName, setCountryCode, setDeliveryAddress } from 'store/actions';
import { getLastDay, getPrices } from 'helpers/booking';
import { isoCountries } from 'data/countries';

const CheckoutForm = ({ intent }) => {
  const _isMounted = useRef(true);
  const stripe = useStripe();
  const elements = useElements();
  const booking = useSelector((state) => state);
  const dispatch = useDispatch();
  const [paymentRequest, setPaymentRequest] = useState(null);
  const countries = Object.entries(isoCountries()).sort((a, b) =>
    a[1] > b[1] ? 1 : b[1] > a[1] ? -1 : 0
  );
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [formWasSubmitted, setFormWasSubmitted] = useState(false);
  const [paymentError, setPaymentError] = useState();
  const [formErrors, setFormErrors] = useState({
    name: 'Vous devez renseigner votre nom.',
    country: '',
    acceptTerms: 'Invalide',
  });
  const [loading, setIsLoading] = useState(false);
  const prices = getPrices(booking.adults.length, booking.children.length);

  useEffect(() => {
    return () => {
      _isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (stripe) {
      const pr = stripe.paymentRequest({
        country: process.env.NODE_ENV === 'production' ? 'FR' : 'CH', // country_code of Stripe Account
        currency: 'eur',
        total: {
          label: 'Réservation Wintr Travel',
          amount: +prices.total * 100,
        },
        requestPayerName: true,
        requestPayerEmail: false,
        requestShipping: false,
        shippingOptions: [
          {
            id: 'free-shipping',
            label: 'Livraison gratuite',
            detail: '',
            amount: 0,
          },
        ],
      });

      // Check the availability of the Payment Request API.
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
    dispatch(setName(updatedName));
    setFormErrors({
      ...formErrors,
      name: updatedName.trim() === '' ? 'Vous devez renseigner votre nom.' : '',
    });
    setFormIsValid(updatedName && !!booking.countryCode && acceptTerms);
  };

  const onCountryCodeUpdate = (event) => {
    const updatedCountry = event ? event.value : null;
    dispatch(setCountryCode(updatedCountry));
    setFormErrors({
      ...formErrors,
      country: !updatedCountry
        ? 'Veuillez renseigner votre pays de résidence.'
        : '',
    });
    setFormIsValid(!!booking.name && updatedCountry && acceptTerms);
  };

  const onDeliveryAddressUpdate = (address, placeId) => {
    dispatch(setDeliveryAddress(address, placeId));
  };

  const onToggleAcceptTerms = () => {
    setAcceptTerms(!acceptTerms);
    setFormErrors({
      ...formErrors,
      acceptTerms: !acceptTerms ? 'Invalide' : '',
    });
    setFormIsValid(!!booking.name && !!booking.countryCode && !acceptTerms);
  };

  const handlePaymentSucces = async (updatedBooking, paymentMethod) => {
    // Send booking infos to the backend
    const response = await fetch('/api/booking/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedBooking),
    });
    const publishedBooking = await response.json();
    console.log(publishedBooking);

    destroyCookie(null, 'paymentIntentId');

    gtag.event({
      action: 'pay_booking',
      category: 'Booking',
      label: paymentMethod,
    });

    Router.push('/booking/confirmation').then(() => {
      if (_isMounted.current) {
        setIsLoading(false);
      }
    });
  };

  // Handle one click payment
  if (paymentRequest) {
    paymentRequest.on('paymentmethod', async (ev) => {
      console.log('One click payment', ev);

      // This is necessary to work around a weird Stripe issue at the moment
      // https://github.com/stripe/stripe-payments-demo/issues/101
      const pintent = intent;

      // Confirm the PaymentIntent without handling potential next actions (yet).
      const {
        paymentIntent,
        error: confirmError,
      } = await stripe.confirmCardPayment(
        intent.client_secret,
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
        const updatedBooking = {
          ...booking,
          name: ev.payerName,
          countryCode: ev.paymentMethod.billing_details.address.country,
          paymentIntentId: paymentIntent.id,
        };

        if (paymentIntent.status === 'requires_action') {
          // Let Stripe.js handle the rest of the payment flow.
          const { error } = await stripe.confirmCardPayment(
            pintent.client_secret
          );
          if (error) {
            // The payment failed -- ask your customer for a new payment method.
            // Redirect to checkout and display an error message
            console.log('ERROR', error);
          } else {
            // The payment has succeeded.
            console.log('SUCCESS', paymentIntent);
            await handlePaymentSucces(updatedBooking, 'oneClick');
          }
        } else {
          // The payment has succeeded.
          await handlePaymentSucces(updatedBooking, 'oneClick');
        }
      }
    });
  }

  // Handle form submission.
  const handlePaymentSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setFormWasSubmitted(true);

    if (!formIsValid) {
      gtag.event({
        action: 'pay_booking',
        category: 'Booking',
        label: 'Form is not valid',
      });
      setIsLoading(false);
      return;
    }

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        intent.client_secret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: booking.name,
              email: booking.email,
              address: {
                country: booking.countryCode,
              },
            },
          },
          receipt_email: booking.email,
        }
      );

      if (error) {
        throw new Error(error.message);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        const updatedBooking = {
          ...booking,
          lastDay: getLastDay(booking.firstDay),
          paymentIntentId: intent.id,
        };
        await handlePaymentSucces(updatedBooking, 'creditCard');
      }
    } catch (err) {
      gtag.event({
        action: 'pay_booking',
        category: 'Booking',
        label: 'Error while paying booking',
      });
      setPaymentError(err.message);
      setIsLoading(false);
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
    <div className="xl:w-1/2 pt-6 max-w-md lg:max-w-lg xl:max-w-md mx-auto xl:mx-0">
      {paymentError && (
        <ErrorAlert
          error={paymentError}
          onClearError={() => setPaymentError(null)}
        />
      )}
      {paymentRequestButton ? (
        <>
          {paymentRequestButton}
          <Separator label="Ou" className="my-10" />
        </>
      ) : null}
      <form className="flex flex-col max-w-md lg:max-w-lg xl:max-w-md mx-auto xl:mx-0">
        <Heading className="text-xl mb-4">Informations Client</Heading>
        <FormRow>
          <Label for="name">Prénom et Nom</Label>
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
          <BookingDeliveryAddress
            booking={booking}
            onDeliveryAddressUpdate={onDeliveryAddressUpdate}
          />
        </FormRow>
        <Heading className="text-xl my-4">Méthode de Règlement</Heading>
        <FormRow>
          <Label for="card-element">Données de votre carte</Label>
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
          {loading ? <Loader /> : `Payer ${prices.total.toFixed(2)} €`}
        </Button>
      </form>
    </div>
  );
};

export default CheckoutForm;