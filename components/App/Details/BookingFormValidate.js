import Button from '@/UI/Button';
import Loader from '@/UI/Loader';

import { isValid } from 'helpers/booking';

const BookingFormValidate = ({ booking, loading, onValidate, buttonLabel }) => (
  <section className="flex items-center px-4 md:px-8 lg:px-0 pb-6 md:py-6">
    <Button
      classes="uppercase tracking-wide w-full md:w-64 bg-primary-green text-white"
      name="pay"
      disabled={!isValid(booking) || loading}
      onClick={onValidate}
    >
      {loading ? <Loader /> : buttonLabel}
    </Button>
  </section>
);

export default BookingFormValidate;
