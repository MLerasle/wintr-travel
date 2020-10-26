export const setArrivalDate = (firstDay) => {
  return { type: 'SET_ARRIVAL_DATE', firstDay };
};

export const setSkiers = (adults, children) => {
  return { type: 'SET_SKIERS', adults, children };
};

export const setEmail = (email) => {
  return { type: 'SET_EMAIL', email };
};

export const setRegisteredToNewsLetter = (register) => {
  return { type: 'SET_REGISTERED_TO_NEWSLETTER', register };
};

export const setName = (name) => {
  return { type: 'SET_NAME', name };
};

export const setCountryCode = (countryCode) => {
  return { type: 'SET_COUNTRY_CODE', countryCode };
};

export const setDeliveryAddress = (address, placeId) => {
  return { type: 'SET_DELIVERY_ADDRESS', address, placeId };
};

export const setPhoneNumber = (phoneNumber) => {
  return { type: 'SET_PHONE_NUMBER', phoneNumber };
};

export const initializeBooking = (booking) => {
  return { type: 'INITIALIZE_BOOKING', booking };
};
