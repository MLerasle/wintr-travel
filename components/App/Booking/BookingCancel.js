import Card from '@/UI/Card';
import Header from '@/UI/Header';
import Heading from '@/UI/Heading';
import Divider from '@/UI/Divider';

const BookingCancel = ({ onCancel }) => (
  <Card
    classes="lg:px-0 md:py-6"
    subclasses="bg-gray-100 md:bg-white md:border md:border-red-600 p-4 md:p-8"
  >
    <Header>
      <Heading className="text-xl">Annuler la réservation</Heading>
    </Header>
    <h3 className="py-2">
      Nous vous rembourserons intégralement sous 48 heures.
    </h3>
    <Divider className="hidden md:block py-6" />
    {/* <Button
      classes="uppercase tracking-wide w-full md:w-64 text-red-600 border border-red-600 hover:bg-red-50"
      name="cancel"
      onClick={onCancel}
    >
      Annuler
    </Button> */}
  </Card>
);

export default BookingCancel;
