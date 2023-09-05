import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  CardElement,
  PaymentRequestButtonElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { destroyCookie } from 'nookies';

import BookingDeliveryAddress from '@/App/Booking/BookingFormDeliveryAddress';
import StripeCardElement from '@/App/Checkout/StripeCardElement';
import FormRow from '@/UI/FormRow';
import SelectInput from '@/UI/SelectInput';
import Divider from '@/UI/Divider';
import Loader from '@/UI/Loader';
import Alert from '@/UI/Alert';
import Toggle from '@/UI/Toggle';

import { getLastDay, getPrices } from 'helpers/booking';
import { twoDaysBefore } from 'helpers/dates';
import { countries } from 'data/countries';

const headers = { 'Content-Type': 'application/json' };

const CheckoutForm = ({ booking, intent }) => {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [paymentRequest, setPaymentRequest] = useState(null);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [formWasSubmitted, setFormWasSubmitted] = useState(false);
  const [paymentError, setPaymentError] = useState();
  const [formErrors, setFormErrors] = useState({
    firstname: 'Vous devez renseigner votre prénom.',
    lastname: 'Vous devez renseigner votre nom.',
    country: '',
    acceptTerms: 'Invalide',
  });
  const [loading, setIsLoading] = useState(false);
  const prices = getPrices(booking.adults.length, booking.children.length);

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
  }, [stripe, prices.total]);

  const onFirstNameUpdate = (event) => {
    const updatedFirstName = event.target.value;
    booking.update({ firstname: updatedFirstName });
    setFormErrors({
      ...formErrors,
      firstname:
        updatedFirstName.trim() === ''
          ? 'Vous devez renseigner votre prénom.'
          : '',
    });
    setFormIsValid(
      updatedFirstName &&
        !!booking.lastname &&
        !!booking.countryCode &&
        acceptTerms
    );
  };

  const onLastNameUpdate = (event) => {
    const updatedLastName = event.target.value;
    booking.update({ lastname: updatedLastName });
    setFormErrors({
      ...formErrors,
      lastname:
        updatedLastName.trim() === '' ? 'Vous devez renseigner votre nom.' : '',
    });
    setFormIsValid(
      !!booking.firstname &&
        updatedLastName &&
        !!booking.countryCode &&
        acceptTerms
    );
  };

  const onCountryCodeUpdate = (event) => {
    const updatedCountry = event ? event.value : null;
    booking.update({ countryCode: updatedCountry });
    setFormErrors({
      ...formErrors,
      country: !updatedCountry
        ? 'Veuillez renseigner votre pays de résidence.'
        : '',
    });
    setFormIsValid(
      !!booking.firstname && !!booking.lastname && updatedCountry && acceptTerms
    );
  };

  const onDeliveryAddressUpdate = (address, placeId) => {
    booking.update({
      deliveryAddress: address,
      placeId: placeId,
    });
  };

  const onToggleAcceptTerms = () => {
    setAcceptTerms(!acceptTerms);
    setFormErrors({
      ...formErrors,
      acceptTerms: !acceptTerms ? 'Invalide' : '',
    });
    setFormIsValid(
      !!booking.firstname &&
        !!booking.lastname &&
        !!booking.countryCode &&
        !acceptTerms
    );
  };

  const handlePaymentSucces = async (updatedBooking, paymentMethod) => {
    destroyCookie(null, 'paymentIntentId');

    router
      .push({
        pathname: '/booking/confirmation',
        query: { pid: updatedBooking.paymentIntentId },
      })
      .then(() => {
        setIsLoading(false);
        booking.clear();
      });
  };

  // Handle one click payment
  if (paymentRequest) {
    paymentRequest.on('paymentmethod', async (ev) => {
      console.log('One click payment', ev);

      // Send booking infos to the backend
      const updatedBooking = {
        ...booking,
        name: ev.payerName,
        countryCode: ev.paymentMethod.billing_details.address.country,
        lastDay: getLastDay(booking.firstDay),
        paymentIntentId: intent.id,
      };

      await fetch('/api/booking', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          ...updatedBooking,
          state: 'validated',
        }),
      });

      // This is necessary to work around a weird Stripe issue at the moment
      // https://github.com/stripe/stripe-payments-demo/issues/101
      const pintent = intent;

      // Confirm the PaymentIntent without handling potential next actions (yet).
      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(
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
      setIsLoading(false);
      return;
    }

    const updatedBooking = {
      ...booking,
      lastDay: getLastDay(booking.firstDay),
      paymentIntentId: intent.id,
    };

    await fetch('/api/booking', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        ...updatedBooking,
        state: 'validated',
      }),
    });

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      intent.client_secret,
      {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: `${booking.firstname} ${booking.lastname}`,
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
      setPaymentError(error.message);
      setIsLoading(false);
      window.scrollTo(0, 0);
      throw new Error(error.message);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      await handlePaymentSucces(updatedBooking, 'creditCard');
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
    <div className="pt-6">
      {paymentError && (
        <div className="pb-6">
          <Alert
            type="error"
            message={paymentError}
            onClearMessage={() => setPaymentError(null)}
          />
        </div>
      )}
      {paymentRequestButton ? (
        <>
          {paymentRequestButton}
          <Divider label="Ou" className="py-10" />
        </>
      ) : null}
      <form className="flex flex-col">
        <h3 className="text-lg leading-6 font-semibold text-gray-800 mb-2">
          Informations Client
        </h3>
        <FormRow>
          <label className="label" htmlFor="firstname">
            Prénom
          </label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            onChange={onFirstNameUpdate}
            className={`input w-full ${
              formErrors.firstname && formWasSubmitted && 'input-error'
            }`}
          />
          <div className="input-error-message" role="alert">
            {formWasSubmitted && formErrors.firstname}
          </div>
        </FormRow>
        <FormRow>
          <label className="label" htmlFor="firstname">
            Nom
          </label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            onChange={onLastNameUpdate}
            className={`input w-full ${
              formErrors.lastname && formWasSubmitted && 'input-error'
            }`}
          />
          <div className="input-error-message" role="alert">
            {formWasSubmitted && formErrors.lastname}
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
                      borderColor: '#CA463F',
                      backgroundColor: '#FBF0EF',
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
        <FormRow className="mt-4">
          <BookingDeliveryAddress
            booking={booking}
            onDeliveryAddressUpdate={onDeliveryAddressUpdate}
          />
        </FormRow>
        <h3 className="text-lg leading-6 font-semibold text-gray-800 mt-4 mb-2">
          Méthode de Règlement
        </h3>
        <p className="text-red-500 text-sm mb-2">
          Ce site utilise Stripe pour le paiement, vous pouvez renseigner 4242
          4242 4242 4242 comme numéro de carte avec n'importe quelle date future
          comme date d'expiration et le code CVC de votre choix pour simuler un
          paiement et aller au bout du processus de réservation.
        </p>
        <FormRow>
          <label className="label" htmlFor="card-element">
            Données de votre carte
          </label>
          <StripeCardElement CardElement={CardElement} />
        </FormRow>
        <FormRow>
          <Toggle
            label="J'accepte les Conditions Générales de Vente."
            onChange={onToggleAcceptTerms}
            value={acceptTerms}
            className={`${formWasSubmitted && !acceptTerms && 'toggle-error'}`}
          />
        </FormRow>
        <p className="text-green-600 font-semibold my-2">
          Annulation GRATUITE jusqu'au {twoDaysBefore(booking.firstDay)}
        </p>
        <button
          type="submit"
          name="pay"
          onClick={handlePaymentSubmit}
          disabled={loading}
          className={`mt-4 w-full btn btn-primary btn-large ${
            loading && 'btn-disabled'
          }`}
        >
          {loading ? <Loader /> : 'Pré-réserver pour 50€'}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
