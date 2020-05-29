const Checkbox = (props) => (
  <label className="custom-label flex mt-2 text-gray-700">
    <div className="border bg-white border-gray-300 rounded w-6 h-6 p-1 flex justify-center items-center mr-3">
      <input
        type="checkbox"
        className="hidden"
        value={props.value}
        onChange={props.onChange}
      />
      <svg
        className="hidden w-4 h-4 text-secondary-blue pointer-events-none"
        viewBox="0 0 172 172"
      >
        <g
          fill="none"
          strokeWidth="none"
          strokeMiterlimit="10"
          fontFamily="none"
          fontWeight="none"
          fontSize="none"
          textAnchor="none"
          style={{ mixBlendMode: 'normal' }}
        >
          <path d="M0 172V0h172v172z" />
          <path
            d="M145.433 37.933L64.5 118.8658 33.7337 88.0996l-10.134 10.1341L64.5 139.1341l91.067-91.067z"
            fill="currentColor"
            strokeWidth="1"
          />
        </g>
      </svg>
    </div>
    <span className="select-none">{props.children}</span>
    <style jsx>
      {`
        .custom-label input:checked + svg {
          display: block !important;
        }
      `}
    </style>
  </label>
);

export default Checkbox;
