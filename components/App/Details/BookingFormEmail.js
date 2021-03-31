import Input from '@/UI/Input';
import Checkbox from '@/UI/Checkbox';

const BookingFormEmail = ({
  booking,
  onEmailUpdate,
  onNewsletterRegistration,
  error,
}) => (
  <>
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
    <p className="text-gray-700 mt-4">
      Nous vous enverrons des codes de réduction et offres exceptionnelles.
    </p>
    <Checkbox
      name="registerToNewsletter"
      value={!booking.isRegisteredToNewsletter}
      onChange={(event) => onNewsletterRegistration(event)}
    >
      Cochez cette case si vous ne souhaitez pas en recevoir.
    </Checkbox>
  </>
);

export default BookingFormEmail;
