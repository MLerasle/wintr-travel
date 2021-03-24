import FooterLinks from './FooterLinks';
import SocialLinks from './SocialLinks';

const Footer = (props) => {
  return (
    <footer className="flex md:justify-center md:items-center px-4">
      <div
        className={`flex flex-col md:flex-row md:justify-between md:items-center text-gray-700 py-6 md:py-0 w-full h-32 md:h-16 ${
          props.maxWidth ? props.maxWidth : 'max-w-screen-xl'
        }`}
      >
        <FooterLinks />
        <SocialLinks />
      </div>
    </footer>
  );
};

export default Footer;
