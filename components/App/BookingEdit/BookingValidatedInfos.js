import Icon from '@mdi/react';
import {
  mdiAccountCheckOutline,
  mdiEmailCheckOutline,
  mdiCalendarCheckOutline,
  mdiAccountMultipleCheckOutline,
  mdiMapMarkerCheckOutline,
  mdiCreditCardCheckOutline,
} from '@mdi/js';

import { getPrices, getLastDay } from 'helpers/booking';
import { formatDate } from 'helpers/dates';

const BookingValidatedInfos = ({ booking }) => {
  const adults = booking.adults.length > 1 ? 'adultes' : 'adulte';
  const children = booking.children.length > 1 ? 'enfants' : 'enfant';
  const prices = getPrices(booking.adults.length, booking.children.length);

  return (
    <header className="px-4 py-2 lg:px-0">
      <h1 className="heading">Mettre à jour votre réservation</h1>
      <div className="md:flex mt-4">
        <p className="argument flex items-center pb-3 md:pb-1 text-primary-green">
          <Icon path={mdiAccountCheckOutline} size={1} />
          <span className="ml-1">{booking.name}</span>
        </p>
        <p className="argument md:ml-6 flex items-center pb-3 md:pb-1 text-primary-green">
          <Icon path={mdiEmailCheckOutline} size={1} />
          <span className="ml-1">{booking.email}</span>
        </p>
      </div>
      <div className="md:flex md:mt-2">
        <p className="argument flex items-center pb-3 md:pb-1 text-primary-green">
          <Icon path={mdiMapMarkerCheckOutline} size={1} />
          <span className="ml-1">Flaine</span>
        </p>
        <p className="argument md:ml-6 flex items-center pb-3 md:pb-1 text-primary-green">
          <Icon path={mdiCalendarCheckOutline} size={1} />
          <span className="ml-1">
            Du {formatDate(booking.firstDay)} au{' '}
            {formatDate(getLastDay(booking.firstDay))}.
          </span>
        </p>
        <p className="argument md:ml-6 flex items-center pb-3 md:pb-1 text-primary-green">
          <Icon path={mdiAccountMultipleCheckOutline} size={1} />
          <span className="ml-1">
            {booking.adults.length} {adults}
            {booking.children.length > 0 && (
              <>
                {' '}
                et {booking.children.length} {children}
              </>
            )}
          </span>
        </p>
        <p className="argument md:ml-6 flex items-center pb-3 md:pb-1 text-primary-green">
          <Icon path={mdiCreditCardCheckOutline} size={1} />
          <span className="ml-1">Payé {prices.total.toFixed(2)} €</span>
        </p>
      </div>
    </header>
  );
};

export default BookingValidatedInfos;
