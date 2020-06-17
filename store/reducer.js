import dayjs from 'dayjs';
import { INITIAL_BOOKING } from './state';

export const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_RESORT':
      return {
        ...state,
        resortId: action.resortId,
        resortName: action.resortName,
        isValid: action.resortId && state.firstDay && state.adultsCount > 0,
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
        weekId: weekForDay(action.catalog, action.firstDay).id,
        isValid: action.firstDay && state.resortId && state.adultsCount > 0,
      };
    case 'SET_PEOPLE':
      return {
        ...state,
        adultsCount: action.adultsCount,
        childrenCount: action.childrenCount,
        isValid: action.adultsCount > 0 && state.firstDay && state.resortId,
      };
    case 'SET_AMOUNT':
      return {
        ...state,
        adultsAmount: action.adultsAmount,
        childrenAmount: action.childrenAmount,
        totalAmount: action.totalAmount,
      };
    case 'RESET_BOOKING':
      return INITIAL_BOOKING;
    default:
      return {
        ...state,
      };
  }
};

const weekForDay = (catalog, day) => {
  return catalog.weeks.find(
    (week) => week.first_day <= day && week.last_day >= day
  );
};
