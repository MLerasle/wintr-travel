import { useState } from 'react';

import Label from '@/UI/Label';

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
      {props.withDetails && <h2>Taille du casque</h2>}
      <p>
        Vous devez <strong>mesurer votre tour de tête en centimètres</strong>.
      </p>
      <p>
        Pour ce faire,{' '}
        <strong>
          prenez un mètre ruban et faites le tour de votre crâne au niveau du
          front
        </strong>
        , juste au-dessus de vos sourcils.
      </p>
      <p>
        Reportez la valeur ainsi mesurée ci-dessous pour connaitre la taille de
        casque qu'il vous faut.
      </p>
      <div className="mt-6">
        <div className="flex flex-col">
          <form>
            <Label for="head-size">
              Votre tour de tête (comprise entre 52 et 62cm):
            </Label>
            <input
              type="number"
              className="input w-full"
              min="52"
              max="62"
              id="head-size"
              name="head-size"
              placeholder="En cm"
              onChange={(event) => updateHeadSize(event)}
            />
          </form>
          {helmet && (
            <p>
              <strong>
                Taille du casque:{' '}
                <span className="font-semibold">{helmet}</span>
              </strong>
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default SizeHelmet;
