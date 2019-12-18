import { createStore, combineReducers } from 'redux'
import { reducer as BookingReducer } from './Booking/Reducers'

const rootReducer = combineReducers({
  booking: BookingReducer
})

const store = (initialState, options) => {
  return createStore(rootReducer, initialState)
}

export default store