import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import Head from 'next/head';

import Layout from 'components/Layout/Layout';
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
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const booking = useSelector((state) => state);
  const dispatch = useDispatch();

  const skiers = [...booking.adults, ...booking.children];

  useEffect(() => {
    return () => {
      _isMounted.current = false;
    };
  }, []);

  const editBooking = () => setIsEditing(true);
  const onBookingUpdate = () => setIsEditing(false);

  const updateSkier = (skier, attribute, event) => {
    let skiers;
    if (skier.label.startsWith('Adulte')) {
      skiers = [...booking.adults];
    } else {
      skiers = [...booking.children];
    }
    const person = skiers.find((s) => s.label === skier.label);
    person[attribute] = +event.target.value;

    if (skier.label.startsWith('Adulte')) {
      dispatch({
        type: 'SET_SKIERS',
        adults: skiers,
        children: [...booking.children],
      });
    } else {
      dispatch({
        type: 'SET_SKIERS',
        adults: [...booking.adults],
        children: skiers,
      });
    }
  };

  const onAddressUpdate = (event) => {
    dispatch({
      type: 'SET_DELIVERY_ADDRESS',
      deliveryAddress: event.target.value,
    });
  };

  const validateCart = () => {
    setIsLoading(true);
    if (booking.isValid) {
      Router.push('/checkout').then(() => {
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
        <title>Votre réservation - Wintr Travel</title>
      </Head>
      <section className="bg-gray-200 flex justify-center items-center">
        <div className="max-w-screen-lg w-full py-2 md:py-6 main-section">
          <section>
            {isEditing ? (
              <BookingForm
                catalog={catalog}
                booking={booking}
                isEditing
                onUpdate={onBookingUpdate}
              />
            ) : (
              <Card classes="lg:px-0" subclasses="bg-gray-200 md:bg-white">
                <Header>
                  <Heading className="text-xl mb-2 md:mb-0">
                    Votre séjour
                  </Heading>
                  <button
                    name="edit"
                    className="text-secondary-blue rounded text-sm sm:text-base font-bold tracking-wide focus:outline-none focus:shadow-outline transition duration-300 ease-in-out hover:opacity-75"
                    onClick={editBooking}
                  >
                    Modifier
                  </button>
                </Header>
                <Separator className="hidden md:block my-6" />
                <ul className="text-sm md:text-base mt-2">
                  <li className="pb-2">
                    <span className="font-bold">{booking.resort}</span> du{' '}
                    <span className="font-bold">
                      {formatDate(booking.firstDay)}
                    </span>{' '}
                    au{' '}
                    <span className="font-bold">
                      {formatDate(booking.lastDay)}
                    </span>
                    .
                  </li>
                  <li>
                    {booking.adults.length}{' '}
                    <span className="font-bold">adultes</span> (
                    {booking.adultsPrice.toFixed(2)} €) et{' '}
                    {booking.children.length}{' '}
                    <span className="font-bold">enfants</span> (
                    {booking.childrenPrice.toFixed(2)} €).
                  </li>
                </ul>
              </Card>
            )}
          </section>
          {!isEditing && (
            <>
              <Separator className="md:hidden my-2" />
              <section>
                <Card classes="lg:px-0" subclasses="bg-gray-200 md:bg-white">
                  <Heading className="text-xl">
                    Mensurations des skieurs
                  </Heading>
                  <h3 className="py-2 text-sm md:text-base">
                    Ces informations sont importantes pour vous fournir le
                    matériel à votre taille.
                  </h3>
                  <p className="text-orange-600 mb-4 md:mb-0 text-sm md:text-base">
                    Vous pouvez choisir de passer cette étape pour le moment.
                  </p>
                  <Separator className="hidden md:block my-6" />
                  {skiers.map((skier, index) => (
                    <article
                      key={skier.label}
                      className={`${
                        index + 1 !== skiers.length && 'mb-4 md:mb-6'
                      }`}
                    >
                      <h4 className="font-semibold pb-2">{skier.label}</h4>
                      <div className="flex items-center">
                        <Input
                          type="number"
                          id={`size-${skier.label}`}
                          name={`size-${skier.label}`}
                          placeholder="Taille en cm"
                          className="w-full xs:w-1/2 max-w-xs"
                          onChange={(event) =>
                            updateSkier(skier, 'size', event)
                          }
                          value={skier.size}
                        />
                        <Input
                          type="number"
                          id={`shoe-size-${skier.label}`}
                          name={`shoe-size-${skier.label}`}
                          placeholder="Pointure"
                          className="w-full xs:w-1/2 ml-1 xs:ml-4 max-w-xs"
                          onChange={(event) =>
                            updateSkier(skier, 'shoeSize', event)
                          }
                          value={skier.shoeSize}
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
                    type="text"
                    id="delivery-address"
                    name="delivery-address"
                    className="my-4 md:my-0 w-full lg:w-1/2"
                    placeholder="Saisissez votre adresse ici"
                    onChange={(event) => onAddressUpdate(event)}
                    value={booking.deliveryAddress}
                  />
                </Card>
              </section>
              <section className="flex justify-center items-center px-4 md:px-0 pb-6 md:py-6">
                <Button
                  classes="uppercase tracking-wide w-full md:w-auto bg-secondary-blue text-white"
                  name="pay"
                  disabled={!booking.isValid || loading}
                  onClick={validateCart}
                >
                  {loading ? (
                    <Loader />
                  ) : (
                    `Payer ${booking.totalPrice.toFixed(2)} €`
                  )}
                </Button>
              </section>
            </>
          )}
        </div>

        <style jsx>{`
          .main-section {
            min-height: calc(100vh - 128px);
          }
        `}</style>
      </section>
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
