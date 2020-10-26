import { useDispatch } from 'react-redux';
import 'react-phone-number-input/style.css';

import BookingDeliveryAddress from '@/App/Checkout/BookingFormDeliveryAddress';
import Card from '@/UI/Card';
import Header from '@/UI/Header';
import Heading from '@/UI/Heading';
import Separator from '@/UI/Separator';
import InputPhone from '@/UI/InputPhone';

import { setDeliveryAddress, setPhoneNumber } from 'store/actions';

const BookingDeliveryInfos = ({ booking, token, phoneError }) => {
  const dispatch = useDispatch();

  const onDeliveryAddressUpdate = (address, placeId) => {
    dispatch(setDeliveryAddress(address, placeId));
  };

  const onPhoneNumberUpdate = (phoneNumber) => {
    dispatch(setPhoneNumber(phoneNumber));
  };

  return (
    <Card classes="lg:px-0" subclasses="bg-gray-200 md:bg-white">
      <Header>
        <Heading className="text-xl">Informations de livraison</Heading>
      </Header>
      <h3 className="py-2 text-orange-600">
        Renseignez votre numéro de téléphone pour être informé en temps réel du
        suivi de votre livraison.
      </h3>
      <Separator className="hidden md:block my-6" />
      <BookingDeliveryAddress
        booking={booking}
        onDeliveryAddressUpdate={onDeliveryAddressUpdate}
        className="md:flex max-w-md"
        token={token}
      />
      <InputPhone
        value={booking.phoneNumber}
        onChange={onPhoneNumberUpdate}
        withLabel
        error={phoneError}
        className="mt-4 max-w-md"
      />
    </Card>
  );
};

export default BookingDeliveryInfos;
