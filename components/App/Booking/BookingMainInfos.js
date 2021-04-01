import { useState } from 'react';

import BookingForm from '@/App/Booking/BookingForm';
import BookingMainInfosItem from '@/App/Booking/BookingMainInfosItem';

import { getLastDay, getPrices } from 'helpers/booking';
import { formatDateLong } from 'helpers/dates';

const BookingMainInfos = ({ booking, bookingIsPrepaid }) => {
  const [isEditing, setIsEditing] = useState(false);
  const prices = getPrices(booking.adults.length, booking.children.length);
  const adults = booking.adults.length > 1 ? 'adultes' : 'adulte';
  const children = booking.children.length > 1 ? 'enfants' : 'enfant';

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-semibold text-gray-800">
          Votre séjour
        </h3>
        {!bookingIsPrepaid && (
          <p className="mt-1 max-w-2xl text-gray-500">
            <>
              {!isEditing && 'Vérifiez les informations ci-dessous ou '}
              <button
                type="button"
                className="bg-white rounded-md font-medium underline text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Validez les changements' : 'modifiez-les'}
              </button>
              .
            </>
          </p>
        )}
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
        {isEditing ? (
          <div className="bg-white sm:max-w-lg sm:w-full sm:mx-auto sm:rounded-lg sm:overflow-hidden">
            <div className="sm:py-6 sm:px-10">
              <BookingForm isEditing />
            </div>
          </div>
        ) : (
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            {bookingIsPrepaid && (
              <>
                <BookingMainInfosItem title="Nom">
                  {booking.firstname} {booking.lastname}
                </BookingMainInfosItem>
                <BookingMainInfosItem title="Email">
                  {booking.email}
                </BookingMainInfosItem>
              </>
            )}
            <BookingMainInfosItem title="Station">Flaine</BookingMainInfosItem>
            <BookingMainInfosItem title="Nombre de skieurs">
              {booking.adults.length} {adults}
              {booking.children.length > 0 && (
                <>
                  {' '}
                  et {booking.children.length} {children}
                </>
              )}
            </BookingMainInfosItem>
            <BookingMainInfosItem title="Arrivée">
              {formatDateLong(booking.firstDay)}
            </BookingMainInfosItem>
            <BookingMainInfosItem title="Départ">
              {formatDateLong(getLastDay(booking.firstDay))}
            </BookingMainInfosItem>
            <BookingMainInfosItem title="Prix du séjour" fullwidth>
              <p>{prices.total.toFixed(2)} €</p>
              {!bookingIsPrepaid && (
                <p className="text-gray-500 mt-2 text-sm ">
                  Pré-réservez votre séjour pour 5€ dès aujourd'hui et payez le
                  reste d'ici la veille de votre arrivée sur place.
                  <br />
                  Remboursement intégral en cas d'annulation.
                </p>
              )}
            </BookingMainInfosItem>
          </dl>
        )}
      </div>
    </div>
  );
};

export default BookingMainInfos;
