import { useRouter } from 'next/router';
import Link from 'next/link';

const NavItems = (props) => {
  const router = useRouter();

  const sections = [
    {
      name: '',
      key: 'other',
      links: [
        // {
        //   label: t('common:label.about'),
        //   href: `/${lang}/about`,
        // },
        {
          label: 'Matériel',
          href: '/offer',
        },
        {
          label: 'Tailles',
          href: '/sizes',
        },
        {
          label: 'Tarif',
          href: '/price',
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
    <div className={`pb-2 sm:flex sm:p-0`}>
      {sections.map(({ name, key, links }) => (
        <div className="sm:flex" key={key}>
          <div
            className={`sm:hidden py-2 px-4 uppercase tracking-wide text-sm text-gray-600 ${
              key === 'other' ? '' : 'mt-4'
            }`}
          >
            {name}
          </div>
          {links.map(({ label, href }) => (
            <Link
              href={{
                pathname: href,
                query: router.query,
              }}
              key={`nav-link-${label}`}
            >
              <a
                className={`block px-6 py-3 border-b bg-white border-gray-300 tracking-wide transition duration-300 ease-in-out hover:text-gray-600 sm:hover:text-gray-600 sm:bg-transparent sm:text-md sm:text-gray-800 sm:border-b-0 sm:mt-0 sm:ml-2 sm:px-2 cursor-pointer ${
                  key === 'legal' ? 'sm:hidden' : ''
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
