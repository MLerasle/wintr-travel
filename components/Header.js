const Header = (props) => (
  <h1 className={`text-2xl leading-tight font-semibold text-gray-800 ${props.className}`}>
    {props.children}
    <style jsx>{`
      .homeTitle {
        position: absolute;
        bottom: 16px;
        left: 24px;
        color: white;
        font-weight: 700;
      }

      @media (min-width: 640px) {
        font-size: 1.875rem;
      }
    `}</style>
  </h1>
)

export default Header