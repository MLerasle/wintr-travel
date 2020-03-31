import useTranslation from 'next-translate/useTranslation'

import Card from './Card'
import CartSection from './CartSection'
import CartItem from './CartItem'
import Header from './Header'
import Button from './Button'

import { formatDate } from '../helpers/dates'

const BookingInfo = ({ booking, onValidate, onEdit }) => {
  const { t, lang } = useTranslation()

  const payButton = <Button
    name={t('common:button.pay')}
    disabled={!booking.isValid}
    onClick={onValidate}>
    {t('common:button.pay')} {booking.totalAmount.toFixed(2)} €
  </Button>

  return (
    <>
      <Card classes="overflow-auto mb-20">
        <header className="flex justify-between items-center">
          <Header className="text-2xl sm:text-3xl">
            {t('cart:title')}
          </Header>
          <button
            name={t('common:button.edit')}
            className="text-secondary-blue font-semibold tracking-wide hover:underline focus:outline-none focus:shadow-outline"
            onClick={onEdit}>
            {t('common:button.edit')}
          </button>
        </header>
        <CartSection title={t('cart:location')}>
          <CartItem title={t('cart:resort')} value={booking.resortName} classes="my-3" />
          <CartItem title={t('cart:checkin')} value={formatDate(booking.firstDay, lang)} classes="my-3" />
          <CartItem title={t('cart:checkout')} value={formatDate(booking.lastDay, lang)} classes="my-3" />
        </CartSection>
        <CartSection title={t('cart:skiers')}>
          <CartItem title={`${t('common:pack.adult')} X ${booking.adultsCount}`} value={`${booking.adultsAmount.toFixed(2)} €`} classes="my-3" />
          {
            booking.childrenCount > 0 &&
            <CartItem title={`${t('common:pack.child')} X ${booking.childrenCount}`} value={`${booking.childrenAmount.toFixed(2)} €`} classes="my-3" />
          }
        </CartSection>
        <CartSection>
          <CartItem title="Total" value={`${booking.totalAmount.toFixed(2)} €`} />
        </CartSection>
        <section className="hidden md:block">
          {payButton}
        </section>
      </Card>
      <div className="fixed bottom-0 w-full p-4 border-t border-gray-300 z-10 bg-white md:hidden">
        {payButton}
      </div>
    </>
  )
}

export default BookingInfo