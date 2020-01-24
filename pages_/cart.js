import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Router from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import Icon from '@mdi/react'
import { mdiMapMarker, mdiCalendar } from '@mdi/js'

import BookingActions from '../stores/Booking/Actions'
import Nav from '../components/nav'
import PackContent from '../components/PackContent'
import Counter from '../components/Counter'
import Button from '../components/Button'

import { calcBookingPrice } from '../helpers/pricing'

const Cart = () => {
  const booking = useSelector(state => state.booking)
  const catalog = useSelector(state => state.catalog)
  const dispatch = useDispatch()
  const { setPeople, setAmount } = BookingActions
  const { t, lang } = useTranslation()

  useEffect(() => {
    if (!booking.isValid) {
      Router.push(`/${lang}`)
    }
  }, [])

  const updateAmounts = (adults, children) => {
    const bookingPrice = calcBookingPrice(catalog, booking.resortId, booking.weekId, booking.duration, adults, children);
    return bookingPrice;
  };

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
    dispatch(setPeople(adultsCount, childrenCount))
    const amount = updateAmounts(adultsCount, childrenCount)
    if (Object.keys(amount).length > 0) {
      dispatch(setAmount(amount.adults, amount.children, amount.total))
    }
  }

  const addChildToBooking = () => {
    dispatch(setPeople(booking.adultsCount, 1))
    const amount = updateAmounts(booking.adultsCount, 1)
    dispatch(setAmount(amount.adults, amount.children, amount.total))
  }

  const validateCart = () => {
    console.log('Validate cart and redirect to Stripe checkout page')
  }

  return (
    <>
      <div className="cover w-full absolute top-0 left-0">
        <div className="hidden md:block">
          <Nav />
        </div>
        <div className="md:hidden">
          <Nav background="primary" />
        </div>
        <div className="flex flex-col items-start sm:items-center md:py-6">
          <div className="px-6 pt-8 pb-6 bg-white md:rounded-lg md:shadow-xl w-full sm:max-w-xl">
            <h1 className="mb-6 text-2xl leading-tight font-semibold text-gray-800">{t('cart:title')}</h1>

            <div className="w-full border border-gray-300 rounded-lg px-4 py-3 my-6">
              <div className="flex items-center py-1">
                <Icon path={mdiMapMarker} size={1} color="#0CB3FA" />
                <span className="ml-2 text-gray-700 tracking-wide">{booking.resortName}</span>
              </div>
              <div className="flex items-center py-1">
                <Icon path={mdiCalendar} size={1} color="#0CB3FA" />
                <span className="ml-2 text-gray-700 tracking-wide">{booking.firstDay} - {booking.lastDay}</span>
              </div>
            </div>

            <div className="flex justify-between w-full border border-gray-300 rounded-lg p-4 my-6">
              <div className="flex flex-col items-start sm:flex-row sm:items-center">
                <span className="text-gray-800 text-md font-semibold uppercase tracking-wide sm:mr-12 mb-2 sm:mb-0">{t('common:pack.adult')}</span>
                <Counter
                  value={booking.adultsCount}
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
              booking.childrenCount > 0 ?
              <div className="flex justify-between w-full border border-gray-300 rounded-lg p-4 my-6">
                <div className="flex flex-col items-start sm:flex-row sm:items-center">
                  <span className="text-gray-800 text-md font-semibold uppercase tracking-wide sm:mr-12 mb-2 sm:mb-0">{t('common:pack.child')}</span>
                  <Counter
                    value={booking.childrenCount}
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
                className="text-secondary-blue cursor-pointer mb-6 px-2 focus:outline-none focus:shadow-outline hover:underline"
                onClick={addChildToBooking}>
                {t('cart:addChildren')}
              </button>
            }

            <Button
              disabled={!booking.isValid}
              onClick={validateCart}>
              {t('common:button.pay')} {booking.totalAmount} €
            </Button>
            <div className="bg-white sm:max-w-xl w-full -mx-6 mt-6 md:mt-10">
              <PackContent />
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @media (min-width: 768px) {
          .cover {
            background-image: url(/wintr-travel-home.jpg);
            background-position: center;
            background-repeat: no-repeat;
            background-attachment: fixed;
            background-size: cover;
            background-color: transparent;
          }
        }

        @media (min-height: 800px) {
          .cover {
            height: 100%;
          }
        }
      `}</style>
    </>
  )
}

export default Cart