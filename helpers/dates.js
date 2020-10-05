import dayjs from 'dayjs';
import 'dayjs/locale/fr';

dayjs.locale('fr');

export const formatDate = (day) => {
  if (!day) {
    return;
  }
  const date = dayjs(day, 'YYYY-MM-DD');
  return date.format('DD MMM YYYY');
};

export const formatDateLong = (day) => {
  const date = dayjs(day, 'YYYY-MM-DD');
  return date.format('dddd DD MMMM YYYY');
};

export const getDayNumber = (day) => {
  const date = dayjs(day, 'YYYY-MM-DD');
  return date.format('DD');
};
