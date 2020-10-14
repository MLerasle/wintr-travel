import { useSelector } from 'react-redux';

import BookingSummaryLine from '@/App/BookingSummaryLine';
import BookingSummaryLineSkier from './BookingSummaryLineSkier';
import Heading from '@/UI/Heading';
import Separator from '@/UI/Separator';

import { formatDate } from 'helpers/dates';
import { UNIT_ADULT_PRICE, UNIT_CHILD_PRICE } from 'data/prices';

const BookingSummary = () => {
  const booking = useSelector((state) => state);

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
      <BookingSummaryLine label="Station" value="Flaine" />
      <BookingSummaryLine
        label="Arrivée"
        value={formatDate(booking.firstDay)}
      />
      <BookingSummaryLine label="Départ" value={formatDate(booking.lastDay)} />
      <Separator className="my-6" />
      {booking.adults.map((skier) => (
        <div key={skier.label}>
          <BookingSummaryLine
            label={skier.label}
            value={`${(booking.duration * UNIT_ADULT_PRICE).toFixed(2)} €`}
          />
          <BookingSummaryLineSkier skier={skier} />
        </div>
      ))}
      {booking.children.length > 0 &&
        booking.children.map((skier) => (
          <div key={skier.label}>
            <BookingSummaryLine
              label={skier.label}
              value={`${(booking.duration * UNIT_CHILD_PRICE).toFixed(2)} €`}
            />
            <BookingSummaryLineSkier skier={skier} />
          </div>
        ))}
      <Separator className="my-6" />
      <BookingSummaryLine
        label="Total Prix Adulte"
        value={`${booking.adultsPrice.toFixed(2)} €`}
      />
      {booking.children.length > 0 && (
        <BookingSummaryLine
          label="Total Prix Enfant"
          value={`${booking.childrenPrice.toFixed(2)} €`}
        />
      )}
      <BookingSummaryLine label="Livraison" value="GRATUIT" />
      <Separator className="my-6" />
      <BookingSummaryLine
        label="Total"
        value={`${booking.totalPrice.toFixed(2)} €`}
      />
    </div>
  );
};

export default BookingSummary;
