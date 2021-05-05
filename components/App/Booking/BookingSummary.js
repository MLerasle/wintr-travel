import { useContext } from 'react';
import { useState } from 'react';

import BookingSummaryLine from '@/App/Booking/BookingSummaryLine';
import BookingForm from '@/App/Booking/BookingForm';
import Divider from '@/UI/Divider';

import BookingContext from 'context/booking-context';
import { formatDate } from 'helpers/dates';
import { getPrices, getLastDay } from 'helpers/booking';
import { ADULT_PRICE, CHILD_PRICE } from 'data/pack';

const BookingSummary = ({ page }) => {
  const booking = useContext(BookingContext);
  const [isEditing, setIsEditing] = useState(false);
  const prices = getPrices(booking.adults.length, booking.children.length);
  const adults = booking.adults.length > 1 ? 'adultes' : 'adulte';
  const children = booking.children.length > 1 ? 'enfants' : 'enfant';
  let skiers = `${booking.adults.length} ${adults}`;
  if (booking.children.length > 0) {
    skiers += ` et ${booking.children.length} ${children}`;
  }

  return (
    <div className="lg:mx-auto xl:mx-0 lg:bg-white lg:p-6 mt-4 xl:mt-0 text-gray-800">
      <h3 className="text-lg leading-6 font-semibold text-gray-800">
        Votre réservation
      </h3>
      {page === 'checkout' ? (
        <p className="mt-2 max-w-2xl text-gray-500">
          Un email de confirmation sera envoyée à{' '}
          <span className="font-bold">{booking.email}</span> juste après le
          paiement.
        </p>
      ) : (
        page === 'details' && (
          <p className="mt-2 max-w-2xl text-gray-500">
            {!isEditing && 'Vérifiez les informations ci-dessous ou '}
            <button
              type="button"
              className="lg:bg-white font-medium underline text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Validez les changements' : 'modifiez-les'}
            </button>
            .
          </p>
        )
      )}
      <Divider className="py-6" />
      {isEditing ? (
        <BookingForm isEditing />
      ) : (
        <>
          {page === 'edit' && (
            <>
              <BookingSummaryLine
                label="Nom"
                value={`${booking.firstname} ${booking.lastname}`}
              />
              <BookingSummaryLine label="Email" value={booking.email} />
              <BookingSummaryLine label="Nombre de skieurs" value={skiers} />
              <Divider className="py-6" />
            </>
          )}
          <BookingSummaryLine label="Station" value="Flaine" />
          <BookingSummaryLine
            label="Arrivée"
            value={formatDate(booking.firstDay)}
          />
          <BookingSummaryLine
            label="Départ"
            value={formatDate(getLastDay(booking.firstDay))}
          />
          <Divider className="py-6" />
          {page !== 'edit' && (
            <>
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
              <Divider className="py-6" />
            </>
          )}
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
          <Divider className="py-6" />
          <BookingSummaryLine
            label="Prix du séjour"
            value={`${prices.total.toFixed(2)} €`}
          />
          {page === 'details' && (
            <p className="text-gray-500 mt-6 text-sm">
              Pré-réservez votre séjour pour 5€ dès aujourd'hui et payez le
              reste d'ici la veille de votre arrivée sur place.
              <br />
              Remboursement intégral en cas d'annulation.
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default BookingSummary;
