import FooterLinks from './FooterLinks';
import SocialLinks from './SocialLinks';

const Footer = (props) => {
  return (
    <footer className="flex sm:justify-center sm:items-center px-4">
      <div
        className={`flex flex-col sm:flex-row sm:justify-between sm:items-center text-gray-700 py-6 sm:py-0 w-full h-32 sm:h-16 ${
          props.maxWidth ? props.maxWidth : 'max-w-screen-lg'
        }`}
      >
        <FooterLinks />
        <SocialLinks />
      </div>
    </footer>
  );
};

export default Footer;
