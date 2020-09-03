import { useEffect, useState, useRef } from 'react';
import Router, { useRouter } from 'next/router';
import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';

import Layout from 'components/Layout/Layout';
import Hero from 'components/UI/Hero';
import BookingInfo from 'components/App/BookingInfo';
import BookingForm from 'components/App/BookingForm';
import Card from 'components/UI/Card';
import Header from 'components/UI/Header';
import Heading from 'components/UI/Heading';
import Separator from 'components/UI/Separator';
import Input from 'components/UI/Input';
import Button from 'components/UI/Button';
import Loader from 'components/UI/Loader';

import { formatDate } from 'helpers/dates';

const Cart = ({ catalog }) => {
  const _isMounted = useRef(true);
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const {
    resort_id,
    resort_name,
    checkin,
    checkout,
    week_id,
    duration,
    adults,
    children,
    adults_amount,
    children_amount,
    total_amount,
  } = router.query;
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
    isValid: resort_id && checkin && adults > 0,
  };
  const { t, lang } = useTranslation();

  const skiers = [];
  for (let i = 1; i <= booking.adultsCount; i++) {
    skiers.push({ label: `Adulte ${i}`, id: `adult-${i}` });
  }
  if (booking.childrenCount > 0) {
    for (let i = 1; i <= booking.childrenCount; i++) {
      skiers.push({ label: `Enfant ${i}`, id: `child-${skiers.length}` });
    }
  }

  useEffect(() => {
    return () => {
      _isMounted.current = false;
    };
  }, []);

  const editBooking = () => setIsEditing(true);
  const onBookingUpdate = () => setIsEditing(false);

  const validateCart = () => {
    setIsLoading(true);
    if (booking.isValid) {
      Router.push({
        pathname: `/${lang}/checkout`,
        query: {
          resort_id: booking.resortId,
          resort_name: booking.resortName,
          checkin: booking.firstDay,
          checkout: booking.lastDay,
          week_id: booking.weekId,
          duration: booking.duration,
          adults: booking.adultsCount,
          children: booking.childrenCount,
          adults_amount: booking.adultsAmount,
          children_amount: booking.childrenAmount,
          total_amount: booking.totalAmount,
        },
      }).then(() => {
        if (_isMounted.current) {
          setIsLoading(false);
        }
        window.scrollTo(0, 0);
      });
    }
  };

  return (
    <Layout>
      <Head>
        <title>{t('cart:title')} - Wintr Travel</title>
      </Head>
      <section className="bg-gray-200 flex justify-center items-center">
        <div className="max-w-screen-lg w-full py-2 md:py-6 main-section">
          <section>
            {isEditing ? (
              <BookingForm
                catalog={catalog}
                booking={booking}
                onUpdate={onBookingUpdate}
              />
            ) : (
              <Card classes="lg:px-0" subclasses="bg-gray-200 md:bg-white">
                <Header>
                  <Heading className="text-xl mb-2 md:mb-0">
                    Votre séjour
                  </Heading>
                  <button
                    name={t('common:button.edit')}
                    className="text-secondary-blue rounded text-sm sm:text-base font-bold tracking-wide focus:outline-none focus:shadow-outline transition duration-300 ease-in-out hover:opacity-75"
                    onClick={editBooking}
                  >
                    {t('common:button.edit')}
                  </button>
                </Header>
                <Separator className="hidden md:block my-6" />
                <ul className="text-sm md:text-base mt-2">
                  <li className="pb-2">
                    <span className="font-bold">{booking.resortName}</span> du{' '}
                    <span className="font-bold">
                      {formatDate(booking.firstDay, lang)}
                    </span>{' '}
                    au{' '}
                    <span className="font-bold">
                      {formatDate(booking.lastDay, lang)}
                    </span>
                    .
                  </li>
                  <li>
                    {booking.adultsCount}{' '}
                    <span className="font-bold">adultes</span> (
                    {booking.adultsAmount.toFixed(2)} €) et{' '}
                    {booking.childrenCount}{' '}
                    <span className="font-bold">enfants</span> (
                    {booking.childrenAmount.toFixed(2)} €).
                  </li>
                </ul>
              </Card>
            )}
          </section>
          <Separator className="md:hidden my-2" />
          <section>
            <Card classes="lg:px-0" subclasses="bg-gray-200 md:bg-white">
              <Heading className="text-xl">Mensurations des skieurs</Heading>
              <h3 className="py-2 text-sm md:text-base">
                Ces informations sont importantes pour vous fournir le matériel
                à votre taille.
              </h3>
              <p className="text-orange-600 mb-4 md:mb-0 text-sm md:text-base">
                Vous pouvez choisir de passer cette étape pour le moment.
              </p>
              <Separator className="hidden md:block my-6" />
              {skiers.map((skier, index) => (
                <article
                  key={skier.id}
                  className={`${index + 1 !== skiers.length && 'mb-4 md:mb-6'}`}
                >
                  <h4 className="font-semibold pb-2">{skier.label}</h4>
                  <div className="flex items-center">
                    <Input
                      type="number"
                      id={`size-${skier.id}`}
                      name={`size-${skier.id}`}
                      placeholder="Taille en cm"
                      className="w-full xs:w-1/2 max-w-xs"
                    />
                    <Input
                      type="number"
                      id={`shoe-size-${skier.id}`}
                      name={`shoe-size-${skier.id}`}
                      placeholder="Pointure"
                      className="w-full xs:w-1/2 ml-1 xs:ml-4 max-w-xs"
                    />
                  </div>
                </article>
              ))}
            </Card>
          </section>
          <Separator className="md:hidden my-2" />
          <section>
            <Card classes="lg:px-0" subclasses="bg-gray-200 md:bg-white">
              <Heading className="text-xl pb-2">
                Où souhaitez-vous être livré?
              </Heading>
              <p className="text-orange-600 text-sm md:text-base">
                Vous pouvez renseigner cette information ultérieurement.
              </p>
              <Separator className="hidden md:block my-6" />
              <Input
                type="number"
                id="delivery-address"
                name="delivery-address"
                className="my-4 md:my-0 w-full lg:w-1/2"
                placeholder="Saisissez votre adresse ici"
              />
            </Card>
          </section>
          <section className="flex justify-center items-center px-4 md:px-0 pb-6 md:py-6">
            {/* <Button
              classes="uppercase tracking-wide w-64 bg-gray-600 text-gray-100 hidden sm:block"
              name="back"
            >
              Retour
            </Button> */}
            <Button
              classes="uppercase tracking-wide w-full md:w-auto bg-secondary-blue text-white"
              name={t('common:button.pay')}
              disabled={!booking.isValid || loading}
              onClick={validateCart}
            >
              {loading ? (
                <Loader />
              ) : (
                `${t('common:button.pay')} ${booking.totalAmount.toFixed(2)} €`
              )}
            </Button>
          </section>
        </div>

        <style jsx>{`
          .main-section {
            min-height: calc(100vh - 128px);
          }
        `}</style>
      </section>
      {/* <Hero>
        {isEditing ? (
          <BookingForm
            catalog={catalog}
            booking={booking}
            onUpdate={onBookingUpdate}
          />
        ) : (
          <BookingInfo
            booking={booking}
            loading={loading}
            onValidate={validateCart}
            onEdit={editBooking}
          />
        )}
      </Hero> */}
    </Layout>
  );
};

export async function getStaticProps() {
  const response = await fetch('https://catalog.wintr.travel/v1/catalog.json');
  const catalog = await response.json();

  return {
    props: {
      catalog,
    },
  };
}

export default Cart;
