import { INITIAL_BOOKING } from './state';

export const reducer = (state = INITIAL_BOOKING, action) => {
  switch (action.type) {
    case 'SET_ARRIVAL_DATE':
      return {
        ...state,
        firstDay: action.firstDay,
      };
    case 'SET_SKIERS':
      return {
        ...state,
        adults: action.adults,
        children: action.children,
      };
    case 'SET_EMAIL':
      return {
        ...state,
        email: action.email,
      };
    case 'SET_REGISTERED_TO_NEWSLETTER': {
      return {
        ...state,
        isRegisteredToNewsletter: action.register,
      };
    }
    case 'SET_NAME':
      return {
        ...state,
        name: action.name,
      };
    case 'SET_COUNTRY_CODE':
      return {
        ...state,
        countryCode: action.countryCode,
      };
    case 'SET_DELIVERY_ADDRESS':
      return {
        ...state,
        deliveryAddress: action.address,
        placeId: action.placeId,
      };
    case 'RESET_BOOKING':
      return INITIAL_BOOKING;
    case 'INITIALIZE_BOOKING':
      return action.booking;
    default:
      return state;
  }
};
