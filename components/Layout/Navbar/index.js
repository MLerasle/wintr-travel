import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IconContext } from 'react-icons';
import { IoMenuOutline } from 'react-icons/io5';

import SideDrawer from '@/UI/SideDrawer';
import NavItems from './NavItems';

const Nav = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleIsMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className={`shadow md:flex md:justify-center md:items-center px-4 md:py-3 h-16 ${props.classes}`}
    >
      <div className="flex items-center justify-between lg:px-0 py-3 w-full h-full max-w-screen-xl">
        <div className="text-gray-800 font-bold text-2xl tracking-wide">
          <Link href="/">
            <a className="flex items-center">
              <Image
                src="/images/logo.svg"
                alt="Logo Wintr Travel"
                loading="eager"
                width={55}
                height={55}
              />
              <span className="ml-2">Wintr Travel</span>
            </a>
          </Link>
        </div>
        <div className="md:hidden flex items-center">
          <IconContext.Provider
            value={{
              color: '#2d3748',
              size: '2rem',
              className: 'cursor-pointer',
            }}
          >
            <div onClick={toggleIsMenuOpen}>
              <IoMenuOutline />
            </div>
          </IconContext.Provider>
          <SideDrawer open={isMenuOpen} closed={toggleIsMenuOpen} />
        </div>
        <div className="hidden md:block">
          <NavItems />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
