import { useReducer } from 'react'
import Router from 'next/router'
import useTranslation from 'next-translate/useTranslation'

import Card from './Card'
import SelectInput from './SelectInput'
import DateRangeInput from './DateRangeInput'
import SkierDropdown from './SkierDropdown'
import Header from './Header'
import Button from './Button'

import { calcBookingPrice } from '../helpers/pricing'
import { INITIAL_BOOKING } from '../store/state'
import { reducer } from '../store/reducer'
import { updateSkiersNumber } from '../store/action'

const BookingForm = props => {
  const { t, lang } = useTranslation()
  const [booking, dispatch] = useReducer(reducer, props.booking || INITIAL_BOOKING)

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
    const { adultsCount, childrenCount } = updateSkiersNumber(booking, action, age)
    dispatch({ type: 'SET_PEOPLE', adultsCount, childrenCount })
  }

  const validateSearch = e => {
    e.preventDefault()
    if (!booking.isValid) { return }
    const { resortId, resortName, firstDay, lastDay, weekId, duration, adultsCount, childrenCount } = booking
    const bookingPrice = calcBookingPrice(props.catalog, resortId, weekId, duration, adultsCount, childrenCount)
    if (bookingPrice.error) {
      // TODO: Raise error and do something useful for the user :)
      console.log('ERROR in bookingPrice calculation', bookingPrice)
      return
    }
    dispatch({ type: 'SET_AMOUNT', adultsAmount: bookingPrice.adults, childrenAmount: bookingPrice.children, totalAmount: bookingPrice.total })
    Router.push({
      pathname: `/${lang}/cart`,
      query: {
        resort_id: resortId,
        resort_name: resortName,
        checkin: firstDay,
        checkout: lastDay,
        week_id: weekId,
        duration: duration,
        adults: adultsCount,
        children: childrenCount,
        adults_amount: bookingPrice.adults,
        children_amount: bookingPrice.children,
        total_amount: bookingPrice.total
      }
    }).then(() => {
      props.onUpdate && props.onUpdate()
      window.scrollTo(0, 0)
    })
  }

  const validateButton = <Button
    id="searchButton"
    name={t('common:button.validate')}
    disabled={!booking.isValid}
    onClick={validateSearch}>
    {t('common:button.validate')}
  </Button>

  return (
    <>
      <Card>
        <Header className={`${props.booking ? 'border-b border-gray-300 mb-6 pb-6' : 'hidden'} md:block text-2xl sm:text-3xl`}>
          {
            props.booking
            ? t('common:form.editTitle')
            : t('common:form.title')
          }
        </Header>
        <form className="flex flex-col -mt-2 md:mt-4 mb-8">
          <SelectInput
            options={props.catalog.resorts.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)).map(r => {
              return { value: r.id, label: r.name }
            })}
            label={t('common:form.resortLabel')}
            placeholder={t('common:form.resortPlaceholder')}
            defaultValue={booking.resortId ? { label: booking.resortName, value: booking.resortId } : ''}
            resort={{value: booking.resortId, label: booking.resortName}}
            handleChange={handleResortChange} />
          <DateRangeInput
            from={booking.firstDay}
            to={booking.lastDay}
            fromLabel={t('common:form.dateFromLabel')}
            toLabel={t('common:form.dateToLabel')}
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
        <section className={`${props.booking && 'hidden'} md:block`}>
          {validateButton}
        </section>
      </Card>
      {
        props.booking &&
        <div className="fixed bottom-0 w-full p-4 border-t border-gray-300 z-10 bg-white md:hidden">
          {validateButton}
        </div>
      }
    </>
  )
}

export default BookingForm