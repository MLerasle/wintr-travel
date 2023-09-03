import Navlink from '@/Layout/Navbar/NavLink';

const NavLinks = ({ device, onLinkClicked }) => {
  const links = [
    { title: 'Tarif', href: '/prices' },
    { title: 'Guide des tailles', href: '/sizes' },
    { title: 'FAQ', href: '/faq' },
  ];

  if (device === 'mobile') {
    return (
      <div className="md:hidden" id="mobile-menu">
        <div className="pt-2 pb-3 space-y-1">
          {links.map((link) => (
            <Navlink
              key={link.title}
              title={link.title}
              href={link.href}
              className="hover:bg-gray-50 block pl-3 pr-4 py-2 border-l-4 text-base sm:pl-5 sm:pr-6"
              onClick={onLinkClicked}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="hidden md:ml-6 md:flex md:space-x-8">
      {links.map((link) => (
        <Navlink
          key={link.title}
          title={link.title}
          href={link.href}
          className="inline-flex items-center px-1 pt-1 border-b-2"
        />
      ))}
    </div>
  );
};

export default NavLinks;
