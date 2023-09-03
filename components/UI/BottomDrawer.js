import { IconContext } from 'react-icons';
import { IoCloseOutline } from 'react-icons/io5';

const BottomDrawer = (props) => (
  <>
    {props.open && (
      <div
        className="w-full h-full fixed top-0 left-0 z-200 bg-black bg-opacity-80 md:hidden"
        onClick={props.closed}
      ></div>
    )}
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
        <IconContext.Provider value={{ color: '#2d3748', size: '2rem' }}>
          <div onClick={props.closed}>
            <IoCloseOutline />
          </div>
        </IconContext.Provider>
      </div>
      {props.children}
    </div>
  </>
);

export default BottomDrawer;
