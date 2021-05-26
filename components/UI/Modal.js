import { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { IconContext } from 'react-icons';
import { HiOutlineExclamation } from 'react-icons/hi';

import Loader from '@/UI/Loader';

const Modal = ({
  isOpened,
  isLoading,
  onValidate,
  onCancel,
  title,
  text,
  validateButtonLabel,
  cancelButtonLabel,
}) => {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={isOpened} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        open={isOpened}
        onClose={onCancel}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Dialog.Overlay className="fixed inset-0 bg-gray-800 opacity-80 transition-opacity" />

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <IconContext.Provider
                    value={{ className: 'h-6 w-6 text-red-600' }}
                  >
                    <HiOutlineExclamation />
                  </IconContext.Provider>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    {title}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">{text}</p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:ml-10 sm:pl-4 sm:flex">
                <button
                  type="button"
                  className="btn btn-small btn-danger w-full sm:w-44"
                  onClick={onValidate}
                >
                  {isLoading ? <Loader small /> : validateButtonLabel}
                </button>
                <button
                  type="button"
                  className="btn btn-small btn-white w-full sm:w-auto mt-3 sm:mt-0 sm:ml-3"
                  onClick={onCancel}
                  ref={cancelButtonRef}
                >
                  {cancelButtonLabel}
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
