const Label = (props) => (
  <label
    className="text-gray-800 font-semibold inline-block mb-1"
    htmlFor={props.for}
  >
    {props.children}
  </label>
);

export default Label;
