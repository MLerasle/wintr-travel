const Label = (props) => (
  <label
    className="text-gray-800 text-xs font-semibold uppercase tracking-wider inline-block mb-1"
    htmlFor={props.for}
  >
    {props.children}
  </label>
);

export default Label;
