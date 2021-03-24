import { IconContext } from 'react-icons';
import { IoCloseOutline } from 'react-icons/io5';

import NavItems from '@/Layout/Navbar/NavItems';
import Backdrop from '@/UI/Backdrop';

const SideDrawer = (props) => (
  <>
    <Backdrop show={props.open} clicked={props.closed} />
    <div
      className={`fixed w-56 max-w-5xl h-full right-0 top-0 z-200 bg-gray-100 transition-transform duration-300 ease-in-out transform ${
        props.open ? 'translate-x-0' : 'translate-x-full'
      } md:hidden`}
    >
      <nav>
        <header className="flex justify-end items-center h-16 px-4">
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
        </header>
        <NavItems onItemClick={props.closed} />
      </nav>
    </div>
  </>
);
export default SideDrawer;
