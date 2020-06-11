import { useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';

import { LocaleContext } from 'context/LocaleContext';

const NavItems = () => {
  const router = useRouter();
  const { t, lang } = useTranslation();
  const { storeLocale } = useContext(LocaleContext);

  const links = [
    { label: 'English', locale: 'en' },
    { label: 'Français', locale: 'fr' },
    { label: `${t('common:help')}`, href: `/${lang}/help` },
  ].map((link) => {
    link.key = `nav-link-${link.locale}`;
    return link;
  });

  const localizedPath = (locale) => {
    let currentPath = router.pathname;
    // Remove locale part of the current url
    currentPath = currentPath.replace('/en', '').replace('/fr', '');
    return `/${locale}${currentPath}`;
  };

  return (
    <div className={`sm:px-6 pb-2 sm:flex sm:p-0`}>
      {links.map(({ label, href, key, locale }) => (
        <Link
          href={{
            pathname: href || localizedPath(locale),
            query: router.query,
          }}
          key={key}
        >
          <a
            className="mt-1 block px-6 py-2 border-b border-gray-300 tracking-wide text-lg text-gray-800 hover:text-gray-600 sm:text-base sm:text-white sm:hover:text-gray-300 sm:border-b-0 sm:mt-0 sm:ml-2 sm:px-2 cursor-pointer"
            onClick={() => storeLocale(locale)}
          >
            {label}
          </a>
        </Link>
      ))}
    </div>
  );
};

export default NavItems;
