const Backdrop = (props) =>
  props.show ? (
    <div
      className="w-full h-full fixed top-0 left-0 z-200 bg-black bg-opacity-75 sm:hidden"
      onClick={props.clicked}
    ></div>
  ) : null;

export default Backdrop;
