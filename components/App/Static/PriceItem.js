import { IconContext } from 'react-icons';
import { MdDone } from 'react-icons/md';

const PriceItem = (props) => (
  <li className="flex items-center mt-3 tracking-wide sm:text-lg">
    <IconContext.Provider
      value={{ color: '#389469', size: '1.5rem', className: 'mr-2 md:mr-4' }}
    >
      <MdDone />
    </IconContext.Provider>
    {props.children}
  </li>
);

export default PriceItem;
