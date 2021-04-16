import { IconContext } from 'react-icons';
import { HiOutlineCheck } from 'react-icons/hi';

const PackItem = ({ item }) => (
  <li className="bg-green-800 bg-opacity-50 py-4 px-4 flex items-center space-x-3 text-base text-white">
    <IconContext.Provider value={{ className: 'h-6 w-6 text-green-200' }}>
      <HiOutlineCheck />
    </IconContext.Provider>
    <span>{item}</span>
  </li>
);

export default PackItem;
