const Input = (props) => (
  <input
    type={props.type}
    id={props.id}
    name={props.name}
    placeholder={props.placeholder}
    className={`border border-gray-300 rounded-lg px-2 py-2 h-12 focus:outline-none text-gray-800 appearance-none ${
      !props.readonly && 'focus:border-secondary-blue'
    } ${props.className}`}
    onChange={props.onChange}
    value={props.value}
    readOnly={props.readonly}
    min={props.min}
    max={props.max}
    step={props.step}
  />
);

export default Input;
