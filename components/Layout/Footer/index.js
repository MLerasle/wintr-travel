import FooterLinks from './FooterLinks';
import SocialLinks from './SocialLinks';

const Footer = () => {
  return (
    <footer className="bg-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <FooterLinks />
        <SocialLinks />
        <p className="mt-8 text-center text-base text-gray-400">
          &copy; {new Date().getFullYear()} Wintr Travel. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
