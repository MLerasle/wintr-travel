import { createContext, useState, useEffect } from 'react';

const initalBooking = {
  firstDay: null,
  adults: [],
  children: [],
  name: '',
  email: '',
  phoneNumber: '',
  countryCode: null,
  deliveryAddress: '',
  placeId: null,
  isRegisteredToNewsletter: true,
  stripeInvoiceId: null,
  stripeCustomerId: null,
  state: '',
};

const BookingContext = createContext({
  ...initalBooking,
  update: () => {},
});

export function BookingContextProvider(props) {
  const [booking, setBooking] = useState(initalBooking);

  function updateBookingHandler(key, value) {
    setBooking({ ...booking, [key]: value });
  }

  let context = {
    firstDay: booking.firstDay,
    adults: booking.adults,
    children: booking.children,
    name: booking.name,
    email: booking.email,
    phoneNumber: booking.phoneNumber,
    countryCode: booking.countryCode || 'FR',
    deliveryAddress: booking.deliveryAddress,
    placeId: booking.placeId,
    isRegisteredToNewsletter: booking.isRegisteredToNewsletter,
    stripeCustomerId: booking.stripeCustomerId,
    stripeInvoiceId: booking.stripeInvoiceId,
    state: booking.state,
    update: updateBookingHandler,
  };

  useEffect(() => {
    if (localStorage.getItem('booking')) {
      setBooking(JSON.parse(localStorage.getItem('booking')));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('booking', JSON.stringify(context));
  }, [context]);

  return (
    <BookingContext.Provider value={context}>
      {props.children}
    </BookingContext.Provider>
  );
}

export default BookingContext;
