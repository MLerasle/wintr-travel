const Header = (props) => (
  <header className={`flex justify-between items-baseline ${props.className}`}>
    {props.children}
  </header>
);

export default Header;
