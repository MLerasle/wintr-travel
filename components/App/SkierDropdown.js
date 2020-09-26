import { useState, useRef, useEffect } from 'react';

import Label from '@/UI/Label';
import Counter from '@/UI/Counter';

const SkierInput = (props) => {
  const node = useRef();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  const handleClick = (e) => {
    if (node.current.contains(e.target)) {
      return;
    }
    setIsOpen(false);
  };

  const inputValue = () => {
    if (props.adultsCount === 0 && props.childrenCount === 0) {
      return '';
    }
    const adultsLabel = props.adultsCount > 1 ? 'Adultes' : 'Adulte';
    const childrenLabel = props.childrenCount > 1 ? 'Enfants' : 'Enfant';
    let skiers = `${props.adultsCount} ${adultsLabel}`;
    if (props.childrenCount > 0) {
      skiers += ` - ${props.childrenCount} ${childrenLabel}`;
    }
    return skiers;
  };

  const onFocusInput = () => {
    setIsOpen(true);
    document.querySelector('.resetSkiers path').style.fill = '#4a5568';
  };

  const onBlurInput = () => {
    document.querySelector('.resetSkiers path').style.fill = '#e3e8ef';
  };

  return (
    <div ref={node} className="relative w-full z-40">
      <Label for="skiersInput">Skieurs</Label>
      <input
        type="text"
        readOnly
        id="skiersInput"
        className="border border-gray-300 rounded-lg px-2 py-2 h-12 focus:outline-none focus:border-secondary-blue w-full text-gray-800 appearance-none"
        style={{ paddingLeft: '10px' }}
        onFocus={onFocusInput}
        onBlur={onBlurInput}
        placeholder="Ajouter des skieurs"
        value={inputValue()}
      />
      <svg
        height="20"
        width="20"
        viewBox="0 0 20 20"
        aria-hidden="true"
        focusable="false"
        className="css-6q0nyr-Svg resetSkiers"
        onClick={() => props.onChange('reset')}
        style={{
          display:
            props.adultsCount > 0 || props.childrenCount > 0 ? 'block' : 'none',
        }}
      >
        <path
          d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"
          fill="#e3e8ef"
        ></path>
      </svg>
      <div
        className={
          'bg-white rounded-lg shadow-md p-6 border border-gray-300 mt-2 w-full absolute ' +
          (isOpen ? 'block' : 'hidden')
        }
      >
        <div className="flex justify-between items-center">
          <label className="text-gray-800 text-md font-semibold tracking-wide">
            Adultes
          </label>
          <Counter
            value={props.adultsCount}
            label="adults"
            onIncrement={(e) => {
              e.preventDefault();
              props.onChange('increment', 'adult');
            }}
            onDecrement={(e) => {
              e.preventDefault();
              props.onChange('decrement', 'adult');
            }}
          />
        </div>
        <div className="flex justify-between items-center mt-6">
          <label className="text-gray-800 text-md font-semibold tracking-wide">
            Enfants
          </label>
          <Counter
            value={props.childrenCount}
            label="children"
            onIncrement={(e) => {
              e.preventDefault();
              props.onChange('increment', 'child');
            }}
            onDecrement={(e) => {
              e.preventDefault();
              props.onChange('decrement', 'child');
            }}
          />
        </div>
      </div>

      <style jsx>{`
        .resetSkiers {
          position: absolute;
          top: 41px;
          right: 8px;
        }

        .resetSkiers path:hover {
          fill: #a3aebe !important;
        }
      `}</style>
    </div>
  );
};

export default SkierInput;
