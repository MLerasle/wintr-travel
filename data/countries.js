import i18nIsoCountries from 'i18n-iso-countries';
i18nIsoCountries.registerLocale(require('i18n-iso-countries/langs/fr.json'));

const isoCountries = () => i18nIsoCountries.getNames('fr');

export const countries = Object.entries(isoCountries()).sort((a, b) =>
  a[1] > b[1] ? 1 : b[1] > a[1] ? -1 : 0
);
