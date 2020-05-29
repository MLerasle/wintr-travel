export const updateSkiersNumber = (booking, action, age = null) => {
  let { adultsCount, childrenCount } = booking;
  if (action === 'increment' && age === 'adult') {
    adultsCount += 1;
  } else if (action === 'increment' && age === 'child') {
    childrenCount += 1;
  } else if (action === 'decrement' && age === 'adult' && adultsCount > 0) {
    adultsCount -= 1;
  } else if (action === 'decrement' && age === 'child' && childrenCount > 0) {
    childrenCount -= 1;
  } else if (action === 'reset') {
    adultsCount = 2;
    childrenCount = 0;
  }
  return {
    adultsCount,
    childrenCount,
  };
};
