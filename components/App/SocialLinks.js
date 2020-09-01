import { mdiTwitter, mdiFacebook, mdiInstagram } from '@mdi/js';
import SocialLink from 'components/App/SocialLink';

const SocialLinks = () => (
  <section className="flex items-center -ml-4">
    <SocialLink href="https://twitter.com" icon={mdiTwitter} />
    <SocialLink href="https://facebook.com" icon={mdiFacebook} />
    <SocialLink href="https://instagram.com" icon={mdiInstagram} />
  </section>
);

export default SocialLinks;
