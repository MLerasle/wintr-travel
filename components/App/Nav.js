import { useState } from 'react';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import Icon from '@mdi/react';
import { mdiMenu } from '@mdi/js';

import SideDrawer from '@/UI/SideDrawer';
import NavItems from './NavItems';

const Nav = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { lang } = useTranslation();

  const toggleIsMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className={`shadow sm:flex sm:justify-between sm:items-center sm:px-6 sm:py-3 h-16 ${props.classes}`}
    >
      <div className="flex items-center justify-between px-4 md:px-6 py-3 sm:p-0 w-full h-full">
        <div className="text-gray-800 font-title font-semibold text-2xl tracking-wide">
          {/* <img src="/logo.png" alt="Logo" className="mr-2" /> */}
          <Link href={`/${lang}`} prefetch={false}>
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
        <div className="hidden sm:block">
          <NavItems />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
