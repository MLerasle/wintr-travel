import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Transition } from '@headlessui/react';
import { IconContext } from 'react-icons';
import { IoMenuOutline, IoCloseOutline } from 'react-icons/io5';

import NavLinks from './NavLinks';

const Nav = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const toggleIsMenuOpened = () => {
    setIsMenuOpened(!isMenuOpened);
  };

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="-ml-2 mr-2 flex items-center md:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-600"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <IconContext.Provider value={{ className: 'h-6 w-6' }}>
                  <div onClick={toggleIsMenuOpened}>
                    {isMenuOpened ? <IoCloseOutline /> : <IoMenuOutline />}
                  </div>
                </IconContext.Provider>
              </button>
            </div>
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <a className="link flex items-center">
                  <Image
                    src="/images/logo.svg"
                    alt="Logo Wintr Travel"
                    loading="eager"
                    width={45}
                    height={45}
                  />
                  <span className="hidden lg:block text-gray-800 font-bold text-xl tracking-wide ml-2">
                    Wintr Travel
                  </span>
                </a>
              </Link>
            </div>
            <NavLinks device="desktop" />
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <a className="relative btn btn-small btn-primary">Réserver</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Transition
        show={isMenuOpened}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <NavLinks device="mobile" onLinkClicked={toggleIsMenuOpened} />
      </Transition>
    </nav>
  );
};

export default Nav;
