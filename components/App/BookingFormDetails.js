import { useState } from 'react';

import SkierDetailsForm from '@/App/SkierDetailsForm';
import Card from '@/UI/Card';
import Header from '@/UI/Header';
import Heading from '@/UI/Heading';
import Separator from '@/UI/Separator';
import Button from '@/UI/Button';

const BookingFormDetails = ({
  skiers,
  onUpdateSkier,
  onToggleSizesHelp,
  token,
}) => {
  const [showDetailsForm, setShowDetailsForm] = useState(!!token);

  return (
    <Card classes="lg:px-0" subclasses="bg-gray-200 md:bg-white">
      <Header>
        <Heading className="text-xl">Mensurations des skieurs</Heading>
        <button
          name="sizes-help"
          className="hidden md:block text-secondary-blue rounded font-bold tracking-wide focus:outline-none focus:shadow-outline transition duration-300 ease-in-out hover:opacity-75"
          onClick={onToggleSizesHelp}
        >
          Comment renseigner les bonnes tailles?
        </button>
      </Header>
      <h3 className="py-2">
        Ces informations sont importantes pour vous fournir le matériel à votre
        taille.
      </h3>

      {!token &&
        (showDetailsForm ? (
          <button
            className="text-orange-600 mb-4 md:mb-0 cursor-pointer underline"
            onClick={() => setShowDetailsForm(false)}
          >
            Passer cette étape pour le moment.
          </button>
        ) : (
          <p className="text-orange-600 mb-4 md:mb-0 text-sm md:text-base">
            Vous pouvez choisir de passer cette étape pour le moment.
          </p>
        ))}
      <Separator className="hidden md:block my-6" />
      {showDetailsForm || !!token ? (
        skiers.map((skier, index) => (
          <SkierDetailsForm
            key={skier.label}
            skier={skier}
            index={index}
            total={skiers.length}
            onUpdateSkier={onUpdateSkier}
          />
        ))
      ) : (
        <Button
          classes="uppercase tracking-wide bg-white border border-orange-600 hover:bg-orange-100 text-orange-600 w-full md:w-auto"
          onClick={() => setShowDetailsForm(true)}
        >
          Renseigner maintenant
        </Button>
      )}
    </Card>
  );
};

export default BookingFormDetails;
