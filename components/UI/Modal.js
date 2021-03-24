import { IconContext } from 'react-icons';
import { IoCloseOutline } from 'react-icons/io5';

const Modal = (props) => (
  <div
    className={`fixed z-10 inset-0 overflow-y-auto transition transform ${
      props.open ? 'translate-y-0 opacity-1' : '-translate-y-full opacity-0'
    }`}
  >
    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div
        className={`fixed inset-0 transition-opacity duration-300 ease-out ${
          props.open ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={props.closed}
      >
        <div className="absolute inset-0 bg-black opacity-75"></div>
      </div>
      {/* This element is to trick the browser into centering the modal contents.  */}
      <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
      <div
        className={`inline-block align-bottom bg-white rounded-lg text-left overflow-scroll shadow-xl transform transition-all duration-300 ease-out sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full ${
          props.open
            ? 'opacity-100 translate-y-0 sm:scale-100'
            : 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div className="absolute top-3/4 right-3/4">
          <IconContext.Provider
            value={{
              color: '#2d3748',
              size: '2rem',
              className: 'cursor-pointer',
            }}
          >
            <div onClick={props.closed}>
              <IoCloseOutline />
            </div>
          </IconContext.Provider>
        </div>
        {props.children}
      </div>
    </div>
  </div>
);

export default Modal;
