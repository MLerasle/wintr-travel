import { takeEvery, all } from 'redux-saga/effects'

import { fetchCatalog } from './Catalog'
import { storeLocale } from './Locale'
import { CatalogTypes } from '../Catalog/Actions'
import { LocaleTypes } from '../Locale/Actions'

export function* watchCatalog() {
  yield takeEvery(CatalogTypes.SET_CATALOG, fetchCatalog)
}

function* watchLocale() {
  yield takeEvery(LocaleTypes.SET_LOCALE, storeLocale)
}

export default function* rootSaga() {
  yield all([
    watchCatalog(),
    watchLocale()
  ])
}