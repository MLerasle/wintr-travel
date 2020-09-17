import dayjs from 'dayjs';

const MONTHS = {
  fr: [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
  ],
};

const WEEKDAYS_LONG = {
  fr: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
};

const WEEKDAYS_SHORT = {
  fr: ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'],
};

const FIRST_DAY = {
  fr: 1,
};

function formatDay(d, locale = 'fr') {
  return `${WEEKDAYS_LONG[locale][d.getDay()]}, ${d.getDate()} ${
    MONTHS[locale][d.getMonth()]
  } ${d.getFullYear()}`;
}

function formatMonthTitle(d, locale = 'fr') {
  return `${MONTHS[locale][d.getMonth()]} ${d.getFullYear()}`;
}

function formatWeekdayShort(i, locale = 'fr') {
  return WEEKDAYS_SHORT[locale][i];
}

function formatWeekdayLong(i, locale = 'fr') {
  return WEEKDAYS_SHORT[locale][i];
}

function getFirstDayOfWeek(locale = 'fr') {
  return FIRST_DAY[locale];
}

// Next 2 methods are from react-day-picker/moment
export function formatDate(date) {
  return dayjs(date).format('DD/MM/YYYY');
}

export function parseDate(str) {
  var format =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'L';
  var locale =
    arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'fr';

  var m = dayjs(str, format, locale, true);
  if (m.isValid()) {
    return m.toDate();
  }
  return undefined;
}

export const localeUtils = {
  formatDay,
  formatMonthTitle,
  formatWeekdayShort,
  formatWeekdayLong,
  getFirstDayOfWeek,
};
