import { takeEvery, all } from 'redux-saga/effects'

import { fetchCatalog } from './Catalog'
import { CatalogTypes } from '../Catalog/Actions'

function* watchCatalog() {
  yield takeEvery(CatalogTypes.SET_CATALOG, fetchCatalog)
}

export default function* rootSaga() {
  yield all([
    watchCatalog()
  ])
}