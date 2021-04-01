import { useState } from 'react';
import { IconContext } from 'react-icons';
import { IoHelpCircleOutline } from 'react-icons/io5';

import Label from '@/UI/Label';
import Input from '@/UI/Input';
import RadioButton from '@/UI/RadioButton';
import BottomDrawer from '@/UI/BottomDrawer';
import SizeShoes from '@/App/Sizes/SizeShoes';
import SizeHelmet from '../Sizes/SizeHelmet';

const HEAD_SIZES = ['XS', 'S', 'M', 'L', 'XL'];

const BookingFormSizesSkier = ({ skier, index, total, onUpdateSkier }) => {
  const [isShoeHelperOpened, setIsShoeHelperOpened] = useState(false);
  const [isHelmetHelperOpened, setIsHelmetHelperOpened] = useState(false);

  const toggleShoeHelper = () => {
    setIsShoeHelperOpened(!isShoeHelperOpened);
  };

  const toggleHelmetHelper = () => {
    setIsHelmetHelperOpened(!isHelmetHelperOpened);
  };

  return (
    <article key={skier.label} className={`${index + 1 !== total && 'mb-6'}`}>
      <BottomDrawer open={isShoeHelperOpened} closed={toggleShoeHelper}>
        <div className="pt-2 prose prose-blue prose-lg text-gray-500 mx-auto">
          <SizeShoes />
        </div>
      </BottomDrawer>
      <BottomDrawer open={isHelmetHelperOpened} closed={toggleHelmetHelper}>
        <div className="pt-2 prose prose-blue prose-lg text-gray-500 mx-auto">
          <SizeHelmet />
        </div>
      </BottomDrawer>
      <h4 className="font-semibold pb-2">{skier.label}</h4>
      <div className="flex flex-wrap items-center">
        <div className="flex flex-col w-1/2 pr-1 md:w-1/3 md:pr-2">
          <Label for={`size-${skier.label}`}>Taille</Label>
          <Input
            type="number"
            id={`size-${skier.label}`}
            name={`size-${skier.label}`}
            placeholder="Taille en cm"
            onChange={(event) => onUpdateSkier(skier, 'size', event)}
            value={skier.size}
          />
        </div>
        <div className="flex flex-col w-1/2 pl-1 md:w-1/3 md:px-2">
          <div className="flex">
            <Label for={`shoe-size-${skier.label}`}>Taille du pied</Label>
            {index === 0 && (
              <IconContext.Provider
                value={{
                  color: '#1381F6',
                  size: '1.3rem',
                  className: 'mx-1 md:hidden',
                }}
              >
                <div onClick={toggleShoeHelper}>
                  <IoHelpCircleOutline />
                </div>
              </IconContext.Provider>
            )}
          </div>
          <Input
            type="number"
            id={`shoe-size-${skier.label}`}
            name={`shoe-size-${skier.label}`}
            placeholder="En cm"
            onChange={(event) => onUpdateSkier(skier, 'shoeSize', event)}
            value={skier.shoeSize}
          />
        </div>
        <div className="flex flex-col w-full md:w-1/3 mt-2 md:mt-0 md:pl-2">
          <div className="flex">
            <Label for={`head-size-${skier.label}`}>Taille du casque</Label>
            {index === 0 && (
              <IconContext.Provider
                value={{
                  color: '#1381F6',
                  size: '1.3rem',
                  className: 'mx-1 md:hidden',
                }}
              >
                <div onClick={toggleHelmetHelper}>
                  <IoHelpCircleOutline />
                </div>
              </IconContext.Provider>
            )}
          </div>
          <div className="flex space-x-1">
            {HEAD_SIZES.map((size) => (
              <RadioButton
                key={size}
                name="helmet"
                value={size}
                selected={skier.headSize}
                onChange={(event) => onUpdateSkier(skier, 'headSize', event)}
              >
                <div className="w-full text-center text-gray-800">{size}</div>
              </RadioButton>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export default BookingFormSizesSkier;
