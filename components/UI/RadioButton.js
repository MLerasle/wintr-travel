const RadioButton = (props) => (
  <label
    className={`relative p-3 flex cursor-pointer rounded border shadow-sm flex-1 ${
      props.selected === props.value
        ? 'border-green-600 bg-green-50'
        : 'border-gray-200'
    } hover:shadow`}
  >
    <input
      type="radio"
      name={props.name}
      value={props.value}
      className="absolute invisible"
      onChange={props.onChange}
    />
    {props.children}
  </label>
);

export default RadioButton;
