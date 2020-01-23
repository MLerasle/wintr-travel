import { i18n } from '../../i18n'

export function* storeLocale(action) {
  yield i18n.changeLanguage(action.locale)
}