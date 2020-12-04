const Textarea = (props) => (
  <textarea
    id={props.id}
    name={props.name}
    placeholder={props.placeholder}
    rows={props.rows}
    cols={props.cols}
    className={`border border-gray-300 rounded-lg px-2 py-2 focus:outline-none text-gray-800 appearance-none ${
      !props.readonly && 'focus:border-primary-green'
    } ${props.className}`}
    onChange={props.onChange}
    value={props.value}
  ></textarea>
);

export default Textarea;
