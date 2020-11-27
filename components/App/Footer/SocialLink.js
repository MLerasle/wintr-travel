import Icon from '@mdi/react';

const SocialLink = (props) => (
  <a
    className="pl-4"
    href={props.href}
    aria-label={props.ariaLabel}
    target="_blank"
    rel="noreferrer"
  >
    <Icon path={props.icon} size={1} color={props.color} />
  </a>
);

export default SocialLink;
