import moment from 'moment'

export const reducer = (state, action) => {
  let updatedBooking
  switch (action.type) {
    case 'SET_RESORT':
      updatedBooking = {
        ...state,
        resortId: action.resortId,
        resortName: action.resortName,
        isValid: action.resortId && state.firstDay && state.adultsCount > 0
      }
      sessionStorage.setItem('booking', JSON.stringify(updatedBooking))
      return updatedBooking
    case 'SET_DATES':
      updatedBooking = {
        ...state,
        firstDay: action.firstDay,
        lastDay: action.lastDay,
        duration: moment(action.lastDay).diff(moment(action.firstDay), 'days') + 1,
        weekId: weekForDay(action.catalog, action.firstDay).id,
        isValid: action.firstDay && state.resortId && state.adultsCount > 0
      }
      sessionStorage.setItem('booking', JSON.stringify(updatedBooking))
      return updatedBooking
    case 'SET_PEOPLE':
      updatedBooking = {
        ...state,
        adultsCount: action.adultsCount,
        childrenCount: action.childrenCount,
        isValid: action.adultsCount > 0 && state.firstDay && state.resortId
      }
      sessionStorage.setItem('booking', JSON.stringify(updatedBooking))
      return updatedBooking
    case 'SET_AMOUNT':
      updatedBooking = {
        ...state,
        adultsAmount: action.adultsAmount,
        childrenAmount: action.childrenAmount,
        totalAmount: action.totalAmount
      }
      sessionStorage.setItem('booking', JSON.stringify(updatedBooking))
      return updatedBooking
    case 'RESET_BOOKING':
      updatedBooking = INITIAL_BOOKING
      sessionStorage.setItem('booking', JSON.stringify(updatedBooking))
      return updatedBooking
    default:
      return {
        ...state
      }
  }
}

const weekForDay = (catalog, day) => {
  return catalog.weeks.find(week => week.first_day <= day && week.last_day >= day)
}