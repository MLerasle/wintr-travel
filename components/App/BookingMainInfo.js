import { useDispatch } from 'react-redux';

import Card from '@/UI/Card';
import Header from '@/UI/Header';
import Heading from '@/UI/Heading';
import Separator from '@/UI/Separator';
import BookingDeliveryAddress from '@/App/BookingDeliveryAddress';

import { formatDateLong } from 'helpers/dates';

const BookingMainInfos = ({ booking, onEditBooking, token }) => {
  const dispatch = useDispatch();
  const adults = booking.adults.length > 1 ? 'adultes' : 'adulte';
  const children = booking.children.length > 1 ? 'enfants' : 'enfant';

  const onDeliveryAddressUpdate = (event) => {
    dispatch({ type: 'SET_DELIVERY_ADDRESS', address: event.target.value });
  };

  return (
    <Card classes="lg:px-0" subclasses="bg-gray-200 md:bg-white">
      <Header>
        <Heading className="text-xl mb-2 md:mb-0">
          Votre séjour à Flaine
        </Heading>
        {!token && (
          <button
            name="edit"
            className="text-secondary-blue rounded text-sm sm:text-base font-bold tracking-wide focus:outline-none focus:shadow-outline transition duration-300 ease-in-out hover:opacity-75"
            onClick={onEditBooking}
          >
            Modifier
          </button>
        )}
      </Header>
      <Separator className="hidden md:block my-6" />
      <ul className="mt-2">
        <li className="pb-2">
          Du{' '}
          <span className="font-bold">{formatDateLong(booking.firstDay)}</span>{' '}
          au{' '}
          <span className="font-bold">{formatDateLong(booking.lastDay)}</span>.
        </li>
        <li>
          Pour {booking.adults.length}{' '}
          <span className="font-bold">{adults}</span> (
          {booking.adultsPrice.toFixed(2)} €)
          {booking.children.length > 0 && (
            <>
              {' '}
              et {booking.children.length}{' '}
              <span className="font-bold">{children}</span> (
              {booking.childrenPrice.toFixed(2)} €)
            </>
          )}
          .
        </li>
      </ul>
      {!!token && (
        <BookingDeliveryAddress
          booking={booking}
          onDeliveryAddressUpdate={onDeliveryAddressUpdate}
          token={token}
        />
      )}
    </Card>
  );
};

export default BookingMainInfos;
