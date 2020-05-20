const Input = (props) => (
  <input
    type={props.type}
    id={props.id}
    name={props.name}
    placeholder={props.placeholder}
    className={`border border-gray-300 rounded-lg px-2 py-2 h-12 focus:outline-none focus:border-secondary-blue w-full text-gray-800 appearance-none ${props.className}`}
  />
);

export default Input;
