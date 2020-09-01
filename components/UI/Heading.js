const Heading = (props) => (
  <h1
    className={`flex items-center leading-tight font-bold text-gray-800 ${props.className}`}
  >
    {props.children}
    <style jsx>{`
      .homeTitle {
        position: absolute;
        bottom: 16px;
        left: 16px;
        color: white;
        font-weight: 700;
        font-size: 1.8rem;
      }

      @media (min-width: 640px) {
        .homeTitle {
          font-size: 1.9rem;
        }
      }
    `}</style>
  </h1>
);

export default Heading;
