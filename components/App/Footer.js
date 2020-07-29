import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import Icon from '@mdi/react';
import { mdiTwitter, mdiFacebook, mdiInstagram } from '@mdi/js';

const Footer = () => {
  const { t, lang } = useTranslation();

  return (
    <footer className="flex justify-between items-center bg-gray-200 text-gray-700 px-6 py-6 absolute bottom-0 w-full border-t border-gray-500">
      <section className="hidden md:block">
        <p>
          © {new Date().getFullYear()} Wintr Travel, {t('common:label.rights')}.
        </p>
      </section>
      <section>
        <ul className="flex items-center">
          <li className="mr-3 md:mr-4 tracking-wide">
            <Link href={`/${lang}/about`}>
              <a className="text-sm md:text-base hover:underline">
                {t('common:label.about')}
              </a>
            </Link>
          </li>
          <li className="mr-3 md:mr-4 tracking-wide">
            <Link href={`/${lang}/terms`}>
              <a className="text-sm md:text-base hover:underline">
                {t('common:label.terms')}
              </a>
            </Link>
          </li>
          <li className="mr-3 md:mr-4 tracking-wide">
            <Link href={`/${lang}/privacy`}>
              <a className="text-sm md:text-base hover:underline">
                {t('common:label.privacy')}
              </a>
            </Link>
          </li>
        </ul>
      </section>
      <section className="flex items-center">
        <a className="pl-2 md:pl-3" href="https://twitter.com">
          <Icon path={mdiTwitter} size={1} color="black" />
        </a>
        <a className="pl-2 md:pl-3" href="https://facebook.com">
          <Icon path={mdiFacebook} size={1} color="black" />
        </a>
        <a className="pl-2 md:pl-3" href="https://instagram.com">
          <Icon path={mdiInstagram} size={1} color="black" />
        </a>
      </section>
    </footer>
  );
};

export default Footer;
