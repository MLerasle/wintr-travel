import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import Icon from '@mdi/react';
import { mdiTwitter, mdiFacebook, mdiInstagram } from '@mdi/js';

const Footer = () => {
  const { t, lang } = useTranslation();

  return (
    <footer className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-gray-700 px-6 py-6 w-full border-t border-gray-500">
      <section className="sm:flex sm:flex-row sm:items-center text-sm">
        <p className="mb-1 sm:mb-0 md:mr-4">
          © {new Date().getFullYear()} Wintr Travel, {t('common:label.rights')}{' '}
        </p>
        <ul className="flex items-center mb-4 sm:mb-0">
          <li className="mr-3 md:mr-4 tracking-wide">
            <Link href={`/${lang}/about`}>
              <a className="hover:underline">{t('common:label.about')}</a>
            </Link>
          </li>
          <li className="mr-3 md:mr-4 tracking-wide">
            <Link href={`/${lang}/terms`}>
              <a className="hover:underline">{t('common:label.terms')}</a>
            </Link>
          </li>
          <li className="mr-3 md:mr-4 tracking-wide">
            <Link href={`/${lang}/privacy`}>
              <a className="hover:underline">{t('common:label.privacy')}</a>
            </Link>
          </li>
        </ul>
      </section>
      <section className="flex items-center">
        <a className="sm:pl-4" href="https://twitter.com">
          <Icon path={mdiTwitter} size={1} color="#2D3748" />
        </a>
        <a className="pl-4" href="https://facebook.com">
          <Icon path={mdiFacebook} size={1} color="#2D3748" />
        </a>
        <a className="pl-4" href="https://instagram.com">
          <Icon path={mdiInstagram} size={1} color="#2D3748" />
        </a>
      </section>
    </footer>
  );
};

export default Footer;
