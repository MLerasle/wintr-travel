import { useState } from 'react';
import Icon from '@mdi/react';
import { mdiHelpCircle } from '@mdi/js';

import Label from '@/UI/Label';
import Input from '@/UI/Input';
import RadioButtons from '@/UI/RadioButtons';
import BottomDrawer from '@/UI/BottomDrawer';
import SizeShoes from '@/App/SizeShoes';
import SizeHelmet from './SizeHelmet';

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
            <Icon
              path={mdiHelpCircle}
              size={0.7}
              className="mx-1 md:hidden"
              color="#4A5568"
              onClick={toggleShoeHelper}
            />
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
            <Icon
              path={mdiHelpCircle}
              size={0.7}
              className="mx-1 md:hidden"
              color="#4A5568"
              onClick={toggleHelmetHelper}
            />
          </div>
          <RadioButtons
            items={HEAD_SIZES}
            selected={skier.headSize}
            onButtonSelect={(event) => onUpdateSkier(skier, 'headSize', event)}
          />
        </div>
      </div>
    </article>
  );
};

export default SkierDetailsForm;
