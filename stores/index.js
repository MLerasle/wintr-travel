import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { reducer as BookingReducer } from './Booking/Reducers'
import { reducer as CatalogReducer } from './Catalog/Reducers'
import { watchCatalog } from './Sagas'

const rootReducer = combineReducers({
  booking: BookingReducer,
  catalog: CatalogReducer
})

const configureStore = (preloadedState, {isServer, req = null}) => {
  const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  )

  if (req || !isServer) {
    store.sagaTask = sagaMiddleware.run(watchCatalog)
  }

  return store
}

export default configureStore