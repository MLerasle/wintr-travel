import { useState } from 'react';
import Router from 'next/router';
import useTranslation from 'next-translate/useTranslation';

import CartSection from '@/App/CartSection';
import CartItem from '@/App/CartItem';
import PackContent from '@/App/PackContent';
import Card from '@/UI/Card';
import Header from '@/UI/Header';
import Heading from '@/UI/Heading';
import Button from '@/UI/Button';
import Separator from '@/UI/Separator';
import Loader from '@/UI/Loader';
import BottomDrawer from '@/UI/BottomDrawer';

import { formatDate } from 'helpers/dates';

const BookingInfo = ({ booking, loading, onValidate, onEdit }) => {
  const { t, lang } = useTranslation();
  const [showPackInfos, setShowPackInfos] = useState(false);

  const onInfoSkierDisplay = () => {
    if (document.documentElement.clientWidth > 640) setShowPackInfos(true);
  };
  const onInfoSkierHide = () => setShowPackInfos(false);
  const onInfoSkierToggleDisplay = () => setShowPackInfos(!showPackInfos);

  const onBack = () => {
    Router.push('/');
  };

  return (
    <>
      <Card classes="overflow-auto pb-24">
        <Header>
          <Heading className="text-xl sm:text-3xl">{t('cart:title')}</Heading>
          {booking.isValid && (
            <button
              name={t('common:button.edit')}
              className="text-secondary-blue text-sm sm:text-base font-bold tracking-wide focus:outline-none focus:shadow-outline transition duration-300 ease-in-out hover:opacity-75"
              onClick={onEdit}
            >
              {t('common:button.edit')}
            </button>
          )}
        </Header>
        <Separator className="my-6" />
        {!booking.isValid ? (
          <>
            <h3 className="text-lg sm:text-xl my-2">
              {t('cart:invalidBooking.title')}
            </h3>
            <p>{t('cart:invalidBooking.description')}</p>
          </>
        ) : (
          <>
            <CartSection title={t('cart:location')}>
              <CartItem
                title={t('cart:resort')}
                value={booking.resortName}
                classes="my-3"
              />
              <CartItem
                title={t('cart:checkin')}
                value={formatDate(booking.firstDay, lang)}
                classes="my-3"
              />
              <CartItem
                title={t('cart:checkout')}
                value={formatDate(booking.lastDay, lang)}
                classes="my-3"
              />
            </CartSection>
            <Separator className="my-6" />
            <CartSection
              title={t('cart:skiers')}
              icon
              onIconClicked={onInfoSkierToggleDisplay}
              onIconMouseEnter={onInfoSkierDisplay}
              onIconMouseLeave={onInfoSkierHide}
            >
              <BottomDrawer open={showPackInfos} closed={onInfoSkierHide} />
              <div className="relative hidden sm:block">
                <PackContent
                  className={`${
                    showPackInfos ? 'block' : 'hidden'
                  } absolute z-50 top-1/2`}
                />
              </div>
              <CartItem
                title={`${t('common:pack.adult')} x ${booking.adultsCount}`}
                value={`${booking.adultsAmount.toFixed(2)} €`}
                classes="my-3"
              />
              {booking.childrenCount > 0 && (
                <CartItem
                  title={`${t('common:pack.child')} x ${booking.childrenCount}`}
                  value={`${booking.childrenAmount.toFixed(2)} €`}
                  classes="my-3"
                />
              )}
            </CartSection>
            <Separator className="my-6" />
            <CartSection>
              <CartItem
                title="Total"
                value={`${booking.totalAmount.toFixed(2)} €`}
              />
            </CartSection>
          </>
        )}
        <section className="fixed bottom-0 w-full p-4 border-t border-gray-300 z-10 bg-white -mx-4 md:static md:m-0 md:p-0 md:border-none md:mt-6">
          {!booking.isValid ? (
            <Button name="back" onClick={onBack}>
              {t('cart:newSearch')}
            </Button>
          ) : (
            <Button
              name={t('common:button.pay')}
              disabled={!booking.isValid || loading}
              onClick={onValidate}
            >
              {loading ? (
                <Loader />
              ) : (
                `${t('common:button.pay')} ${booking.totalAmount.toFixed(2)} €`
              )}
            </Button>
          )}
        </section>
      </Card>
    </>
  );
};

export default BookingInfo;
