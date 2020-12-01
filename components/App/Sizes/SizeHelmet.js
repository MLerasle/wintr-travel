import { useState } from 'react';

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
    if (+event.target.value < 52 && event.target.value.length > 1) {
      setHelmet('XS');
      return;
    }
    if (+event.target.value > 62) {
      setHelmet('XL');
      return;
    }
    if (!helmet) {
      return;
    }
    setHelmet(helmet.size);
  };

  return (
    <>
      {props.withDetails && (
        <h2 className="text-2xl font-bold text-gray-800 pb-4 pt-8">
          3. Casque
        </h2>
      )}
      <p className="text-gray-700 py-1 leading-loose">
        Vous devez{' '}
        <span className="font-bold text-primary-blue">
          mesurer votre tour de tête en centimètres
        </span>
        .
      </p>
      <p className="text-gray-700 py-1 leading-loose">
        Pour ce faire,{' '}
        <span className="font-bold text-primary-blue">
          prenez un mètre ruban et faites le tour de votre crâne au niveau du
          front
        </span>
        , juste au-dessus de vos sourcils.
      </p>
      <br />
      <p className="text-gray-700 py-1 leading-loose">
        Reportez la valeur ainsi mesurée ci-dessous pour connaitre la taille de
        casque qu'il vous faut.
      </p>
      <div className="mt-6">
        <div className="flex flex-col w-2/5 md:w-1/4">
          <Label for="head-size">Votre tour de tête:</Label>
          <Input
            type="number"
            min="52"
            max="62"
            id="head-size"
            name="head-size"
            placeholder="En cm"
            onChange={(event) => updateHeadSize(event)}
          />
          {helmet && (
            <p className="text-primary-blue mt-2">
              Taille du casque: <span className="font-semibold">{helmet}</span>
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default SizeHelmet;
