import { useState } from 'react';
import { IconContext } from 'react-icons';
import { MdChevronRight, MdExpandMore } from 'react-icons/md';

import Separator from '@/UI/Separator';

const Question = (props) => {
  const [isOpened, setIsOpened] = useState(false);

  const toggleOpen = () => {
    setIsOpened(!isOpened);
  };

  return (
    <li
      className="bg-white rounded-md shadow px-2 py-4 mb-4 cursor-pointer"
      onClick={toggleOpen}
    >
      <p className="flex items-center text-gray-900">
        <IconContext.Provider
          value={{
            size: '1.3rem',
            className: 'mr-1 text-gray-700',
          }}
        >
          <div onClick={props.closed}>
            {isOpened ? <MdExpandMore /> : <MdChevronRight />}
          </div>
        </IconContext.Provider>
        <span className="w-full">{props.query}</span>
      </p>
      {isOpened && (
        <>
          <Separator className="mt-4" />
          <div className="px-4 mt-4 text-gray-700">{props.children}</div>
        </>
      )}
    </li>
  );
};

export default Question;
