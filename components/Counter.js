import React from 'react';
import Icon from '@mdi/react'
import { mdiPlus, mdiMinus } from '@mdi/js'

const Counter = props => {
  return (
    <div className="flex justify-between items-center w-32">
      <button
        name="decrement"
        aria-label={`decrement ${props.label}`}
        className="p-1 rounded-full bg-white border border-secondary-blue focus:outline-none focus:shadow-outline"
        style={{
          opacity: props.value > 0 ? 1 : 0.3,
          cursor: props.value > 0 ? 'pointer' : 'default'
        }}
        onClick={props.onDecrement}>
        <Icon path={mdiMinus} size={1} color="#0CB3FA" />
      </button>
      <div className="text-gray-700 mx-5 font-semibold">{props.value}</div>
      <button
        name="increment"
        aria-label={`increment ${props.label}`}
        className="p-1 rounded-full bg-secondary-blue border border-secondary-blue focus:outline-none focus:shadow-outline"
        onClick={props.onIncrement}>
        <Icon path={mdiPlus} size={1} color="white" />
      </button>
    </div>
  );
};

export default Counter;