import React from 'react';

import { getDayNumber } from 'helpers/dates';

const RadioButtons = React.forwardRef((props, ref) => (
  <div
    className={`w-full text-gray-800 bg-white rounded-lg flex cursor-pointer appearance-none ${
      !props.withDateFormatting && 'h-12'
    }`}
  >
    {props.items.map((item, index) => (
      <label
        key={item}
        className={`flex-grow flex justify-center items-center border border-gray-300 focus:outline-none ${
          index < props.items.length - 1 ? 'border-r-0' : 'rounded-r-lg'
        } ${index === 0 && 'rounded-l-lg'} ${
          item === props.selected
            ? 'bg-light-green border-light-green'
            : 'hover:bg-lighter-green'
        }`}
      >
        <input
          type="radio"
          id={`${props.name}-${item}`}
          name={props.name}
          value={item}
          onChange={props.onChange}
          ref={ref}
          className="absolute invisible"
        />
        {props.withDateFormatting ? (
          <div className="w-full text-center">
            <header className="text-gray-600">Samedi</header>
            <main>
              <section className="text-2xl font-bold">
                {getDayNumber(item)}
              </section>
            </main>
          </div>
        ) : (
          item
        )}
      </label>
    ))}
  </div>
));

export default RadioButtons;
