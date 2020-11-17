import Card from '@/UI/Card';
import Heading from '@/UI/Heading';
import Separator from '@/UI/Separator';
import Input from '@/UI/Input';
import Checkbox from '@/UI/Checkbox';

const BookingFormEmail = ({
  booking,
  onEmailUpdate,
  onNewsletterRegistration,
  error,
}) => (
  <Card classes="lg:px-0 md:py-6" subclasses="bg-gray-100 md:bg-white">
    <Heading className="text-xl pb-2">Informations de contact</Heading>
    <p className="text-gray-600">
      Pour vous tenir informé de l'état de votre réservation et effectuer les
      opérations d'après-vente.
    </p>
    <Separator className="hidden md:block my-6" />
    <Input
      type="email"
      id="email-address"
      name="email-address"
      className={`my-4 md:my-0 w-full lg:w-1/2 ${
        error && 'border-primary-red bg-light-red'
      }`}
      placeholder="Email"
      onChange={(event) => onEmailUpdate(event)}
      value={booking.email}
    />
    <div className="error text-primary-red pt-1 pl-1" role="alert">
      {error && error}
    </div>
    <p className="text-gray-700 font-semibold mt-4">
      Nous vous enverrons des codes de réduction et offres exceptionnelles.
    </p>
    <Checkbox
      name="registerToNewsletter"
      value={!booking.isRegisteredToNewsletter}
      onChange={(event) => onNewsletterRegistration(event)}
    >
      Cochez cette case si vous ne souhaitez pas en recevoir.
    </Checkbox>
  </Card>
);

export default BookingFormEmail;
