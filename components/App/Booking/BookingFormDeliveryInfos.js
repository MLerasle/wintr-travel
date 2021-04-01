import 'react-phone-number-input/style.css';

import BookingDeliveryAddress from '@/App/Booking/BookingFormDeliveryAddress';
import Card from '@/UI/Card';
import Header from '@/UI/Header';
import Heading from '@/UI/Heading';
import Separator from '@/UI/Separator';
import InputPhone from '@/UI/InputPhone';

const BookingFormDeliveryInfos = ({ booking, token, phoneError }) => {
  const onDeliveryAddressUpdate = (address, placeId) => {
    booking.update('deliveryAddress', address);
    booking.update('placeId', placeId);
  };

  const onPhoneNumberUpdate = (phoneNumber) => {
    booking.update('phoneNumber', phoneNumber);
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-semibold text-gray-800">
          Informations de livraison
        </h3>
        <p className="mt-1 max-w-2xl text-gray-500">
          Renseignez votre numéro de téléphone pour être informé en temps réel
          du suivi de votre livraison.
        </p>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
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
      </div>
    </div>
    // <Card
    //   classes="lg:px-0 md:py-6"
    //   subclasses="bg-gray-100 md:bg-white p-4 md:p-8"
    // >
    //   <Header>
    //     <Heading className="text-xl">Informations de livraison</Heading>
    //   </Header>
    //   <h3 className="py-2 text-primary-blue">
    //     Renseignez votre numéro de téléphone pour être informé en temps réel du
    //     suivi de votre livraison.
    //   </h3>
    //   <Separator className="hidden md:block my-6" />
    //   <BookingDeliveryAddress
    //     booking={booking}
    //     onDeliveryAddressUpdate={onDeliveryAddressUpdate}
    //     className="md:flex max-w-md"
    //     token={token}
    //   />
    //   <InputPhone
    //     value={booking.phoneNumber}
    //     onChange={onPhoneNumberUpdate}
    //     withLabel
    //     error={phoneError}
    //     className="mt-4 max-w-md"
    //   />
    // </Card>
  );
};

export default BookingFormDeliveryInfos;
