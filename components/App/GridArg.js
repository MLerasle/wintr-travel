const GridArg = (props) => (
  <>
    <h2 className="text-2xl sm:text-3xl font-bold pb-2 text-gray-800 leading-tight">
      {props.title}
    </h2>
    <p className="text-gray-600 text-md sm:text-lg lg:text-xl">
      {props.children}
    </p>
  </>
);

export default GridArg;
