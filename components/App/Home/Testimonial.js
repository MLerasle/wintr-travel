import Icon from '@mdi/react';
import { mdiFormatQuoteOpen } from '@mdi/js';

const Testimonial = (props) => (
  <div
    className={`flex-1 sm:px-6 lg:px-10 flex flex-col items-center ${
      props.classes && props.classes
    }`}
  >
    <Icon path={mdiFormatQuoteOpen} size={1.5} color="#389469" />
    <p className="py-2 sm:pb-3 text-gray-800 lg:text-lg">{props.children}</p>
    <p className="text-gray-600">{props.person}</p>
  </div>
);

export default Testimonial;
