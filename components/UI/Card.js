const Card = (props) => (
  <div
    className={`flex flex-col items-start md:items-center md:py-6 ${
      props.classes && props.classes
    }`}
  >
    <div
      className={`bg-white md:rounded-lg md:shadow-xl p-4 md:p-8 w-full ${
        props.subclasses && props.subclasses
      }`}
    >
      {props.children}
    </div>
  </div>
);

export default Card;
