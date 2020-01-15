import { takeEvery } from 'redux-saga/effects'

import { fetchCatalog } from './Catalog'
import { CatalogTypes } from '../Catalog/Actions'

export function* watchCatalog() {
  yield takeEvery(CatalogTypes.SET_CATALOG, fetchCatalog)
}