import { useState, useEffect, useRef } from 'react';

import Label from '@/UI/Label';
import Input from '@/UI/Input';
import Button from '@/UI/Button';

const BookingDeliveryAddress = ({
  booking,
  onDeliveryAddressUpdate,
  token,
}) => {
  const deliveryAddressRef = useRef();
  const [showDeliveryAddress, setShowDeliveryAddress] = useState(!!token);

  useEffect(() => {
    if (showDeliveryAddress) {
      deliveryAddressRef.current.focus();
    }
  }, [showDeliveryAddress]);

  return (
    <div className={`${!!token && 'mt-4'}`}>
      <Label for="deliveryAddress">Votre adresse de livraison</Label>
      {showDeliveryAddress ? (
        <>
          {!token && (
            <button
              className="text-orange-600 text-sm md:text-base cursor-pointer underline block"
              onClick={() => setShowDeliveryAddress(false)}
            >
              Renseigner cette information ultérieurement.
            </button>
          )}
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
        </>
      ) : (
        <>
          <p className="text-orange-600 text-sm md:text-base">
            Vous pouvez renseigner cette information ultérieurement.
          </p>
          <Button
            classes="w-full uppercase tracking-wide bg-white text-orange-600 border border-orange-600 hover:bg-orange-100 mt-2"
            onClick={() => setShowDeliveryAddress(true)}
          >
            Renseigner maintenant
          </Button>
        </>
      )}
    </div>
  );
};

export default BookingDeliveryAddress;
