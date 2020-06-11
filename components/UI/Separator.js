const Separator = (props) =>
  props.label ? (
    <div className="flex justify-between items-center">
      <div className={`w-1/2 h-0.2 bg-gray-300 ${props.className}`}></div>
      <div className="mx-2 text-gray-500 text-sm">{props.label}</div>
      <div className={`w-1/2 h-0.2 bg-gray-300 ${props.className}`}></div>
    </div>
  ) : (
    <div className={`w-full h-0.2 bg-gray-300 ${props.className}`}></div>
  );

export default Separator;
