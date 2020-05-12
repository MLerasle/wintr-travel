import { useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'
import Head from 'next/head'
import useTranslation from 'next-translate/useTranslation'

import LayoutCover from 'components/Layout/LayoutCover'
import BookingInfo from 'components/App/BookingInfo'
import BookingForm from 'components/App/BookingForm'

const Cart = ({ catalog }) => {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
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

  const editBooking = () => setIsEditing(true)
  const onBookingUpdate = () => setIsEditing(false)

  const validateCart = () => {
    console.log('Validate cart and redirect to Stripe checkout page')
  }

  return (
    <LayoutCover>
      <Head><title>{t('cart:title')} - Wintr Travel</title></Head>
      {
        isEditing
        ? <BookingForm catalog={catalog} booking={booking} onUpdate={onBookingUpdate} />
        : <BookingInfo booking={booking} onValidate={validateCart} onEdit={editBooking} />
      }
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