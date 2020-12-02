import Link from 'next/link';

const NavItems = (props) => {
  const sections = [
    {
      name: '',
      key: 'other',
      links: [
        {
          label: 'La Marque',
          href: '/brand',
        },
        // {
        //   label: 'Notre offre',
        //   href: '/offer',
        // },
        {
          label: 'Guide des Tailles',
          href: '/sizes',
        },
        {
          label: 'Tarif',
          href: '/prices',
        },
        {
          label: 'FAQ',
          href: '/faq',
        },
      ],
    },
    {
      name: 'Mentions légales',
      key: 'legal',
      links: [
        { label: 'Confidentialité', href: '/privacy' },
        { label: 'CGV', href: '/terms' },
      ],
    },
  ];

  const navItemClicked = () => {
    if (props.onItemClick) {
      props.onItemClick();
    }
  };

  return (
    <div className={`pb-2 md:flex md:p-0`}>
      {sections.map(({ name, key, links }) => (
        <div className="md:flex" key={key}>
          <div
            className={`md:hidden py-2 px-4 uppercase tracking-wide text-sm text-gray-600 ${
              key === 'other' ? '' : 'mt-4'
            }`}
          >
            {name}
          </div>
          {links.map(({ label, href }) => (
            <Link href={href} prefetch={false} key={`nav-link-${label}`}>
              <a
                className={`block px-6 py-3 border-b bg-white border-gray-300 tracking-wide transition duration-300 ease-in-out hover:text-primary-green md:hover:text-primary-green md:bg-transparent md:text-md md:text-gray-800 md:border-b-0 md:mt-0 md:ml-2 md:px-2 cursor-pointer ${
                  key === 'legal' ? 'md:hidden' : ''
                }`}
                onClick={navItemClicked}
              >
                {label}
              </a>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default NavItems;
