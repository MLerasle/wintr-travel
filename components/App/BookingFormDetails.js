import SkierDetailsForm from '@/App/SkierDetailsForm';
import Card from '@/UI/Card';
import Heading from '@/UI/Heading';
import Separator from '@/UI/Separator';

const BookingFormDetails = ({ skiers, onUpdateSkier }) => (
  <Card classes="lg:px-0" subclasses="bg-gray-200 md:bg-white">
    <Heading className="text-xl">Mensurations des skieurs</Heading>
    <h3 className="py-2 text-sm md:text-base">
      Ces informations sont importantes pour vous fournir le matériel à votre
      taille.
    </h3>
    <p className="text-orange-600 mb-4 md:mb-0 text-sm md:text-base">
      Vous pouvez choisir de passer cette étape pour le moment.
    </p>
    <Separator className="hidden md:block my-6" />
    {skiers.map((skier, index) => (
      <SkierDetailsForm
        key={skier.label}
        skier={skier}
        index={index}
        total={skiers.length}
        onUpdateSkier={onUpdateSkier}
      />
    ))}
  </Card>
);

export default BookingFormDetails;
