import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Icon from '@mdi/react';
import { mdiMenu } from '@mdi/js';

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
      <div className="flex items-center justify-between lg:px-0 py-3 w-full h-full max-w-screen-lg">
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
          <Icon
            path={mdiMenu}
            size={1.5}
            className="cursor-pointer"
            color="#2d3748"
            onClick={toggleIsMenuOpen}
          />
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
