import { createReducer } from 'reduxsauce'

import { INITIAL_STATE } from './InitialState'
import { LocaleTypes } from './Actions'

export const setLocale = (state, { locale }) => ({
  ...state,
  current: locale
})

export const reducer = createReducer(INITIAL_STATE, {
  [LocaleTypes.SET_LOCALE]: setLocale
})