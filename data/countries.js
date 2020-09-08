import i18nIsoCountries from 'i18n-iso-countries';
i18nIsoCountries.registerLocale(require('i18n-iso-countries/langs/fr.json'));

export const isoCountries = () => i18nIsoCountries.getNames('fr');
