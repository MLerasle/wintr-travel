import { IoLogoFacebook } from 'react-icons/io5';
import SocialLink from './SocialLink';

const links = [
  {
    icon: IoLogoFacebook,
    name: 'Facebook',
    href: 'https://www.facebook.com/Wintr-Travel-104716271447577/',
  },
];

const SocialLinks = () => (
  <div className="mt-8 flex justify-center space-x-6">
    {links.map((link) => (
      <SocialLink
        key={link.name}
        name={link.name}
        icon={link.icon}
        href={link.href}
      />
    ))}
  </div>
);

export default SocialLinks;
