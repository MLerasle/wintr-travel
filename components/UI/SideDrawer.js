import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';

import NavItems from '@/App/NavItems';
import Backdrop from '@/UI/Backdrop';

const SideDrawer = (props) => (
  <>
    <Backdrop show={props.open} clicked={props.closed} />
    <div
      className={`fixed w-48 max-w-5xl h-full right-0 top-0 z-200 bg-white px-4 transition-transform duration-300 ease-in-out transform ${
        props.open ? 'translate-x-0' : 'translate-x-full'
      } md:hidden`}
    >
      <nav>
        <header className="flex justify-end items-center h-16">
          <Icon
            path={mdiClose}
            size={1.5}
            className="cursor-pointer"
            color="#2D3748"
            onClick={props.closed}
          />
        </header>
        <NavItems />
      </nav>
    </div>
  </>
);
export default SideDrawer;
