import { useState } from 'react';
import { IconContext } from 'react-icons';
import { IoHelpCircleOutline } from 'react-icons/io5';

import Label from '@/UI/Label';
import Input from '@/UI/Input';
import RadioButtons from '@/UI/RadioButtons';
import BottomDrawer from '@/UI/BottomDrawer';
import SizeShoes from '@/App/Sizes/SizeShoes';
import SizeHelmet from '../Sizes/SizeHelmet';

const HEAD_SIZES = ['XS', 'S', 'M', 'L', 'XL'];

const SkierDetailsForm = ({ skier, index, total, onUpdateSkier }) => {
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
        <SizeShoes />
      </BottomDrawer>
      <BottomDrawer open={isHelmetHelperOpened} closed={toggleHelmetHelper}>
        <SizeHelmet />
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
                <div onClick={toggleShoeHelper}>
                  <IoHelpCircleOutline />
                </div>
              </IconContext.Provider>
            )}
          </div>
          <RadioButtons
            items={HEAD_SIZES}
            onChange={(event) => onUpdateSkier(skier, 'headSize', event)}
            name="helmet"
            selected={skier.headSize}
          />
        </div>
      </div>
    </article>
  );
};

export default SkierDetailsForm;
