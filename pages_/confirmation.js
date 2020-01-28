import React from 'react'
import { useDispatch } from 'react-redux'
import Router from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import Icon from '@mdi/react'
import { mdiCheck } from '@mdi/js'

import BookingActions from '../stores/Booking/Actions'
import Layout from '../components/Layout'

const Confirmation = () => {
  const dispatch = useDispatch()
  const { t, lang } = useTranslation()

  const resetBooking = () => {
    dispatch(BookingActions.resetBooking())
    Router.push(`/${lang}`)
  }

  return (
    <Layout>
      <div className="bg-gray-100 flex justify-center items-center w-full">
        <div className="flex flex-col justify-between items-center px-4 py-8 sm:p-10 bg-white md:rounded-lg md:shadow-xl w-full sm:max-w-3xl text-center h-full md:h-auto">
          <div className="flex flex-col items-center">
            <Icon path={mdiCheck} size={4} color="#0CB3FA" />
            <h1 className="mb-8 text-2xl sm:text-3xl leading-tight font-semibold text-gray-800">{t('confirmation:title')}</h1>
          </div>
          <div>
            <p className="my-8 md:my-0 md:mb-2 text-gray-700">{t('confirmation:infos1')}</p>
            <p className="my-8 md:my-0 md:mb-2 text-gray-700">{t('confirmation:infos2')}</p>
            <p className="my-8 md:my-0 md:mb-2 text-gray-800 font-semibold">{t('confirmation:infos3')}</p>
          </div>
          <a href="/" onClick={resetBooking} className="bg-secondary-blue text-white font-bold py-3 px-4 mt-8 w-32 rounded-lg shadow-md focus:outline-none focus:shadow-outline hover:opacity-90">
            {t('common:button.ok')}
          </a>
        </div>
      </div>
    </Layout>
  )
}

export default Confirmation