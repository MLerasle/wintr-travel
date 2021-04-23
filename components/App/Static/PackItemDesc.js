import { createElement } from 'react';
import { IconContext } from 'react-icons';

const PackItemDesc = ({ name, icon, description }) => (
  <div className="relative">
    <dt>
      <div className="absolute h-12 w-12 flex items-center justify-center bg-green-600 rounded-md">
        <IconContext.Provider value={{ className: 'h-6 w-6 text-white' }}>
          {createElement(icon)}
        </IconContext.Provider>
      </div>
      <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
        {name}
      </p>
    </dt>
    <dd className="mt-2 ml-16 text-base text-gray-500">{description}</dd>
  </div>
);

export default PackItemDesc;
