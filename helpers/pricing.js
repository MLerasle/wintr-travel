const UNIT_ADULT_PRICE = 55;
const UNIT_CHILD_PRICE = 40;

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
