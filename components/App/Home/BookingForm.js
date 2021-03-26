import { useState, useContext } from 'react';
import { useRouter } from 'next/router';

import Card from '@/UI/Card';
import FormRow from '@/UI/FormRow';
import Header from '@/UI/Header';
import Heading from '@/UI/Heading';
import Button from '@/UI/Button';
import Separator from '@/UI/Separator';
import Label from '@/UI/Label';
import RadioButtons from '@/UI/RadioButtons';
import Alert from '@/UI/Alert';
import Loader from '@/UI/Loader';

import BookingContext from 'context/booking-context';
import * as gtag from 'lib/gtag';
import { formatDateLong } from 'helpers/dates';
import { isValid, getLastDay } from 'helpers/booking';
import { FEBRUARY_DATES } from 'data/booking';

const BookingForm = ({ isEditing, onUpdate }) => {
  const booking = useContext(BookingContext);
  const router = useRouter();
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleArrivalDate = (event) => {
    setError(null);
    const date = event.target.value;
    booking.update('firstDay', date);
  };

  const handleSkierChange = (category, event) => {
    setError(null);
    const label = category === 'adults' ? 'Adulte' : 'Enfant';
    const number = +event.target.value;
    const skiersArray = [];
    for (let i = 0; i < number; i++) {
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
    <Card
      classes="md:py-6"
      subclasses={`p-4 md:p-8 ${
        isEditing ? 'bg-gray-100 md:bg-white' : 'md:max-w-3xl bg-white'
      }`}
    >
      {error && (
        <div className="mb-4 md:mb-8">
          <Alert
            type="error"
            message={error.message}
            onClearMessage={() => setError(null)}
          />
        </div>
      )}
      <Header>
        {isEditing ? (
          <Heading className="text-xl mb-2 md:mb-0">
            Modifier votre séjour
          </Heading>
        ) : (
          <Heading className="hidden md:block text-xl sm:text-3xl">
            Vos skis livrés à Flaine pour une semaine.
          </Heading>
        )}
      </Header>
      <Separator className="my-6 hidden md:block" />
      <form className="md:mt-4">
        <section>
          <h3 className="text-lg md:text-xl leading-tight font-bold text-gray-800 mt-2 mb-2">
            Quand souhaitez-vous être livré?
          </h3>
          <FormRow className="w-full md:flex">
            <div className="flex-grow mt-2 md:mt-0">
              <Label for="name">Février 2022</Label>
              <RadioButtons
                items={FEBRUARY_DATES}
                onChange={handleArrivalDate}
                name="arrival"
                selected={booking.firstDay}
                withDateFormatting
              />
            </div>
          </FormRow>
          {booking.firstDay && (
            <p className="text-primary-blue mb-4 md:mb-0">
              Nous récupérons le matériel le{' '}
              <span className="font-semibold">
                {formatDateLong(getLastDay(booking.firstDay))}
              </span>
              .
            </p>
          )}
          <h3 className="text-lg md:text-xl leading-tight font-bold text-gray-800 mt-8 mb-2">
            Pour combien de personnes?
          </h3>
          <FormRow className="w-full md:flex">
            <div className="flex-grow md:mr-2">
              <Label for="name">Adultes</Label>
              <RadioButtons
                items={[1, 2, 3, 4]}
                name="adults"
                selected={booking.adults.length}
                onChange={(event) => handleSkierChange('adults', event)}
              />
            </div>
            <div className="flex-grow mt-2 md:mt-0 md:ml-2">
              <Label for="name">Enfants</Label>
              <RadioButtons
                items={[0, 1, 2, 3, 4]}
                name="children"
                selected={booking.children.length}
                onChange={(event) => handleSkierChange('children', event)}
              />
            </div>
          </FormRow>
        </section>
        <section className="mt-8 md:mt-10">
          <Button
            type="submit"
            id="searchButton"
            classes={`w-full uppercase tracking-wide bg-primary-green text-white ${
              isEditing && 'md:w-64'
            }`}
            name="validate"
            disabled={loading}
            onClick={validateSearch}
          >
            {loading ? <Loader /> : isEditing ? 'Valider' : 'Suivant'}
          </Button>
        </section>
      </form>
    </Card>
  );
};

export default BookingForm;
