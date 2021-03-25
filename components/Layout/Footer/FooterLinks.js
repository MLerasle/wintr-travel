import FooterLink from './FooterLink';

const links = [
  { title: 'À propos', href: '/about' },
  // { title: 'CGV', href: '/terms' },
  { title: 'Confidentialité', href: '/privacy' },
  { title: 'Contact', href: '/contact' },
];

const FooterLinks = () => (
  <nav
    className="-mx-5 -my-2 flex flex-wrap justify-center"
    aria-label="Footer"
  >
    {links.map((link) => (
      <FooterLink key={link.title} title={link.title} href={link.href} />
    ))}
  </nav>
);

export default FooterLinks;
