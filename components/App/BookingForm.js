import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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

import { getBookingPrices } from 'helpers/pricing';
import Loader from '@/UI/Loader';

const BookingForm = (props) => {
  const _isMounted = useRef(true);
  const booking = useSelector((state) => state);
  const dispatch = useDispatch();
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    return () => {
      _isMounted.current = false;
    };
  }, []);

  const handleResortChange = (resort, triggeredAction) => {
    if (triggeredAction.action === 'clear') {
      return dispatch({ type: 'SET_RESORT', resort: null });
    }
    dispatch({
      type: 'SET_RESORT',
      resort: resort.label,
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
          firstDay: date,
          lastDay,
        });
        document.querySelector('.InputDates-to input').focus();
      } else {
        dispatch({
          type: 'SET_DATES',
          firstDay,
          lastDay: date,
        });
      }
    } catch (error) {
      console.log('ERROR', error);
    }
  };

  const updateSkiers = (category, action, skiersArray) => {
    if (action === 'increment') {
      const label = category === 'adult' ? 'Adulte' : 'Enfant';
      const newSkier = {
        label: `${label} ${skiersArray.length + 1}`,
        size: null,
        shoeSize: null,
        headSize: null,
      };
      skiersArray.push(newSkier);
    } else {
      skiersArray.pop();
    }
  };

  const handleSkierChange = (action, category = null) => {
    if (action === 'reset') {
      return dispatch({ type: 'SET_SKIERS', adults: [], children: [] });
    }
    const adults = [...booking.adults] || [];
    const children = [...booking.children] || [];
    const skiersToUpdate = category === 'adult' ? adults : children;
    updateSkiers(category, action, skiersToUpdate);
    dispatch({ type: 'SET_SKIERS', adults, children });
  };

  const validateSearch = (e) => {
    e.preventDefault();
    if (!booking.isValid) {
      return;
    }
    setIsLoading(true);

    const { duration, adults, children } = booking;
    const bookingPrice = getBookingPrices(
      duration,
      adults.length,
      children.length
    );
    if (bookingPrice.error) {
      setError({
        error: bookingPrice.message,
        message:
          'Nous ne pouvons malheureusement pas vous livrer à ces dates dans cette station. Veuillez modifier votre recherche.',
      });
      setIsLoading(false);
      return;
    }
    dispatch({
      type: 'SET_AMOUNT',
      adultsPrice: bookingPrice.adults,
      childrenPrice: bookingPrice.children,
      totalPrice: bookingPrice.total,
    });
    Router.push('/booking/details')
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
        props.isEditing ? 'bg-gray-200 md:bg-white' : 'md:max-w-lg bg-white'
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
        {props.isEditing ? (
          <Heading className="text-xl mb-2 md:mb-0">
            Modifier votre séjour
          </Heading>
        ) : (
          <Heading className="hidden md:block text-xl sm:text-3xl">
            Réservez vos skis et votre forfait.
          </Heading>
        )}
      </Header>
      <Separator className="my-6 hidden md:block" />
      <form className={`${props.isEditing && 'mt-2'} md:mt-4`}>
        <section className={`${props.isEditing && 'md:flex md:items-center'}`}>
          <FormRow className={`${props.isEditing && 'md:w-1/3'}`}>
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
                booking.resort
                  ? { label: booking.resort, value: booking.resort }
                  : ''
              }
              handleChange={handleResortChange}
            />
          </FormRow>
          <FormRow className={`${props.isEditing && 'md:w-1/3 md:mx-2'}`}>
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
          <FormRow className={`${props.isEditing && 'md:w-1/3'}`}>
            <SkierDropdown
              childrenCount={booking.children.length}
              adultsCount={booking.adults.length}
              onChange={(age, action) => handleSkierChange(age, action)}
            />
          </FormRow>
        </section>
        <section className={`mt-8 ${props.isEditing && 'md:mt-4'}`}>
          <Button
            type="submit"
            classes={`w-full uppercase tracking-wide bg-secondary-blue text-white ${
              props.isEditing && 'md:w-64'
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
