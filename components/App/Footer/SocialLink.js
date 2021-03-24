import React from 'react';
import { IconContext } from 'react-icons';

const SocialLink = (props) => (
  <a
    className="pl-4"
    href={props.href}
    aria-label={props.ariaLabel}
    target="_blank"
    rel="noreferrer"
  >
    <IconContext.Provider value={{ color: props.color, size: '1.5rem' }}>
      {React.createElement(props.icon)}
    </IconContext.Provider>
  </a>
);

export default SocialLink;
