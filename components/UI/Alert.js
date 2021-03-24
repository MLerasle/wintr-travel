import { IconContext } from 'react-icons';
import { IoCloseOutline } from 'react-icons/io5';

const Alert = ({ type, message, onClearMessage }) => (
  <div
    className={`relative m-4 md:m-0 md:mb-4 p-4 border rounded ${
      type === 'error'
        ? 'border-primary-red bg-light-red text-primary-red'
        : 'border-primary-green bg-lighter-green text-primary-green'
    }`}
  >
    <IconContext.Provider
      value={{
        color: type === 'error' ? '#CA463F' : '#389469',
        size: '1.5rem',
        className: 'absolute top-1/4 right-1/4 cursor-pointer',
      }}
    >
      <div onClick={onClearMessage}>
        <IoCloseOutline />
      </div>
    </IconContext.Provider>
    {message}
  </div>
);

export default Alert;
