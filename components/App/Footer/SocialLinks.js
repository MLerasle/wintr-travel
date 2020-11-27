import { mdiFacebook } from '@mdi/js';
import SocialLink from './SocialLink';

const SocialLinks = () => (
  <section className="flex items-center -ml-4">
    <SocialLink
      href="https://www.facebook.com/Wintr-Travel-104716271447577/"
      icon={mdiFacebook}
      color="#4267B2"
      ariaLabel="Facebook"
    />
  </section>
);

export default SocialLinks;
