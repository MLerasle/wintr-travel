import { useReducer, useState, useRef, useEffect } from 'react';
import Router from 'next/router';
import useTranslation from 'next-translate/useTranslation';
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
  const { t, lang } = useTranslation();
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
        message: t('common:error.bookingPrice'),
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
      pathname: `/${lang}/cart`,
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
    <div className="cover background-image w-full flex-grow sm:py-10">
      <Card>
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
              <Heading className="md:block text-xl sm:text-3xl">
                {t('common:form.editTitle')}
              </Heading>
              <button
                name={t('common:button.cancel')}
                className="text-secondary-blue text-sm sm:text-base font-bold tracking-wide focus:outline-none focus:shadow-outline transition duration-300 ease-in-out hover:opacity-75"
                onClick={props.onUpdate}
              >
                {t('common:button.cancel')}
              </button>
            </>
          ) : (
            <Heading className="hidden md:block text-xl sm:text-3xl">
              {t('common:form.title')}
            </Heading>
          )}
        </Header>
        <Separator
          className={`my-6 ${!props.booking ? 'hidden' : ''} md:block`}
        />
        <form className="flex flex-col -mt-2 md:mt-4">
          <FormRow>
            <SelectInput
              options={props.catalog.resorts
                .sort((a, b) =>
                  a.name > b.name ? 1 : b.name > a.name ? -1 : 0
                )
                .map((r) => {
                  return { value: r.id, label: r.name };
                })}
              label={t('common:form.resortLabel')}
              placeholder={t('common:form.resortPlaceholder')}
              defaultValue={
                booking.resortId
                  ? { label: booking.resortName, value: booking.resortId }
                  : ''
              }
              handleChange={handleResortChange}
            />
          </FormRow>
          <FormRow>
            <DateRangeInput
              from={booking.firstDay}
              to={booking.lastDay}
              fromLabel={t('common:form.dateFromLabel')}
              toLabel={t('common:form.dateToLabel')}
              onChange={(type, date) => handleDateChange(type, date)}
              onChangeToDate={() => {
                if (booking.adultsCount === 0) {
                  document.getElementById('skiersInput').focus();
                }
              }}
              locale={lang}
              minDate={props.catalog.weeks[0].first_day}
              maxDate={
                props.catalog.weeks[props.catalog.weeks.length - 1].last_day
              }
            />
          </FormRow>
          <FormRow>
            <SkierDropdown
              childrenCount={booking.childrenCount}
              adultsCount={booking.adultsCount}
              onChange={(age, action) => handleSkierChange(age, action)}
            />
          </FormRow>
          <section
            className={`${props.booking ? 'mt-8 md:mt-4' : 'mt-2 md:mt-4'}`}
          >
            <Button
              type="submit"
              id="searchButton"
              name={t('common:button.validate')}
              disabled={!booking.isValid || loading}
              onClick={validateSearch}
            >
              {loading ? <Loader /> : t('common:button.validate')}
            </Button>
          </section>
        </form>
      </Card>
    </div>
  );
};

export default BookingForm;
