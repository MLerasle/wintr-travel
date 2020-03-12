import Router from 'next/router'
import Head from 'next/head'
import useTranslation from 'next-translate/useTranslation'
import Icon from '@mdi/react'
import { mdiClose } from '@mdi/js'

import Layout from '../components/Layout'

const PaymentDeclined = () => {
  const { t, lang } = useTranslation()

  const backToCart = () => {
    Router.push(`/${lang}/cart`)
  }

  return (
    <Layout>
      <Head>
        <title>{t('confirmation:title')} - Wintr Travel</title>
      </Head>
      <div className="bg-gray-100 flex justify-center items-center w-full">
        <div className="flex flex-col justify-between items-center px-4 py-8 sm:p-10 bg-white md:rounded-lg md:shadow-xl w-full sm:max-w-3xl text-center h-full md:h-auto">
          <div className="flex flex-col items-center">
            <Icon path={mdiClose} size={4} color="#E84B43" />
            <h1 className="mb-8 text-2xl sm:text-3xl leading-tight font-semibold text-gray-800">{t('payment-declined:title')}</h1>
          </div>
          <div>
            <p className="my-8 md:my-0 md:mb-2 text-gray-700">{t('payment-declined:infos1')}</p>
            <p className="my-8 md:my-0 md:mb-2 text-gray-700">{t('payment-declined:infos2')}</p>
          </div>
          <a href="/" onClick={backToCart} className="bg-secondary-blue text-white font-bold py-3 px-4 mt-8 w-32 rounded-lg shadow-md focus:outline-none focus:shadow-outline hover:opacity-90">
            {t('common:button.retry')}
          </a>
        </div>
      </div>
    </Layout>
  )
}

export default PaymentDeclined