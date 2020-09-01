import Icon from '@mdi/react';

const SocialLink = (props) => (
  <a className="pl-4" href={props.href}>
    <Icon path={props.icon} size={1} color="#2D3748" />
  </a>
);

export default SocialLink;
