import dayjs from 'dayjs';
import 'dayjs/locale/fr';

export const formatDate = (day) => {
  if (!day) {
    return;
  }
  dayjs.locale('fr');
  const date = dayjs(day, 'YYYY-MM-DD');
  return date.format('DD MMM YYYY');
};
