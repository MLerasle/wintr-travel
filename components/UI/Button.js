const Button = (props) => {
  let classes =
    'bg-secondary-blue text-white font-bold py-3 px-4 w-full rounded-lg shadow-md focus:outline-none focus:shadow-outline z-0 ';
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
