const Label = props => (
  <label className="text-gray-700 text-xs font-semibold uppercase tracking-wide inline-block mb-1" htmlFor={props.for}>
    {props.title}
  </label>
)

export default Label