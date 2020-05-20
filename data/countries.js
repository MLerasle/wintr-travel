import i18nIsoCountries from 'i18n-iso-countries';
i18nIsoCountries.registerLocale(require('i18n-iso-countries/langs/en.json'));
i18nIsoCountries.registerLocale(require('i18n-iso-countries/langs/fr.json'));

export const isoCountries = (locale) => {
  return i18nIsoCountries.getNames(locale);
};
