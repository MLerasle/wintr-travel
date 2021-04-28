import { useState } from 'react';
import { IconContext } from 'react-icons';
import { IoHelpCircle } from 'react-icons/io5';

import BookingFormSizesSkier from '@/App/Booking/BookingFormSizesSkier';
import SizeSkis from '@/App/Static/SizeSkis';
import SizeShoes from '@/App/Static/SizeShoes';
import SizeHelmet from '@/App/Static/SizeHelmet';

const BookingFormSizes = ({ booking, bookingIsPrepaid }) => {
  const [isFormDisplayed, setIsFormDisplayed] = useState(bookingIsPrepaid);
  const [isHelpDisplayed, setIsHelpDisplayed] = useState(false);
  const skiers = [...booking.adults, ...booking.children];

  const updateSkier = (skier, attribute, event) => {
    let skiers;
    if (skier.label.startsWith('Adulte')) {
      skiers = [...booking.adults];
    } else {
      skiers = [...booking.children];
    }
    const person = skiers.find((s) => s.label === skier.label);
    if (attribute === 'headSize') {
      person[attribute] = event;
    } else {
      person[attribute] = event.target.value;
    }

    if (skier.label.startsWith('Adulte')) {
      booking.update({ adults: skiers });
    } else {
      booking.update({ children: skiers });
    }
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-semibold text-gray-800 flex">
          <span>Mensurations des skieurs</span>
          <IconContext.Provider
            value={{
              size: '1.4rem',
              className:
                'mx-1 text-blue-600 hover:text-blue-500 cursor-pointer hidden md:block',
            }}
          >
            <div onClick={() => setIsHelpDisplayed(!isHelpDisplayed)}>
              <IoHelpCircle />
            </div>
          </IconContext.Provider>
        </h3>
        {isFormDisplayed && !bookingIsPrepaid ? (
          <button
            type="button"
            className="mt-1 bg-white rounded-md font-medium underline text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => setIsFormDisplayed(false)}
          >
            Valider et continuer
          </button>
        ) : isHelpDisplayed ? (
          <button
            type="button"
            className="mt-1 bg-white rounded-md font-medium underline text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => setIsHelpDisplayed(false)}
          >
            Masquer l'aide
          </button>
        ) : (
          !bookingIsPrepaid && (
            <p className="mt-1 max-w-2xl text-gray-500">
              Vous pouvez choisir de passer cette étape pour le moment.
            </p>
          )
        )}
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <div className="sm:px-6 py-4 sm:py-5">
          {isHelpDisplayed ? (
            <div className="prose prose-blue text-gray-500 mx-auto">
              <SizeSkis />
              <SizeShoes withDetails />
              <SizeHelmet withDetails />
            </div>
          ) : isFormDisplayed ? (
            skiers.map((skier, index) => (
              <BookingFormSizesSkier
                key={skier.label}
                skier={skier}
                index={index}
                total={skiers.length}
                onUpdateSkier={updateSkier}
              />
            ))
          ) : (
            <button
              type="button"
              className="bg-white rounded-md font-medium underline text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => setIsFormDisplayed(true)}
            >
              Renseigner maintenant
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingFormSizes;
