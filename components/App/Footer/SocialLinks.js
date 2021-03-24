import { IoLogoFacebook } from 'react-icons/io5';
import SocialLink from './SocialLink';

const SocialLinks = () => (
  <section className="flex items-center -ml-4">
    <SocialLink
      href="https://www.facebook.com/Wintr-Travel-104716271447577/"
      icon={IoLogoFacebook}
      color="#4267B2"
      ariaLabel="Facebook"
    />
  </section>
);

export default SocialLinks;
