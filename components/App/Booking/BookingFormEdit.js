import BookingDeliveryAddress from '@/App/Booking/BookingFormDeliveryAddress';
import BookingFormSizes from '@/App/Booking/BookingFormSizes';
import Loader from '@/UI/Loader';
import FormRow from '@/UI/FormRow';
import InputPhone from '@/UI/InputPhone';

import { isValid } from 'helpers/booking';

const BookingFormEdit = ({ booking, token, loading, onValidate }) => {
  const onDeliveryAddressUpdate = (address, placeId) => {
    booking.update({
      deliveryAddress: address,
      placeId,
    });
  };

  const onPhoneNumberUpdate = (phoneNumber) => {
    booking.update({ phoneNumber });
  };

  return (
    <div className="pt-6">
      <FormRow>
        <BookingDeliveryAddress
          booking={booking}
          token={token}
          onDeliveryAddressUpdate={onDeliveryAddressUpdate}
        />
      </FormRow>
      <FormRow className="pt-6">
        <InputPhone
          value={booking.phoneNumber}
          onChange={onPhoneNumberUpdate}
          withLabel
        />
      </FormRow>
      <BookingFormSizes booking={booking} bookingIsPrepaid />
      <button
        className="btn btn-primary btn-large w-full mt-8"
        name="save"
        disabled={!isValid(booking) || loading}
        onClick={onValidate}
      >
        {loading ? <Loader /> : 'Enregistrer'}
      </button>
    </div>
  );
};

export default BookingFormEdit;
