import { createReducer } from 'reduxsauce'

import { INITIAL_STATE } from './InitialState'
import { CatalogTypes } from './Actions'

export const setCatalog = (state, { catalog }) => ({
  ...catalog
})

export const reducer = createReducer(INITIAL_STATE, {
  [CatalogTypes.SET_CATALOG]: setCatalog
})