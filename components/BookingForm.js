import React, { useReducer } from 'react'
import Router from 'next/router'
import useTranslation from 'next-translate/useTranslation'

import SelectInput from '../components/SelectInput'
import DateRangeInput from './DateRangeInput'
import SkierDropdown from './SkierDropdown'
import Header from '../components/Header'
import Button from '../components/Button'

import { calcBookingPrice } from '../helpers/pricing'
import { INITIAL_BOOKING } from '../store/state'
import { reducer } from '../store/reducer'

const BookingForm = props => {
  const { t, lang } = useTranslation()
  const [booking, dispatch] = useReducer(reducer, INITIAL_BOOKING)

  const handleResortChange = (resort, triggeredAction) => {
    if (triggeredAction.action === 'clear') {
      return dispatch({ type: 'SET_RESORT', resortId: null, resortName: null })
    }
    dispatch({ type: 'SET_RESORT', resortId: resort.value, resortName: resort.label })
    document.querySelector('.InputDates-from input').focus()
  }

  const handleDateChange = (type, date) => {
    const { firstDay, lastDay } = booking
    try {
      if (type === 'from') {
        dispatch({ type: 'SET_DATES', catalog: props.catalog, firstDay: date, lastDay })
      } else {
        dispatch({ type: 'SET_DATES', catalog: props.catalog, firstDay, lastDay: date })
      }
    } catch (error) {
      console.log('ERROR', error)
    }
  }

  const handleSkierChange = (action, age = null) => {
    let { adultsCount, childrenCount } = booking
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
    dispatch({ type: 'SET_PEOPLE', adultsCount, childrenCount })
  }

  const validateSearch = e => {
    e.preventDefault()
    if (!booking.isValid) { return }
    const { resortId, weekId, duration, adultsCount, childrenCount } = booking
    const bookingPrice = calcBookingPrice(props.catalog, resortId, weekId, duration, adultsCount, childrenCount)
    if (bookingPrice.error) {
      // TODO: Raise error and do something useful for the user :)
      console.log('ERROR in bookingPrice calculation', bookingPrice)
      return
    }
    dispatch({ type: 'SET_AMOUNT', adultsAmount: bookingPrice.adults, childrenAmount: bookingPrice.children, totalAmount: bookingPrice.total })
    Router.push(`/${lang}/cart`).then(() => window.scrollTo(0, 0))
  }

  return (
    <div className="bg-white md:rounded-lg md:shadow-xl px-6 py-4 sm:p-8 w-full md:max-w-lg">
      <Header className="sm:text-3xl">
        {t('home:form.title')}
      </Header>
      <form className="flex flex-col mt-4 mb-8">
        <SelectInput
          options={props.catalog.resorts.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)).map(r => {
            return { value: r.id, label: r.name }
          })}
          label={t('home:form.resortLabel')}
          placeholder={t('home:form.resortPlaceholder')}
          defaultValue={booking.resortId ? { label: booking.resortName, value: booking.resortId } : ''}
          resort={{value: booking.resortId, label: booking.resortName}}
          handleChange={handleResortChange} />
        <DateRangeInput
          from={booking.firstDay}
          to={booking.lastDay}
          fromLabel={t('home:form.dateFromLabel')}
          toLabel={t('home:form.dateToLabel')}
          onChange={(type, date) => handleDateChange(type, date)}
          onChangeToDate={() => document.getElementById('skiersInput').focus()}
          locale={lang}
          minDate={props.catalog.weeks[0].first_day}
          maxDate={props.catalog.weeks[props.catalog.weeks.length - 1].last_day} />
        <SkierDropdown
          childrenCount={booking.childrenCount}
          adultsCount={booking.adultsCount}
          onChange={(age, action) => handleSkierChange(age, action)} />
      </form>
      <Button
        id="searchButton"
        name={t('common:button.validate')}
        disabled={!booking.isValid}
        onClick={validateSearch} >
        {t('common:button.validate')}
      </Button>
    </div>
  )
}

export default BookingForm