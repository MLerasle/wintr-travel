import { createContext, useState, useEffect, useMemo } from 'react';

import { getBookingSeason } from 'helpers/dates';

const initialBooking = {
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
  season: '',
};

const BookingContext = createContext({
  ...initialBooking,
  update: () => {},
  clear: () => {},
});

export function BookingContextProvider(props) {
  const [booking, setBooking] = useState(initialBooking);
  const bookingSeason = useMemo(
    () => getBookingSeason(booking.firstDay),
    [booking.firstDay]
  );

  function updateBookingHandler(fields) {
    setBooking({ ...booking, ...fields });
  }

  function clearBookingHandler() {
    setBooking(initialBooking);
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
    season: bookingSeason,
    update: updateBookingHandler,
    clear: clearBookingHandler,
  };

  useEffect(() => {
    if (sessionStorage.getItem('booking')) {
      setBooking(JSON.parse(sessionStorage.getItem('booking')));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('booking', JSON.stringify(context));
  }, [context]);

  return (
    <BookingContext.Provider value={context}>
      {props.children}
    </BookingContext.Provider>
  );
}

export default BookingContext;
