import dayjs from 'dayjs';

import { ADULT_PRICE, CHILD_PRICE } from '../data/pack';

export const getLastDay = (firstDay) => {
  return dayjs(firstDay).add(6, 'day').format('YYYY-MM-DD');
};

export const getPrices = (adults, children) => {
  const adultsPrice = adults * ADULT_PRICE;
  const childrenPrice = children * CHILD_PRICE;
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
