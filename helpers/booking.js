import dayjs from 'dayjs';

import { UNIT_ADULT_PRICE, UNIT_CHILD_PRICE, DURATION } from '../data/booking';

export const getLastDay = (firstDay) => {
  return dayjs(firstDay).add(6, 'day').format('YYYY-MM-DD');
};

export const getPrices = (adults, children) => {
  const adultsPrice = DURATION * adults * UNIT_ADULT_PRICE;
  const childrenPrice = DURATION * children * UNIT_CHILD_PRICE;
  const totalPrice = adultsPrice + childrenPrice;
  return {
    adults: adultsPrice,
    children: childrenPrice,
    total: totalPrice,
  };
};

export const isValid = (booking) => {
  return booking.adults.length > 0 && !!booking.firstDay;
};
