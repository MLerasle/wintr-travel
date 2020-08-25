import { useRouter } from 'next/router';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';

const NavItems = (props) => {
  const router = useRouter();
  const { t, lang } = useTranslation();

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
          label: 'Notre offre',
          href: `/${lang}/offer`,
        },
      ],
    },
    {
      name: t('common:label.language'),
      key: 'lang',
      links: [
        { label: 'English', locale: 'en' },
        { label: 'Français', locale: 'fr' },
      ],
    },
    {
      name: t('common:label.legal'),
      key: 'legal',
      links: [
        { label: t('common:label.privacy'), href: `/${lang}/privacy` },
        { label: t('common:label.terms'), href: `/${lang}/terms` },
      ],
    },
  ];

  const localizedPath = (locale) => {
    let currentPath = router.pathname;
    // Remove locale part of the current url
    currentPath = currentPath.replace('/en', '').replace('/fr', '');
    return `/${locale}${currentPath}`;
  };

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
          {links.map(({ label, locale, href }) => (
            <Link
              href={{
                pathname: href || localizedPath(locale),
                query: router.query,
              }}
              key={`nav-link-${label}`}
            >
              <a
                className={`block px-6 py-3 border-b bg-white border-gray-300 tracking-wide ${
                  locale === lang ? 'text-secondary-blue' : 'text-gray-800'
                } transition duration-300 ease-in-out hover:text-gray-600 sm:hover:text-gray-600 sm:bg-transparent sm:text-base sm:text-gray-800 sm:border-b-0 sm:mt-0 sm:ml-2 sm:px-2 cursor-pointer ${
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
