import moment from 'moment'
import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { BookingTypes } from './Actions'

const weekForDay = (catalog, day) => {
  return catalog.weeks.find(week => week.first_day <= day && week.last_day >= day)
}

export const setResort = (state, { resortId, resortName }) => ({
  ...state,
  resortId,
  resortName,
  isValid: resortId && state.firstDay && state.adultsCount > 0
})

export const setDates = (state, { catalog, firstDay, lastDay }) => ({
  ...state,
  firstDay,
  lastDay,
  duration: moment(lastDay).diff(moment(firstDay), 'days') + 1,
  weekId: weekForDay(catalog, firstDay).id,
  isValid: firstDay && state.resortId && state.adultsCount > 0
})

export const setPeople = (state, { adultsCount, childrenCount }) => ({
  ...state,
  adultsCount,
  childrenCount,
  isValid: adultsCount > 0 && state.firstDay && state.resortId
})

export const setAmount = (state, { adultsAmount, childrenAmount, totalAmount }) => ({
  ...state,
  adultsAmount,
  childrenAmount,
  totalAmount
})

export const resetBooking = (state) => (
  INITIAL_STATE
)

export const reducer = createReducer(INITIAL_STATE, {
  [BookingTypes.SET_RESORT]: setResort,
  [BookingTypes.SET_DATES]: setDates,
  [BookingTypes.SET_PEOPLE]: setPeople,
  [BookingTypes.SET_AMOUNT]: setAmount,
  [BookingTypes.RESET_BOOKING]: resetBooking
})