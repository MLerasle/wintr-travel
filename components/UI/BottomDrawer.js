import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';

import Backdrop from '@/UI/Backdrop';

const BottomDrawer = (props) => (
  <>
    <Backdrop show={props.open} clicked={props.closed} />
    <div
      className={`fixed w-full h-auto left-0 bottom-0 z-200 bg-white px-6 py-4 rounded-t-lg transition-transform duration-300 ease-in-out transform ${
        props.open ? 'translate-y-0' : 'translate-y-full'
      } md:hidden`}
    >
      <div
        className="w-16 h-2 rounded bg-gray-300 my-2 mx-auto"
        onClick={props.closed}
      ></div>
      <div className="absolute top-3/4 right-3/4">
        <Icon
          path={mdiClose}
          size={1.2}
          className="cursor-pointer"
          color="#718096"
          onClick={props.closed}
        />
      </div>
      {props.children}
    </div>
  </>
);

export default BottomDrawer;
