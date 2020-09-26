import { useState } from 'react';
import Icon from '@mdi/react';
import { mdiSwapHorizontal } from '@mdi/js';

import Label from '@/UI/Label';
import Input from '@/UI/Input';

import { SHOES } from 'data/sizes';

const SizeShoes = (props) => {
  const [mondopoint, setMondopoint] = useState('');

  const updateShoeSize = (event) => {
    setMondopoint('');
    const shoe = SHOES.find((s) => s.shoeSize === event.target.value);
    if (!shoe) {
      return;
    }
    setMondopoint(shoe.mondopoint);
  };

  return (
    <>
      {props.withDetails && (
        <h3 className="text-2xl font-bold text-gray-800 pb-4 pt-8">
          2. Chaussures
        </h3>
      )}
      <p className="text-gray-600 py-1 leading-loose">
        La pointure des chaussures de skis se mesure en Mondopoint, ce qui
        correspond à la{' '}
        <span className="font-bold text-blue-700">
          taille de votre pied en centimètres
        </span>
        .
      </p>
      <p className="text-gray-600 py-1 leading-loose">
        Pour connaitre celle-ci,{' '}
        <span className="font-bold text-blue-700">
          placez une feuille au sol contre un mur et posez votre pied dessus en
          collant votre talon au mur
        </span>
        .
      </p>
      <p className="text-gray-600 py-1 leading-loose">
        Tracez un trait devant le plus long doigt de pied,{' '}
        <span className="font-bold text-blue-700">
          mesurez et ajoutez un centimètre
        </span>
        .
      </p>
      {props.withDetails && (
        <>
          <br />
          <p className="text-gray-600 py-1 leading-loose">
            De manière alternative, vous pouvez utiliser notre convertisseur
            ci-dessous pour{' '}
            <span className="font-bold text-blue-700">estimer</span> la taille
            de votre pied en centimètres.
          </p>
          <div className="mt-6 flex items-end">
            <div className="flex flex-col w-2/5 md:w-1/4">
              <Label for="shoe-size">Pointure</Label>
              <Input
                type="number"
                min="35"
                max="51"
                step="0.5"
                id="shoe-size"
                name="shoe-size"
                placeholder="Taille EU"
                onChange={(event) => updateShoeSize(event)}
              />
            </div>
            <Icon
              path={mdiSwapHorizontal}
              size={2}
              className="mx-1 sm:mx-4"
              color="#2D3748"
            />
            <div className="flex flex-col w-2/5 md:w-1/4">
              <Label for="mondopoint">Taille en cm</Label>
              <Input
                type="text"
                id="mondopoint"
                name="mondopoint"
                value={mondopoint}
                readonly
                className="bg-gray-100 cursor-not-allowed"
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SizeShoes;
