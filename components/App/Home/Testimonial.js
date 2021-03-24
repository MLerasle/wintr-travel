import { IconContext } from 'react-icons';
import { MdFormatQuote } from 'react-icons/md';

const Testimonial = (props) => (
  <div
    className={`flex-1 sm:px-6 lg:px-10 flex flex-col items-center ${
      props.classes && props.classes
    }`}
  >
    <IconContext.Provider value={{ color: '#389469', size: '2rem' }}>
      <MdFormatQuote />
    </IconContext.Provider>
    <p className="py-2 sm:pb-3 text-gray-800">{props.children}</p>
    <p className="text-gray-600">{props.person}</p>
  </div>
);

export default Testimonial;
