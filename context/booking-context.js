import { createContext, useState, useEffect } from 'react';

const initalBooking = {
  resort: 'Flaine',
  firstDay: null,
  adults: [],
  children: [],
  firstname: '',
  lastname: '',
  email: '',
  phoneNumber: '',
  countryCode: null,
  deliveryAddress: '',
  placeId: null,
  isRegisteredToNewsletter: true,
  stripeInvoiceId: null,
  stripeCustomerId: null,
  stripeInvoiceUrl: null,
  stripeInvoicePdf: null,
  state: '',
  season: '2021-2022',
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
    firstname: booking.firstname,
    lastname: booking.lastname,
    email: booking.email,
    phoneNumber: booking.phoneNumber,
    countryCode: booking.countryCode || 'FR',
    deliveryAddress: booking.deliveryAddress,
    placeId: booking.placeId,
    isRegisteredToNewsletter: booking.isRegisteredToNewsletter,
    stripeCustomerId: booking.stripeCustomerId,
    stripeInvoiceId: booking.stripeInvoiceId,
    stripeInvoiceUrl: booking.stripeInvoiceUrl,
    stripeInvoicePdf: booking.stripeInvoicePdf,
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
