import React from 'react';

const Input = React.forwardRef((props, ref) => (
  <input
    type={props.type}
    id={props.id}
    name={props.name}
    placeholder={props.placeholder}
    className={`border border-gray-300 rounded-lg px-2 py-2 h-12 focus:outline-none text-gray-800 appearance-none ${
      !props.readonly && 'focus:border-primary-green'
    } ${props.className}`}
    onChange={props.onChange}
    value={props.value}
    ref={ref}
    readOnly={props.readonly}
    min={props.min}
    max={props.max}
    step={props.step}
  />
));

export default Input;
