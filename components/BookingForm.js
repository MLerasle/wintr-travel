import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Router from 'next/router'

import BookingActions from '../stores/Booking/Actions'
import SelectInput from '../components/SelectInput'
import DateRangeInput from './DateRangeInput'
import SkierDropdown from './SkierDropdown'
import Button from '../components/Button'

const BookingForm = props => {
  const booking = useSelector(state => state.booking)
  const dispatch = useDispatch()

  const handleResortChange = (resort, triggeredAction) => {
    const { setResort } = BookingActions
    if (triggeredAction.action === 'clear') {
      return dispatch(setResort(null, null))
    }
    dispatch(setResort(resort.value, resort.label))
    document.querySelector('.InputDates-from input').focus()
  }

  const handleDateChange = (type, date) => {
    const { firstDay, lastDay } = booking
    const { setDates } = BookingActions
    if (type === 'from') {
      dispatch(setDates(null, date, lastDay))
    } else {
      dispatch(setDates(null, firstDay, date))
    }
  }

  const handleSkierChange = (action, age = null) => {
    let { adultsCount, childrenCount } = booking
    const { setPeople } = BookingActions
    if (action === 'increment' && age === 'adult') {
      adultsCount += 1
    } else if (action === 'increment' && age === 'child') {
      childrenCount += 1
    } else if (action === 'decrement' && age === 'adult' && adultsCount > 0) {
      adultsCount -= 1
    } else if (action === 'decrement' && age === 'child' && childrenCount > 0) {
      childrenCount -= 1
    } else if (action === 'reset') {
      adultsCount = 2
      childrenCount = 0
    }
    dispatch(setPeople(adultsCount, childrenCount))
  }

  const validateSearch = e => {
    e.preventDefault()
    if (!booking.isValid) { return }
    Router.push('/cart')
  }

  return (
    <div className="bg-white md:rounded-lg md:shadow-xl px-6 py-4 sm:p-8 w-full md:max-w-lg">
      <h2 className="text-2xl sm:text-3xl leading-tight font-semibold text-gray-800">
        Réservez votre matériel de ski.<br className="hidden sm:block" /> Et votre forfait.
      </h2>
      <form className="flex flex-col mt-4 mb-8">
        <SelectInput
          options={props.resorts}
          label="Où"
          placeholder="Choisissez la station"
          defaultValue={booking.resortId ? { label: booking.resortName, value: booking.resortId } : ''}
          resort={{value: booking.resortId, label: booking.resortName}}
          handleChange={handleResortChange} />
        <DateRangeInput
          from={booking.firstDay}
          to={booking.lastDay}
          fromLabel="Arrivée"
          toLabel="Départ"
          onChange={(type, date) => handleDateChange(type, date)}
          onChangeToDate={() => document.getElementById('skiersInput').focus()} />
        <SkierDropdown
          childrenCount={booking.childrenCount}
          adultsCount={booking.adultsCount}
          onChange={(age, action) => handleSkierChange(age, action)} />
      </form>
      <Button
        id="searchButton"
        disabled={!booking.isValid}
        onClick={validateSearch}
        label="Valider"
      />
    </div>
  )
}

export default BookingForm