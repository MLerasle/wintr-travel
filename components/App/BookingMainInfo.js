import Card from '@/UI/Card';
import Header from '@/UI/Header';
import Heading from '@/UI/Heading';
import Separator from '@/UI/Separator';

import { formatDate } from 'helpers/dates';

const BookingMainInfos = ({ booking, onEditBooking }) => (
  <Card classes="lg:px-0" subclasses="bg-gray-200 md:bg-white">
    <Header>
      <Heading className="text-xl mb-2 md:mb-0">Votre séjour</Heading>
      <button
        name="edit"
        className="text-secondary-blue rounded text-sm sm:text-base font-bold tracking-wide focus:outline-none focus:shadow-outline transition duration-300 ease-in-out hover:opacity-75"
        onClick={onEditBooking}
      >
        Modifier
      </button>
    </Header>
    <Separator className="hidden md:block my-6" />
    <ul className="text-sm md:text-base mt-2">
      <li className="pb-2">
        <span className="font-bold">{booking.resort}</span> du{' '}
        <span className="font-bold">{formatDate(booking.firstDay)}</span> au{' '}
        <span className="font-bold">{formatDate(booking.lastDay)}</span>.
      </li>
      <li>
        {booking.adults.length} <span className="font-bold">adultes</span> (
        {booking.adultsPrice.toFixed(2)} €) et {booking.children.length}{' '}
        <span className="font-bold">enfants</span> (
        {booking.childrenPrice.toFixed(2)} €).
      </li>
    </ul>
  </Card>
);

export default BookingMainInfos;
