import { put } from 'redux-saga/effects'
import axios from 'axios'

import CatalogActions from '../Catalog/Actions'

export function* fetchCatalog() {
  try {
    const response = yield axios.get('https://catalog.wintr.travel/v1/catalog.json')
    yield put(CatalogActions.setCatalog(response.data))
  } catch (error) {
    // TODO: Raise an error and catch it somewhere
    console.log('An error occurred during catalog fetching', error)
  }
}