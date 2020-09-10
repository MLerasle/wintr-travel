import FooterLinks from './FooterLinks';
import SocialLinks from './SocialLinks';

const Footer = (props) => {
  return (
    <footer className="flex sm:justify-center sm:items-center">
      <div
        className={`flex flex-col sm:flex-row sm:justify-between sm:items-center text-gray-700 px-6 py-6 xxl:px-0 sm:py-0 w-full h-32 sm:h-16 ${
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
