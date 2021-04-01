import Card from '@/UI/Card';
import Header from '@/UI/Header';
import Heading from '@/UI/Heading';
import Separator from '@/UI/Separator';
import Button from '@/UI/Button';

const BookingCancel = ({ onCancel }) => (
  <Card
    classes="lg:px-0 md:py-6"
    subclasses="bg-gray-100 md:bg-white md:border md:border-primary-red p-4 md:p-8"
  >
    <Header>
      <Heading className="text-xl">Annuler la réservation</Heading>
    </Header>
    <h3 className="py-2">
      Nous vous rembourserons intégralement sous 48 heures.
    </h3>
    <Separator className="hidden md:block my-6" />
    <Button
      classes="uppercase tracking-wide w-full md:w-64 text-primary-red border border-primary-red hover:bg-light-red"
      name="cancel"
      onClick={onCancel}
    >
      Annuler
    </Button>
  </Card>
);

export default BookingCancel;
