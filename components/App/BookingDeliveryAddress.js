import { useRef } from 'react';

import Label from '@/UI/Label';
import Input from '@/UI/Input';

const BookingDeliveryAddress = ({
  booking,
  onDeliveryAddressUpdate,
  token,
}) => {
  const deliveryAddressRef = useRef();

  return (
    <div className={`${!!token && 'mt-4'}`}>
      <Label for="deliveryAddress">Votre adresse de livraison</Label>
      <p className="text-orange-600 text-sm md:text-base">
        Vous pouvez renseigner cette information ultérieurement.
      </p>
      <Input
        type="text"
        id="deliveryAddress"
        name="deliveryAddress"
        ref={deliveryAddressRef}
        className="w-full mt-2"
        placeholder="Saisissez l'adresse complète ici"
        onChange={onDeliveryAddressUpdate}
        value={booking.deliveryAddress}
      />
    </div>
  );
};

export default BookingDeliveryAddress;
