import Card from '@/UI/Card';
import Heading from '@/UI/Heading';
import Separator from '@/UI/Separator';
import Input from '@/UI/Input';

const BookingFormDeliveryAddress = ({ booking, onAddressUpdate }) => (
  <Card classes="lg:px-0" subclasses="bg-gray-200 md:bg-white">
    <Heading className="text-xl pb-2">Où souhaitez-vous être livré?</Heading>
    <p className="text-orange-600 text-sm md:text-base">
      Vous pouvez renseigner cette information ultérieurement.
    </p>
    <Separator className="hidden md:block my-6" />
    <Input
      type="text"
      id="delivery-address"
      name="delivery-address"
      className="my-4 md:my-0 w-full lg:w-1/2"
      placeholder="Saisissez votre adresse ici"
      onChange={(event) => onAddressUpdate(event)}
      value={booking.deliveryAddress}
    />
  </Card>
);

export default BookingFormDeliveryAddress;
