import Button from '@/UI/Button';
import Loader from '@/UI/Loader';

const BookingFormValidate = ({ booking, loading, onValidate }) => (
  <section className="flex items-center px-4 md:px-8 lg:px-0 pb-6 md:py-6">
    <Button
      classes="uppercase tracking-wide w-full md:w-64 bg-secondary-blue text-white"
      name="pay"
      disabled={!booking.isValid || loading}
      onClick={onValidate}
    >
      {loading ? <Loader /> : `Payer ${booking.totalPrice.toFixed(2)} €`}
    </Button>
  </section>
);

export default BookingFormValidate;
