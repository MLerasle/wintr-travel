import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
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
  const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  )

  store.sagaTask = sagaMiddleware.run(rootSaga)

  return store
}

export default configureStore