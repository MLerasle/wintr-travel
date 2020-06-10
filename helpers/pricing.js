export const calcBookingPrice = (
  catalog,
  resortId,
  weekId,
  duration,
  adults,
  children
) => {
  try {
    let price = 0;
    const pricing = pricingForResortAndWeek(catalog, resortId, weekId);
    const adultPrice = getPrice(pricing, 'adult', duration);
    const childrenPrice = getPrice(pricing, 'child', duration);
    price = adults * adultPrice + children * childrenPrice;
    return {
      adults: (adults * adultPrice).toFixed(2),
      children: (children * childrenPrice).toFixed(2),
      total: price.toFixed(2),
    };
  } catch (err) {
    return { error: 'ERROR', message: err };
  }
};

const pricingForResortAndWeek = (catalog, resortId, weekId) => {
  return catalog.pricing.find(
    (p) => p.resorts.includes(resortId) && p.grids.weeks.includes(weekId)
  );
};

const getPrice = (pricing, offer, duration) => {
  return pricing.grids.prices.find((p) => p.offer === offer)[`d${duration}`];
};
