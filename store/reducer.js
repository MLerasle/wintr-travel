import dayjs from 'dayjs';
import { INITIAL_BOOKING } from './state';

export const reducer = (state = INITIAL_BOOKING, action) => {
  switch (action.type) {
    case 'SET_DATES':
      return {
        ...state,
        firstDay: action.firstDay,
        lastDay: action.firstDay
          ? dayjs(action.firstDay).add(6, 'day').format('YYYY-MM-DD')
          : null,
        duration: action.firstDay ? 6 : 0,
        isValid: !!action.firstDay && state.adults.length > 0,
      };
    case 'SET_SKIERS':
      return {
        ...state,
        adults: action.adults,
        children: action.children,
        isValid: action.adults.length > 0 && !!state.firstDay,
      };
    case 'SET_AMOUNT':
      return {
        ...state,
        adultsPrice: action.adultsPrice,
        childrenPrice: action.childrenPrice,
        totalPrice: action.totalPrice,
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
    case 'SET_PAYMENT_INTENT_ID':
      return {
        ...state,
        paymentIntentId: action.paymentIntentId,
      };
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
      };
    case 'RESET_BOOKING':
      return INITIAL_BOOKING;
    case 'INITIALIZE_BOOKING':
      return {
        ...action.booking,
      };
    default:
      return {
        ...state,
      };
  }
};
