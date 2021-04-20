import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import {
  CardElement,
  PaymentRequestButtonElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { destroyCookie } from 'nookies';
import * as Sentry from '@sentry/browser';

import BookingDeliveryAddress from '@/App/Booking/BookingFormDeliveryAddress';
import StripeCardElement from '@/App/Checkout/StripeCardElement';
import Button from '@/UI/Button';
import FormRow from '@/UI/FormRow';
import Label from '@/UI/Label';
import Input from '@/UI/Input';
import Checkbox from '@/UI/Checkbox';
import SelectInput from '@/UI/SelectInput';
import Separator from '@/UI/Separator';
import Loader from '@/UI/Loader';
import Alert from '@/UI/Alert';

import BookingContext from 'context/booking-context';
import * as gtag from 'lib/gtag';
import { getLastDay, getPrices } from 'helpers/booking';
import { twoDaysBefore } from 'helpers/dates';
import { countries } from 'data/countries';

const headers = { 'Content-Type': 'application/json' };

const CheckoutForm = ({ intent }) => {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const booking = useContext(BookingContext);
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
  }, [stripe]);

  const onFirstNameUpdate = (event) => {
    const updatedFirstName = event.target.value;
    booking.update('firstname', updatedFirstName);
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
    booking.update('lastname', updatedLastName);
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
    booking.update('countryCode', updatedCountry);
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
    booking.update('deliveryAddress', address);
    booking.update('placeId', placeId);
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
    const customerResp = await fetch('/api/customer/create', {
      method: 'POST',
      headers,
      body: JSON.stringify(updatedBooking),
    });
    const customer = await customerResp.json();

    const invoiceResp = await fetch('/api/invoice/create', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        ...updatedBooking,
        stripeCustomerId: customer.id,
      }),
    });
    const invoice = await invoiceResp.json();

    // Send booking infos to the backend
    await fetch('/api/booking/publish', {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        ...updatedBooking,
        stripeCustomerId: customer.id,
        stripeInvoiceId: invoice.id,
        stripeInvoiceUrl: invoice.hosted_invoice_url,
        stripeInvoicePdf: invoice.invoice_pdf,
        state: 'prepaid',
      }),
    });

    await fetch('/api/paymentIntent/update', {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        paymentIntentId: updatedBooking.paymentIntentId,
        stripeCustomerId: customer.id,
      }),
    });

    destroyCookie(null, 'paymentIntentId');

    gtag.event({
      action: 'pay_booking',
      category: 'Booking',
      label: paymentMethod,
    });

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
      setPaymentError(err.message);
      setIsLoading(false);
      window.scrollTo(0, 0);
      Sentry.captureException(err);
      gtag.event({
        action: 'pay_booking',
        category: 'Booking',
        label: 'Error while paying booking',
      });
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
          <Separator label="Ou" className="my-10" />
        </>
      ) : null}
      <form className="flex flex-col">
        <h3 className="text-lg leading-6 font-semibold text-gray-800 mb-4">
          Informations Client
        </h3>
        <FormRow>
          <Label for="firstname">Prénom</Label>
          <Input
            type="text"
            id="firstname"
            name="firstname"
            onChange={onFirstNameUpdate}
            className={`w-full ${
              formErrors.firstname && formWasSubmitted
                ? 'border-primary-red bg-light-red'
                : ''
            }`}
          />
          <div className="error text-primary-red pt-1 pl-1" role="alert">
            {formWasSubmitted && formErrors.firstname}
          </div>
        </FormRow>
        <FormRow>
          <Label for="lastname">Nom</Label>
          <Input
            type="text"
            id="lastname"
            name="lastname"
            onChange={onLastNameUpdate}
            className={`w-full ${
              formErrors.lastname && formWasSubmitted
                ? 'border-primary-red bg-light-red'
                : ''
            }`}
          />
          <div className="error text-primary-red pt-1 pl-1" role="alert">
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
          <div className="error text-primary-red pt-1 pl-1" role="alert">
            {formWasSubmitted && formErrors.country}
          </div>
        </FormRow>
        <h3 className="text-lg leading-6 font-semibold text-gray-800 mt-2 mb-4">
          Addresse de Livraison
        </h3>
        <FormRow>
          <BookingDeliveryAddress
            booking={booking}
            onDeliveryAddressUpdate={onDeliveryAddressUpdate}
          />
        </FormRow>
        <h3 className="text-lg leading-6 font-semibold text-gray-800 mt-2 mb-4">
          Méthode de Règlement
        </h3>
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
        <p className="text-primary-green font-semibold text-center my-2">
          Annulation GRATUITE jusqu'au {twoDaysBefore(booking.firstDay)}
        </p>
        <Button
          type="submit"
          name="pay"
          onClick={handlePaymentSubmit}
          disabled={loading}
          classes="my-4 w-full uppercase tracking-wide bg-primary-green text-white"
        >
          {loading ? <Loader /> : 'Pré-réserver pour 5€'}
        </Button>
      </form>
    </div>
  );
};

export default CheckoutForm;
