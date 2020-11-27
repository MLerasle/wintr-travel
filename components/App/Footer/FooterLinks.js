import FooterLink from './FooterLink';

const FooterLinks = () => (
  <section className="md:flex md:flex-row md:items-center text-sm">
    <p className="mb-1 md:mb-0 md:mr-4">
      © {new Date().getFullYear()} Wintr Travel, Tous droits réservés{' '}
    </p>
    <ul className="flex items-center mb-4 md:mb-0">
      <FooterLink href="about">À propos</FooterLink>
      <FooterLink href="terms">CGV</FooterLink>
      <FooterLink href="/privacy">Confidentialité</FooterLink>
    </ul>
  </section>
);

export default FooterLinks;
