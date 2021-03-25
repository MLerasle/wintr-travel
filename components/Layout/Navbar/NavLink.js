import Link from 'next/link';

const NavLink = ({ title, href, className, onClick }) => (
  <Link href={href}>
    <a
      className={`border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 ${className} font-medium`}
      onClick={onClick}
    >
      {title}
    </a>
  </Link>
);

export default NavLink;
