import { useEffect, useReducer } from 'react'
import Router, { useRouter } from 'next/router'
import Head from 'next/head'
import useTranslation from 'next-translate/useTranslation'
import fetch from 'isomorphic-unfetch'
import Icon from '@mdi/react'
import { mdiMapMarker, mdiCalendar } from '@mdi/js'

import LayoutCover from '../components/LayoutCover'
import PackContent from '../components/PackContent'
import Counter from '../components/Counter'
import Header from '../components/Header'
import Button from '../components/Button'

import { calcBookingPrice } from '../helpers/pricing'
import { formattedDates } from '../helpers/dates'

import { reducer } from '../store/reducer'
import { updateSkiersNumber } from '../store/action'

const Cart = ({ catalog }) => {
  const router = useRouter()
  const { resort_id, resort_name, checkin, checkout, week_id, duration, adults, children, adults_amount, children_amount, total_amount } = router.query
  const initialBooking = {
    resortId: +resort_id,
    resortName: resort_name,
    firstDay: checkin,
    lastDay: checkout,
    duration: +duration,
    weekId: +week_id,
    adultsCount: +adults,
    childrenCount: +children,
    adultsAmount: +adults_amount,
    childrenAmount: +children_amount,
    totalAmount: +total_amount,
    isValid: resort_id && checkin && adults > 0
  }
  const [booking, dispatch] = useReducer(reducer, initialBooking)
  const { t, lang } = useTranslation()

  useEffect(() => {
    if (!booking.isValid) {
      Router.push(`/${lang}`)
    }
  }, [])

  const updateAmounts = (adults, children) => {
    return calcBookingPrice(catalog, booking.resortId, booking.weekId, booking.duration, adults, children)
  }

  const handleSkierChange = (action, age = null) => {
    const { adultsCount, childrenCount } = updateSkiersNumber(booking, action, age)
    dispatch({ type: 'SET_PEOPLE', adultsCount, childrenCount })
    const amount = updateAmounts(adultsCount, childrenCount)
    if (Object.keys(amount).length > 0) {
      dispatch({ type: 'SET_AMOUNT', adultsAmount: amount.adults, childrenAmount: amount.children, totalAmount: amount.total })
    }
  }

  const addChildToBooking = () => {
    dispatch({ type: 'SET_PEOPLE', adultsCount: booking.adultsCount, childrenCount: 1 })
    const amount = updateAmounts(booking.adultsCount, 1)
    dispatch({ type: 'SET_AMOUNT', adultsAmount: amount.adults, childrenAmount: amount.children, totalAmount: amount.total })
  }

  const validateCart = () => {
    console.log('Validate cart and redirect to Stripe checkout page')
  }

  return (
    <LayoutCover>
      <Head>
        <title>{t('cart:title')} - Wintr Travel</title>
      </Head>
      <div className="flex flex-col items-start md:items-center md:py-6">
        <div className="px-6 py-8 bg-white md:rounded-lg md:shadow-xl w-full sm:max-w-xl">
          <Header className="text-2xl sm:text-3xl">
            {t('cart:title')}
          </Header>

          <div className="w-full border border-gray-300 rounded-lg px-4 py-3 my-6">
            <div className="flex items-center py-1">
              <Icon path={mdiMapMarker} size={1} color="#0CB3FA" />
              <span className="ml-2 text-gray-700 tracking-wide">{booking.resortName}</span>
            </div>
            <div className="flex items-center py-1">
              <Icon path={mdiCalendar} size={1} color="#0CB3FA" />
              <span className="ml-2 text-gray-700 tracking-wide capitalize">{formattedDates(booking.firstDay, booking.lastDay, t, lang)}</span>
            </div>
          </div>

          <div className="flex justify-between w-full border border-gray-300 rounded-lg p-4 my-6">
            <div className="flex flex-col items-start sm:flex-row sm:items-center">
              <span className="text-gray-800 text-md font-semibold uppercase tracking-wide sm:mr-12 mb-2 sm:mb-0">{t('common:pack.adult')}</span>
              <Counter
                value={booking.adultsCount}
                label="adults"
                onIncrement={e => {
                  e.preventDefault()
                  handleSkierChange('increment', 'adult')
                }}
                onDecrement={e => {
                  e.preventDefault()
                  handleSkierChange('decrement', 'adult')
                }}
              />
            </div>
            <div className="flex items-center text-lg text-secondary-blue font-bold">{booking.adultsAmount} €</div>
          </div>

          {
            +booking.childrenCount > 0 ?
            <div className="flex justify-between w-full border border-gray-300 rounded-lg p-4 my-6">
              <div className="flex flex-col items-start sm:flex-row sm:items-center">
                <span className="text-gray-800 text-md font-semibold uppercase tracking-wide sm:mr-12 mb-2 sm:mb-0">{t('common:pack.child')}</span>
                <Counter
                  value={booking.childrenCount}
                  label="children"
                  onIncrement={e => {
                    e.preventDefault()
                    handleSkierChange('increment', 'child')
                  }}
                  onDecrement={e => {
                    e.preventDefault()
                    handleSkierChange('decrement', 'child')
                  }}
                />
              </div>
              <div className="flex items-center text-lg text-secondary-blue font-bold">{booking.childrenAmount} €</div>
            </div>
            :
            <button
              name={t('cart:addChildren')}
              className="text-secondary-blue cursor-pointer mb-6 px-2 focus:outline-none focus:shadow-outline hover:underline"
              onClick={addChildToBooking}>
              {t('cart:addChildren')}
            </button>
          }

          <Button
            name={t('common:button.pay')}
            disabled={!booking.isValid}
            onClick={validateCart}>
            {t('common:button.pay')} {booking.totalAmount} €
          </Button>
          <PackContent className="mt-6" />
        </div>
      </div>
    </LayoutCover>
  )
}

export async function getStaticProps() {
  const response = await fetch('https://catalog.wintr.travel/v1/catalog.json')
  const catalog = await response.json()

  return {
    props: {
      catalog
    }
  }
}

export default Cart