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

export const getMonthAndYear = (day) => {
  const date = dayjs(day, 'YYYY-MM-DD');
  return date.format('MMM YYYY');
};

export const twoDaysBefore = (day) => {
  const date = dayjs(day, 'YYYY-MM-DD').subtract(2, 'days');
  return date.format('DD MMM YYYY');
};

export const dayBeforeTimestamp = (day) => {
  const date = dayjs(day, 'YYYY-MM-DD').subtract(1, 'day').hour(10).minute(0);
  return date.unix();
};
