const Label = props => (
  <label className="text-gray-800 text-xs font-semibold uppercase tracking-wide mb-1" htmlFor={props.for}>
    {props.title}
  </label>
)

export default Label