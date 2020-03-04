import { createStore, combineReducers } from 'redux'
import { persistStore } from 'redux-persist'

import { reducer as BookingReducer } from './Booking/Reducers'
import { reducer as LocaleReducer } from './Locale/Reducers'

const rootReducer = combineReducers({
  booking: BookingReducer,
  locale: LocaleReducer
})

const configureStore = (preloadedState) => {
  let store
  const isClient = typeof window !== 'undefined'

  if (isClient) {
    const { persistReducer } = require('redux-persist')
    const storage = require('redux-persist/lib/storage').default

    const persistConfig = {
      key: 'root',
      storage,
      whitelist: ['booking']
    }

    store = createStore(
      persistReducer(persistConfig, rootReducer),
      preloadedState
    )

    store.__PERSISTOR = persistStore(store);
  } else {
    store = createStore(
      rootReducer,
      preloadedState
    )
  }

  return store
}

export default configureStore