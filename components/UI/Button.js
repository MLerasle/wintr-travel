const Button = (props) => {
  let classes =
    'font-bold h-12 md:px-16 rounded-lg shadow-md focus:outline-none focus:shadow-custom-outline z-0 ';
  if (props.classes) {
    classes += `${props.classes} `;
  }
  if (props.disabled) {
    classes += 'opacity-40 cursor-not-allowed';
  } else {
    classes += 'transition duration-300 ease-in-out hover:opacity-90';
  }

  return (
    <button
      id={props.id}
      name={props.name}
      aria-label={props.ariaLabel}
      className={classes}
      onClick={props.onClick}
      type={props.type}
    >
      {props.children}
    </button>
  );
};

export default Button;
