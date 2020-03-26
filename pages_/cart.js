import { useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import Head from 'next/head'
import useTranslation from 'next-translate/useTranslation'

import LayoutCover from '../components/LayoutCover'
import CartSection from '../components/CartSection'
import CartItem from '../components/CartItem'
import Header from '../components/Header'
import Button from '../components/Button'

import { formatDate } from '../helpers/dates'

const Cart = () => {
  const router = useRouter()
  const { resort_id, resort_name, checkin, checkout, week_id, duration, adults, children, adults_amount, children_amount, total_amount } = router.query
  const booking = {
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
  const { t, lang } = useTranslation()

  useEffect(() => {
    if (!booking.isValid) {
      Router.push(`/${lang}`)
    }
  }, [])

  const validateCart = () => {
    console.log('Validate cart and redirect to Stripe checkout page')
  }

  const payButton = <Button
    name={t('common:button.pay')}
    disabled={!booking.isValid}
    onClick={validateCart}>
    {t('common:button.pay')} {booking.totalAmount} €
  </Button>

  return (
    <LayoutCover>
      <Head><title>{t('cart:title')} - Wintr Travel</title></Head>
      <div className="flex flex-col items-start md:items-center md:py-6 overflow-auto mb-20">
        <div className="bg-white md:rounded-lg md:shadow-xl p-6 md:p-8 w-full md:max-w-lg">
          <Header className="text-2xl sm:text-3xl">
            {t('cart:title')}
          </Header>
          <CartSection title={t('cart:location')}>
            <CartItem title={t('cart:resort')} value={booking.resortName} classes="my-3" />
            <CartItem title={t('cart:checkin')} value={formatDate(booking.firstDay, lang)} classes="my-3" />
            <CartItem title={t('cart:checkout')} value={formatDate(booking.lastDay, lang)} classes="my-3" />
          </CartSection>
          <CartSection title={t('cart:skiers')}>
            <CartItem title={`${t('common:pack.adult')} X ${booking.adultsCount}`} value={`${booking.adultsAmount} €`} classes="my-3" />
            {
              booking.childrenCount > 0 &&
              <CartItem title={`${t('common:pack.child')} X ${booking.childrenCount}`} value={`${booking.childrenAmount} €`} classes="my-3" />
            }
          </CartSection>
          <CartSection>
            <CartItem title="Total" value={`${booking.totalAmount} €`} />
          </CartSection>
          <section className="hidden md:block">
            {payButton}
          </section>
        </div>
      </div>
      <div className="fixed bottom-0 w-full p-4 border-t border-gray-600 z-10 bg-white md:hidden">
        {payButton}
      </div>
    </LayoutCover>
  )
}

export default Cart