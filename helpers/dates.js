import dayjs from 'dayjs';
import 'dayjs/locale/fr';

export const formatDate = (day, locale) => {
  if (!day) {
    return;
  }
  dayjs.locale(locale);
  const date = dayjs(day, 'YYYY-MM-DD');
  return date.format('DD MMM YYYY');
};
