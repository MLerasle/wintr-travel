import FooterLinks from 'components/App/FooterLinks';
import SocialLinks from 'components/App/SocialLinks';

const Footer = () => {
  return (
    <footer className="flex sm:justify-center sm:items-center">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-gray-700 px-6 py-6 sm:py-0 w-full h-32 sm:h-16 max-w-screen-xxl">
        <FooterLinks />
        <SocialLinks />
      </div>
    </footer>
  );
};

export default Footer;
