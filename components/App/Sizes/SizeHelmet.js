import { useState } from 'react';
import Icon from '@mdi/react';
import { mdiSwapHorizontal } from '@mdi/js';

import Label from '@/UI/Label';
import Input from '@/UI/Input';

import { HELMET } from 'data/sizes';

const SizeHelmet = (props) => {
  const [helmet, setHelmet] = useState();

  const updateHeadSize = (event) => {
    setHelmet('');
    const helmet = HELMET.find(
      (h) => h.headsize === Math.floor(event.target.value)
    );
    if (!helmet) {
      return;
    }
    setHelmet(helmet.size);
  };

  return (
    <>
      {props.withDetails && (
        <h3 className="text-2xl font-bold text-gray-800 pb-4 pt-8">
          3. Casque
        </h3>
      )}
      <p className="text-gray-600 py-1 leading-loose">
        Vous devez{' '}
        <span className="font-bold text-primary-blue">
          mesurer votre tour de tête en centimètres
        </span>
        .
      </p>
      <p className="text-gray-600 py-1 leading-loose">
        Pour ce faire,{' '}
        <span className="font-bold text-primary-blue">
          prenez un mètre ruban et faites le tour de votre crâne au niveau du
          front
        </span>
        , juste au-dessus de vos sourcils.
      </p>
      <br />
      <p className="text-gray-600 py-1 leading-loose">
        Reportez la valeur ainsi mesurée ci-dessous pour connaitre la taille de
        casque qu'il vous faut.
      </p>
      <div className="mt-6 flex items-end">
        <div className="flex flex-col w-2/5 md:w-1/4">
          <Label for="head-size">Tour de tête</Label>
          <Input
            type="number"
            min="52"
            max="62"
            id="head-size"
            name="head-size"
            placeholder="En cm"
            onChange={(event) => updateHeadSize(event)}
          />
        </div>
        <Icon
          path={mdiSwapHorizontal}
          size={2}
          className="mx-1 sm:mx-4"
          color="#2D3748"
        />
        <div className="flex flex-col w-2/5 md:w-1/4">
          <Label>Taille du casque</Label>
          <Input
            type="text"
            name="helmet"
            value={helmet}
            readonly
            className="bg-gray-100 cursor-not-allowed"
          />
        </div>
      </div>
    </>
  );
};

export default SizeHelmet;
