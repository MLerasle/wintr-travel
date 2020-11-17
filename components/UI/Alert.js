import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';

const Alert = ({ type, message, onClearMessage }) => (
  <div
    className={`relative m-4 md:m-0 md:mb-4 p-4 border rounded ${
      type === 'error'
        ? 'border-primary-red bg-light-red text-primary-red'
        : 'border-primary-green bg-lighter-green text-primary-green'
    }`}
  >
    <Icon
      path={mdiClose}
      size={0.9}
      className="absolute top-1/4 right-1/4 cursor-pointer"
      color={`${type === 'error' ? '#CA463F' : '#389469'}`}
      onClick={onClearMessage}
    />
    {message}
  </div>
);

export default Alert;
