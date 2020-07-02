const Checkbox = (props) => (
  <label className="custom-label flex mt-2 text-gray-700">
    <div
      className={`checkbox bg-white border rounded border-gray-300 w-6 h-6 flex flex-shrink-0 justify-center items-center mr-3 focus-within:border-secondary-blue ${
        props.error && 'bg-red-100 border-red-600'
      }`}
    >
      <input
        type="checkbox"
        className="opacity-0 absolute"
        value={props.value}
        checked={props.value}
        name={props.name}
        onChange={props.onChange}
        onKeyDown={(e) => {
          if (e.keyCode === 13 || e.keyCode === 32) {
            e.preventDefault();
            props.onChange();
          }
        }}
      />
      <svg
        className="fill-current hidden w-4 h-4 text-secondary-blue pointer-events-none"
        viewBox="0 0 20 20"
      >
        <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
      </svg>
    </div>
    <div className={`select-none ${props.error && 'text-red-600'}`}>
      {props.children}
    </div>
    <style jsx>
      {`
        input:checked + svg {
          display: block;
        }
      `}
    </style>
  </label>
);

export default Checkbox;
