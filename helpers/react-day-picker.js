import dayjs from 'dayjs';

const MONTHS = {
  en: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
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
  en: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  fr: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
};

const WEEKDAYS_SHORT = {
  en: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  fr: ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'],
};

const FIRST_DAY = {
  en: 0,
  fr: 0,
};

function formatDay(d, locale = 'en') {
  return `${WEEKDAYS_LONG[locale][d.getDay()]}, ${d.getDate()} ${
    MONTHS[locale][d.getMonth()]
  } ${d.getFullYear()}`;
}

function formatMonthTitle(d, locale = 'en') {
  return `${MONTHS[locale][d.getMonth()]} ${d.getFullYear()}`;
}

function formatWeekdayShort(i, locale = 'en') {
  return WEEKDAYS_SHORT[locale][i];
}

function formatWeekdayLong(i, locale = 'en') {
  return WEEKDAYS_SHORT[locale][i];
}

function getFirstDayOfWeek(locale = 'en') {
  return FIRST_DAY[locale];
}

// Next 2 methods are from react-day-picker/moment
export function formatDate(date) {
  var format =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'L';
  var locale =
    arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'en';

  return dayjs(date)
    .locale(locale)
    .format(Array.isArray(format) ? format[0] : format);
}

export function parseDate(str) {
  var format =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'L';
  var locale =
    arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'en';

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
