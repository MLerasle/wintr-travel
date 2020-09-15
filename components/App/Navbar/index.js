import { useState } from 'react';
import Link from 'next/link';
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
      className={`shadow sm:flex sm:justify-center sm:items-center px-4 sm:py-3 h-16 ${props.classes}`}
    >
      <div className="flex items-center justify-between lg:px-0 py-3 w-full h-full max-w-screen-lg">
        <div className="text-gray-800 font-bold text-2xl tracking-wide">
          <Link href="/" prefetch={false}>
            <a>Wintr Travel</a>
          </Link>
        </div>
        <div className="sm:hidden flex items-center">
          <Icon
            path={mdiMenu}
            size={1.5}
            className="cursor-pointer"
            color="#2d3748"
            onClick={toggleIsMenuOpen}
          />
          <SideDrawer open={isMenuOpen} closed={toggleIsMenuOpen} />
        </div>
        {!props.hideNavLinks && (
          <div className="hidden sm:block">
            <NavItems />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
