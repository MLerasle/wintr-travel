import { useContext } from 'react';

import BookingSummaryLine from '@/App/Checkout/BookingSummaryLine';
import BookingSummaryLineSkier from '@/App/Checkout/BookingSummaryLineSkier';
import Heading from '@/UI/Heading';
import Separator from '@/UI/Separator';

import BookingContext from 'context/booking-context';
import { formatDate } from 'helpers/dates';
import { getPrices, getLastDay } from 'helpers/booking';
import { UNIT_ADULT_PRICE, UNIT_CHILD_PRICE } from 'data/booking';

const BookingSummary = () => {
  const booking = useContext(BookingContext);
  const prices = getPrices(booking.adults.length, booking.children.length);

  return (
    <div className="max-w-md lg:max-w-lg mx-auto xl:mx-0 md:bg-white md:p-6 md:mt-4 xl:mt-0 lg:w-1/2 text-gray-800">
      <Separator className="my-6 md:hidden" />
      <Heading className="text-xl mb-4">Votre réservation</Heading>
      <p>
        Un email de confirmation sera envoyée à{' '}
        <span className="font-bold">{booking.email}</span> juste après le
        paiement.
      </p>
      <Separator className="my-6" />
      <BookingSummaryLine label="Station" value="Praz sur Arly" />
      <BookingSummaryLine
        label="Arrivée"
        value={formatDate(booking.firstDay)}
      />
      <BookingSummaryLine
        label="Départ"
        value={formatDate(getLastDay(booking.firstDay))}
      />
      <Separator className="my-6" />
      {booking.adults.map((skier) => (
        <div key={skier.label}>
          <BookingSummaryLine
            label={skier.label}
            value={`${UNIT_ADULT_PRICE.toFixed(2)} €`}
          />
          <BookingSummaryLineSkier skier={skier} />
        </div>
      ))}
      {booking.children.length > 0 &&
        booking.children.map((skier) => (
          <div key={skier.label}>
            <BookingSummaryLine
              label={skier.label}
              value={`${UNIT_CHILD_PRICE.toFixed(2)} €`}
            />
            <BookingSummaryLineSkier skier={skier} />
          </div>
        ))}
      <Separator className="my-6" />
      <BookingSummaryLine
        label="Total Prix Adulte"
        value={`${prices.adults.toFixed(2)} €`}
      />
      {booking.children.length > 0 && (
        <BookingSummaryLine
          label="Total Prix Enfant"
          value={`${prices.children.toFixed(2)} €`}
        />
      )}
      <BookingSummaryLine label="Livraison" value="GRATUITE" />
      <Separator className="my-6" />
      <BookingSummaryLine
        label="Total"
        value={`${prices.total.toFixed(2)} €`}
      />
    </div>
  );
};

export default BookingSummary;
