const cartItem = (props) => (
  <div className={`flex justify-between items-center ${props.classes}`}>
    <h3 className="text-gray-600">{props.title}</h3>
    <p className="text-gray-800 font-semibold">{props.value}</p>
  </div>
);

export default cartItem;
