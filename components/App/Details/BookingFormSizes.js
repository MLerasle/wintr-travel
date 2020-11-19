import { useState } from 'react';

import SkierDetailsForm from '@/App/Details/SkierDetailsForm';
import Card from '@/UI/Card';
import Header from '@/UI/Header';
import Heading from '@/UI/Heading';
import Separator from '@/UI/Separator';
import Button from '@/UI/Button';

import * as gtag from 'lib/gtag';

const BookingFormSizes = ({
  skiers,
  onUpdateSkier,
  onToggleSizesHelp,
  token,
}) => {
  const [showDetailsForm, setShowDetailsForm] = useState(!!token);

  const handleToggleSizesForm = () => {
    gtag.event({
      action: 'toggle_sizes_form',
      category: 'Booking',
      label: showDetailsForm ? 'hide' : 'show',
    });
    setShowDetailsForm(!showDetailsForm);
  };

  return (
    <Card
      classes="lg:px-0 md:py-6"
      subclasses="bg-gray-100 md:bg-white p-4 md:p-8"
    >
      <Header>
        <Heading className="text-xl">Mensurations des skieurs</Heading>
        <button
          name="sizes-help"
          className="hidden md:block text-primary-blue rounded font-bold tracking-wide focus:outline-none focus:shadow-custom-outline transition duration-300 ease-in-out hover:opacity-75"
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
            className="text-primary-blue mb-4 md:mb-0 cursor-pointer underline"
            onClick={handleToggleSizesForm}
          >
            Passer cette étape pour le moment.
          </button>
        ) : (
          <p className="text-primary-blue mb-4 md:mb-0 text-sm md:text-base">
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
          classes="uppercase tracking-wide bg-white border border-primary-blue hover:bg-light-blue text-primary-blue w-full md:w-auto"
          onClick={handleToggleSizesForm}
        >
          Renseigner maintenant
        </Button>
      )}
    </Card>
  );
};

export default BookingFormSizes;
