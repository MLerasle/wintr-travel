const Label = props => (
  <label className="text-gray-700 text-sm font-semibold uppercase tracking-wide md:tracking-wider inline-block mb-1" htmlFor={props.for}>
    {props.title}
  </label>
)

export default Label