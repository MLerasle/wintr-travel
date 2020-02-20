import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { persistStore } from 'redux-persist'

import { reducer as BookingReducer } from './Booking/Reducers'
import { reducer as CatalogReducer } from './Catalog/Reducers'
import { reducer as LocaleReducer } from './Locale/Reducers'
import rootSaga from './Sagas'

const rootReducer = combineReducers({
  booking: BookingReducer,
  catalog: CatalogReducer,
  locale: LocaleReducer
})

const configureStore = (preloadedState) => {
  let store
  const isClient = typeof window !== 'undefined'
  const composeEnhancers = (isClient && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

  const sagaMiddleware = createSagaMiddleware()

  if (isClient) {
    const { persistReducer } = require('redux-persist')
    const storage = require('redux-persist/lib/storage').default

    const persistConfig = {
      key: 'root',
      storage,
      whitelist: ['booking', 'catalog']
    }

    store = createStore(
      persistReducer(persistConfig, rootReducer),
      preloadedState,
      composeEnhancers(applyMiddleware(sagaMiddleware))
    )

    store.__PERSISTOR = persistStore(store);
  } else {
    store = createStore(
      rootReducer,
      preloadedState,
      composeEnhancers(applyMiddleware(sagaMiddleware))
    )
  }

  store.sagaTask = sagaMiddleware.run(rootSaga)

  return store
}

export default configureStore