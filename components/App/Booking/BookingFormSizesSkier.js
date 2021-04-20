import { useState } from 'react';
import { IconContext } from 'react-icons';
import { IoHelpCircleOutline } from 'react-icons/io5';

import RadioButtons from '@/UI/RadioButtons';
import BottomDrawer from '@/UI/BottomDrawer';
import SizeShoes from '@/App/Static/SizeShoes';
import SizeHelmet from '../Static/SizeHelmet';

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
          <label className="label" htmlFor={`size-${skier.label}`}>
            Taille
          </label>
          <input
            type="number"
            id={`size-${skier.label}`}
            name={`size-${skier.label}`}
            className="input"
            placeholder="Taille en cm"
            onChange={(event) => onUpdateSkier(skier, 'size', event)}
            value={skier.size}
          />
        </div>
        <div className="flex flex-col w-1/2 pl-1 md:w-1/3 md:px-2">
          <div className="flex">
            <label className="label" htmlFor={`shoe-size-${skier.label}`}>
              Taille du pied
            </label>
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
          <input
            type="number"
            id={`shoe-size-${skier.label}`}
            name={`shoe-size-${skier.label}`}
            className="input"
            placeholder="En cm"
            onChange={(event) => onUpdateSkier(skier, 'shoeSize', event)}
            value={skier.shoeSize}
          />
        </div>
        <div className="flex flex-col w-full md:w-1/3 mt-2 md:mt-0 md:pl-2">
          <div className="flex">
            <label className="label" htmlFor={`head-size-${skier.label}`}>
              Taille du casque
            </label>
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
          <RadioButtons
            value={skier.headSize}
            onChange={(size) => onUpdateSkier(skier, 'headSize', size)}
            options={HEAD_SIZES}
          />
        </div>
      </div>
    </article>
  );
};

export default BookingFormSizesSkier;
