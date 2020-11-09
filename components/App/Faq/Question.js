import { useState } from 'react';
import Icon from '@mdi/react';
import { mdiChevronRight, mdiChevronDown } from '@mdi/js';

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
        <Icon
          path={isOpened ? mdiChevronDown : mdiChevronRight}
          size={1}
          className="mr-1"
        />
        <span className="w-full">{props.query}</span>
      </p>
      {isOpened && (
        <>
          <Separator className="mt-4" />
          <p className="px-4 mt-4 text-gray-700">{props.children}</p>
        </>
      )}
    </li>
  );
};

export default Question;
