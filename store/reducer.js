import dayjs from 'dayjs';
import { INITIAL_BOOKING } from './state';

export const reducer = (state = INITIAL_BOOKING, action) => {
  switch (action.type) {
    case 'SET_RESORT':
      return {
        ...state,
        resort: action.resort,
        isValid: action.resort && state.firstDay && state.adults.length > 0,
      };
    case 'SET_DATES':
      return {
        ...state,
        firstDay: action.firstDay,
        lastDay: action.lastDay || action.firstDay,
        duration:
          dayjs(action.lastDay || action.firstDay).diff(
            dayjs(action.firstDay),
            'day'
          ) + 1,
        isValid: action.firstDay && state.resort && state.adults.length > 0,
      };
    case 'SET_SKIERS':
      return {
        ...state,
        adults: action.adults,
        children: action.children,
        isValid: action.adults.length > 0 && state.firstDay && state.resort,
      };
    case 'SET_DELIVERY_ADDRESS':
      return {
        ...state,
        deliveryAddress: action.deliveryAddress,
      };
    case 'SET_AMOUNT':
      return {
        ...state,
        adultsPrice: action.adultsPrice,
        childrenPrice: action.childrenPrice,
        totalPrice: action.totalPrice,
      };
    case 'RESET_BOOKING':
      return INITIAL_BOOKING;
    default:
      return {
        ...state,
      };
  }
};
