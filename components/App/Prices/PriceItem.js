import Icon from '@mdi/react';
import { mdiCheck } from '@mdi/js';

const PriceItem = (props) => (
  <li className="flex items-center mt-3 tracking-wide sm:text-lg">
    <Icon path={mdiCheck} size={1} className="mr-2 md:mr-4" color="#389469" />
    {props.children}
  </li>
);

export default PriceItem;
