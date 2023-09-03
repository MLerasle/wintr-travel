const Card = (props) => (
  <div
    className={`flex flex-col items-start md:items-center ${
      props.classes && props.classes
    }`}
  >
    <div
      className={`bg-white md:rounded-lg md:shadow-md w-full ${
        props.subclasses && props.subclasses
      }`}
    >
      {props.children}
    </div>
  </div>
);

export default Card;
