import { put } from 'redux-saga/effects'
import fetch from 'isomorphic-unfetch'

import CatalogActions from '../Catalog/Actions'

export function* fetchCatalog() {
  try {
    const response = yield fetch('https://catalog.wintr.travel/v1/catalog.json')
    const catalog = yield response.json()
    yield put(CatalogActions.setCatalog(catalog))
  } catch (error) {
    // TODO: Raise an error and catch it somewhere
    console.log('An error occurred during catalog fetching', error)
  }
}