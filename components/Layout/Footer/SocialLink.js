import React from 'react';
import { IconContext } from 'react-icons';

const SocialLink = ({ name, icon, href }) => (
  <a
    href={href}
    target="_blank"
    className="text-gray-400 hover:text-gray-300"
    rel="noreferrer"
  >
    <span className="sr-only">{name}</span>
    <IconContext.Provider value={{ size: '1.5rem' }}>
      {React.createElement(icon)}
    </IconContext.Provider>
  </a>
);

export default SocialLink;
