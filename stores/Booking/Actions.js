import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  setResort: ['resortId', 'resortName'],
  setDates: ['catalog', 'firstDay', 'lastDay'],
  setPeople: ['adultsCount', 'childrenCount'],
  setAmount: ['adultsAmount', 'childrenAmount', 'totalAmount'],
  resetBooking: []
})

export const BookingTypes = Types
export default Creators