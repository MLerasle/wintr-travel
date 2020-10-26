import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';

const Alert = ({ type, message, onClearMessage }) => (
  <div
    className={`relative m-4 md:m-0 md:mb-4 p-4 border rounded ${
      type === 'error'
        ? 'border-red-600 bg-red-100 text-red-600'
        : 'border-green-700 bg-green-100 text-green-700'
    }`}
  >
    <Icon
      path={mdiClose}
      size={0.9}
      className="absolute top-1/4 right-1/4 cursor-pointer"
      color={`${type === 'error' ? '#E53E3E' : '#38A169'}`}
      onClick={onClearMessage}
    />
    {message}
  </div>
);

export default Alert;
