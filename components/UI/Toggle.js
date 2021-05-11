import { Switch } from '@headlessui/react';
import { IconContext } from 'react-icons';
import { HiCheck, HiX } from 'react-icons/hi';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export const Toggle = ({
  label,
  onChange,
  value,
  containerClassName,
  className,
}) => (
  <Switch.Group>
    <div
      className={`flex items-center ${
        containerClassName ? containerClassName : ''
      }`}
    >
      <Switch
        checked={value}
        onChange={onChange}
        className={classNames(
          value ? 'bg-green-600' : 'bg-gray-200',
          'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
        )}
      >
        <span className="sr-only">Use setting</span>
        <span
          className={classNames(
            value ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
          )}
        >
          <span
            className={classNames(
              value
                ? 'opacity-0 ease-out duration-100'
                : 'opacity-100 ease-in duration-200',
              'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity'
            )}
            aria-hidden="true"
          >
            <IconContext.Provider
              value={{ className: 'bg-white h-3 w-3 text-gray-400' }}
            >
              <HiX />
            </IconContext.Provider>
          </span>
          <span
            className={classNames(
              value
                ? 'opacity-100 ease-in duration-200'
                : 'opacity-0 ease-out duration-100',
              'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity'
            )}
            aria-hidden="true"
          >
            <IconContext.Provider
              value={{ className: 'bg-white h-3 w-3 text-green-600' }}
            >
              <HiCheck />
            </IconContext.Provider>
          </span>
        </span>
      </Switch>
      <Switch.Label
        className={`ml-4 ${
          className === 'toggle-error' ? 'text-red-600' : 'text-gray-700'
        }`}
      >
        {label}
      </Switch.Label>
    </div>
  </Switch.Group>
);

export default Toggle;
