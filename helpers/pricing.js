import { UNIT_ADULT_PRICE, UNIT_CHILD_PRICE } from '../data/prices';

export const getBookingPrices = (duration, adults, children) => {
  try {
    const adultsPrice = duration * adults * UNIT_ADULT_PRICE;
    const childrenPrice = duration * children * UNIT_CHILD_PRICE;
    const totalPrice = adultsPrice + childrenPrice;
    return {
      adults: adultsPrice,
      children: childrenPrice,
      total: totalPrice,
    };
  } catch (err) {
    return { error: 'ERROR', message: err };
  }
};
