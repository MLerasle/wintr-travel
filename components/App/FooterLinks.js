import useTranslation from 'next-translate/useTranslation';

import FooterLink from 'components/App/FooterLink';

const FooterLinks = () => {
  const { t, lang } = useTranslation();

  return (
    <section className="sm:flex sm:flex-row sm:items-center text-sm">
      <p className="mb-1 sm:mb-0 md:mr-4">
        © {new Date().getFullYear()} Wintr Travel, {t('common:label.rights')}{' '}
      </p>
      <ul className="flex items-center mb-4 sm:mb-0">
        <FooterLink href={`/${lang}/about`}>
          {t('common:label.about')}
        </FooterLink>
        <FooterLink href={`/${lang}/terms`}>
          {t('common:label.terms')}
        </FooterLink>
        <FooterLink href={`/${lang}/privacy`}>
          {t('common:label.privacy')}
        </FooterLink>
      </ul>
    </section>
  );
};

export default FooterLinks;
