import { useState } from 'react';

const CARD_ELEMENT_OPTIONS = {
  classes: {
    base:
      'border border-gray-300 rounded-lg px-2 py-3 h-12 w-full appearance-none bg-white',
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

const StripeCardElement = ({ CardElement }) => {
  const [error, setError] = useState(null);

  // Handle real-time validation errors from the card Element.
  const handleCardChange = (event) => {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
  };

  return (
    <>
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
    </>
  );
};

export default StripeCardElement;
