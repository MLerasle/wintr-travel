import { useContext } from 'react';

import BookingSummaryLine from '@/App/Booking/BookingSummaryLine';
import Separator from '@/UI/Separator';

import BookingContext from 'context/booking-context';
import { formatDate } from 'helpers/dates';
import { getPrices, getLastDay } from 'helpers/booking';
import { ADULT_PRICE, CHILD_PRICE } from 'data/booking';

const BookingSummary = () => {
  const booking = useContext(BookingContext);
  const prices = getPrices(booking.adults.length, booking.children.length);

  return (
    <div className="mx-auto xl:mx-0 md:bg-white px-4 md:p-6 md:mt-4 xl:mt-0 text-gray-800">
      <h3 className="text-lg leading-6 font-semibold text-gray-800 mb-4">
        Votre réservation
      </h3>
      <p>
        Un email de confirmation sera envoyée à{' '}
        <span className="font-bold">{booking.email}</span> juste après le
        paiement.
      </p>
      <Separator className="my-6" />
      <BookingSummaryLine label="Station" value="Flaine" />
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
            value={`${ADULT_PRICE.toFixed(2)} €`}
          />
        </div>
      ))}
      {booking.children.length > 0 &&
        booking.children.map((skier) => (
          <div key={skier.label}>
            <BookingSummaryLine
              label={skier.label}
              value={`${CHILD_PRICE.toFixed(2)} €`}
            />
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
