import { useReducer, useState, useRef, useEffect } from 'react';
import Router from 'next/router';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';

import SkierDropdown from '@/App/SkierDropdown';
import Card from '@/UI/Card';
import FormRow from '@/UI/FormRow';
import SelectInput from '@/UI/SelectInput';
import DateRangeInput from '@/UI/DateRangeInput';
import Header from '@/UI/Header';
import Heading from '@/UI/Heading';
import Button from '@/UI/Button';
import Separator from '@/UI/Separator';

import { calcBookingPrice } from 'helpers/pricing';
import { INITIAL_BOOKING } from 'store/state';
import { reducer } from 'store/reducer';
import { updateSkiersNumber } from 'store/action';
import Loader from '@/UI/Loader';

const BookingForm = (props) => {
  const _isMounted = useRef(true);
  const [booking, dispatch] = useReducer(
    reducer,
    props.booking || INITIAL_BOOKING
  );
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    return () => {
      _isMounted.current = false;
    };
  }, []);

  const handleResortChange = (resort, triggeredAction) => {
    if (triggeredAction.action === 'clear') {
      return dispatch({ type: 'SET_RESORT', resortId: null, resortName: null });
    }
    dispatch({
      type: 'SET_RESORT',
      resortId: resort.value,
      resortName: resort.label,
    });
    if (!booking.firstDay) {
      document.querySelector('.InputDates-from input').focus();
    }
  };

  const handleDateChange = (type, date) => {
    const { firstDay, lastDay } = booking;
    try {
      if (type === 'from') {
        dispatch({
          type: 'SET_DATES',
          catalog: props.catalog,
          firstDay: date,
          lastDay,
        });
      } else {
        dispatch({
          type: 'SET_DATES',
          catalog: props.catalog,
          firstDay,
          lastDay: date,
        });
      }
    } catch (error) {
      console.log('ERROR', error);
    }
  };

  const handleSkierChange = (action, age = null) => {
    const { adultsCount, childrenCount } = updateSkiersNumber(
      booking,
      action,
      age
    );
    dispatch({ type: 'SET_PEOPLE', adultsCount, childrenCount });
  };

  const validateSearch = (e) => {
    e.preventDefault();
    if (!booking.isValid) {
      return;
    }
    setIsLoading(true);
    const {
      resortId,
      resortName,
      firstDay,
      lastDay,
      weekId,
      duration,
      adultsCount,
      childrenCount,
    } = booking;
    const bookingPrice = calcBookingPrice(
      props.catalog,
      resortId,
      weekId,
      duration,
      adultsCount,
      childrenCount
    );
    if (bookingPrice.error) {
      setError({
        error: bookingPrice.message,
        message:
          "Nous n'avons malheureusement pas de matériel à vous proposer à ces dates dans cette station. Veuillez modifier votre recherche.",
      });
      setIsLoading(false);
      return;
    }
    dispatch({
      type: 'SET_AMOUNT',
      adultsAmount: bookingPrice.adults,
      childrenAmount: bookingPrice.children,
      totalAmount: bookingPrice.total,
    });
    Router.push({
      pathname: `/cart`,
      query: {
        resort_id: resortId,
        resort_name: resortName,
        checkin: firstDay,
        checkout: lastDay,
        week_id: weekId,
        duration: duration,
        adults: adultsCount,
        children: childrenCount,
        adults_amount: bookingPrice.adults,
        children_amount: bookingPrice.children,
        total_amount: bookingPrice.total,
      },
    })
      .then(() => {
        if (_isMounted.current) {
          setIsLoading(false);
          setError(null);
        }
        props.onUpdate && props.onUpdate();
        window.scrollTo(0, 0);
      })
      .catch((error) => {
        console.log('ERROR pushing new route', error);
      });
  };

  return (
    <Card
      subclasses={`${
        props.booking ? 'bg-gray-200 md:bg-white' : 'md:max-w-lg bg-white'
      }`}
    >
      {error && (
        <div className="relative mb-4 p-4 border border-red-600 rounded bg-red-100 text-red-600">
          <Icon
            path={mdiClose}
            size={0.9}
            className="absolute top-1/4 right-1/4 cursor-pointer"
            color="#E53E3E"
            onClick={() => setError(null)}
          />
          {error.message}
        </div>
      )}
      <Header>
        {props.booking ? (
          <>
            <Heading className="text-xl mb-2 md:mb-0">
              Modifier votre séjour
            </Heading>
            <button
              name="cancel"
              className="text-secondary-blue text-sm sm:text-base font-bold tracking-wide focus:outline-none focus:shadow-outline transition duration-300 ease-in-out hover:opacity-75"
              onClick={props.onUpdate}
            >
              Annuler
            </button>
          </>
        ) : (
          <Heading className="hidden md:block text-xl sm:text-3xl">
            Réservez vos skis et votre forfait.
          </Heading>
        )}
      </Header>
      <Separator className="my-6 hidden md:block" />
      <form className={`${props.booking && 'mt-2'} md:mt-4`}>
        <section className={`${props.booking && 'md:flex md:items-center'}`}>
          <FormRow className={`${props.booking && 'md:w-1/3'}`}>
            <SelectInput
              options={props.catalog.resorts
                .sort((a, b) =>
                  a.name > b.name ? 1 : b.name > a.name ? -1 : 0
                )
                .map((r) => {
                  return { value: r.id, label: r.name };
                })}
              label="Où"
              placeholder="Choisissez la station"
              defaultValue={
                booking.resortId
                  ? { label: booking.resortName, value: booking.resortId }
                  : ''
              }
              handleChange={handleResortChange}
            />
          </FormRow>
          <FormRow className={`${props.booking && 'md:w-1/3 md:mx-2'}`}>
            <DateRangeInput
              from={booking.firstDay}
              to={booking.lastDay}
              fromLabel="Arrivée"
              toLabel="Départ"
              onChange={(type, date) => handleDateChange(type, date)}
              onChangeToDate={() => {
                if (booking.adultsCount === 0) {
                  document.getElementById('skiersInput').focus();
                }
              }}
              locale="fr"
              minDate={props.catalog.weeks[0].first_day}
              maxDate={
                props.catalog.weeks[props.catalog.weeks.length - 1].last_day
              }
            />
          </FormRow>
          <FormRow className={`${props.booking && 'md:w-1/3'}`}>
            <SkierDropdown
              childrenCount={booking.childrenCount}
              adultsCount={booking.adultsCount}
              onChange={(age, action) => handleSkierChange(age, action)}
            />
          </FormRow>
        </section>
        <section className={`mt-8 ${props.booking && 'md:mt-4'}`}>
          <Button
            type="submit"
            classes={`w-full uppercase tracking-wide bg-secondary-blue text-white ${
              props.booking && 'md:w-auto'
            }`}
            name="validate"
            disabled={!booking.isValid || loading}
            onClick={validateSearch}
          >
            {loading ? <Loader /> : 'Valider'}
          </Button>
        </section>
      </form>
    </Card>
  );
};

export default BookingForm;
