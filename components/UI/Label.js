const Label = (props) => (
  <label className="block font-medium text-gray-700 mb-1" htmlFor={props.for}>
    {props.children}
  </label>
);

export default Label;
