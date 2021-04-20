import { useState, useContext } from 'react';
import { useRouter } from 'next/router';

import FormRow from '@/UI/FormRow';
import Button from '@/UI/Button';
import Alert from '@/UI/Alert';
import Loader from '@/UI/Loader';
import RadioButtons from '@/UI/RadioButtons';

import BookingContext from 'context/booking-context';
import * as gtag from 'lib/gtag';
import { formatDateLong } from 'helpers/dates';
import { isValid, getLastDay } from 'helpers/booking';
import { HOLIDAYS } from 'data/booking';

const BookingForm = ({ isEditing, onUpdate }) => {
  const booking = useContext(BookingContext);
  const router = useRouter();
  const [currentHolidayTab, setCurrentHolidayTab] = useState('Noël');
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleArrivalDate = (date) => {
    setError(null);
    booking.update('firstDay', date);
  };

  const handleSkierChange = (category, quantity) => {
    setError(null);
    const label = category === 'adults' ? 'Adulte' : 'Enfant';
    const skiersArray = [];
    for (let i = 0; i < quantity; i++) {
      const newSkier = {
        label: `${label} ${i + 1}`,
        size: '',
        shoeSize: '',
        headSize: '',
      };
      skiersArray.push(newSkier);
    }
    booking.update(category, skiersArray);
  };

  const validateSearch = (e) => {
    e.preventDefault();
    if (!isValid(booking)) {
      gtag.event({
        action: 'submit_home_form',
        category: 'Booking',
        label: 'Form is not valid',
      });
      setError({
        message:
          'Veuillez sélectionner une date de livraison et au moins un adulte avant de poursuivre.',
      });
      return;
    }
    setIsLoading(true);

    gtag.event({
      action: 'submit_home_form',
      category: 'Booking',
      label: 'Submission OK',
    });

    router
      .push('/booking/details')
      .then(() => {
        setIsLoading(false);
        setError(null);
        onUpdate && onUpdate();
      })
      .catch((error) => {
        console.log('ERROR pushing new route', error);
      });
  };

  return (
    <>
      {error && (
        <div className="mb-4 md:mb-8">
          <Alert
            type="error"
            message={error.message}
            onClearMessage={() => setError(null)}
          />
        </div>
      )}
      <form>
        <section>
          <h3 className="text-lg leading-6 font-semibold text-gray-800 mb-2">
            Quand souhaitez-vous être livré?
          </h3>

          <div className="border-b border-gray-100">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {HOLIDAYS.map((holiday) => (
                <a
                  href="#"
                  key={holiday.name}
                  className={`whitespace-nowrap py-2 px-1 border-b-2 font-semibold text-base ${
                    holiday.name === currentHolidayTab
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-800 hover:text-gray-900 hover:border-gray-200'
                  }`}
                  onClick={() => setCurrentHolidayTab(holiday.name)}
                >
                  {holiday.name}
                </a>
              ))}
            </nav>
          </div>

          {HOLIDAYS.map((holiday) => {
            if (holiday.name === currentHolidayTab) {
              return (
                <FormRow key={holiday.name} className="mt-2">
                  <RadioButtons
                    value={booking.firstDay}
                    onChange={handleArrivalDate}
                    options={holiday.dates}
                    isDate
                  />
                </FormRow>
              );
            } else {
              return null;
            }
          })}

          <div>
            {booking.firstDay && (
              <div className="text-primary-blue text-sm mb-4 md:mb-0">
                Nous récupérons le matériel le{' '}
                <span className="font-semibold">
                  {formatDateLong(getLastDay(booking.firstDay))}
                </span>
                .
              </div>
            )}
          </div>
          <h3 className="text-lg leading-6 font-semibold text-gray-800 mt-8 mb-2">
            Pour combien de personnes?
          </h3>
          <FormRow>
            <RadioButtons
              value={booking.adults.length}
              onChange={(quantity) => handleSkierChange('adults', quantity)}
              options={[1, 2, 3, 4]}
              label="Adultes"
            />
            <RadioButtons
              value={booking.children.length}
              onChange={(quantity) => handleSkierChange('children', quantity)}
              options={[0, 1, 2, 3, 4]}
              label="Enfants"
              className="mt-2"
            />
          </FormRow>
        </section>
        {!isEditing && (
          <section className="mt-8 md:mt-10">
            <Button
              type="submit"
              id="searchButton"
              classes="w-full uppercase tracking-wide bg-primary-green text-white"
              name="validate"
              disabled={loading}
              onClick={validateSearch}
            >
              {loading ? <Loader /> : 'Suivant'}
            </Button>
          </section>
        )}
      </form>
    </>
  );
};

export default BookingForm;
