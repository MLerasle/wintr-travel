import { RadioGroup } from '@headlessui/react';

import RadioButton from './RadioButton';

const RadioButtons = ({
  value,
  onChange,
  options,
  label,
  isDate,
  className,
}) => (
  <RadioGroup value={value} onChange={onChange} className={className}>
    {label && (
      <RadioGroup.Label className="block font-medium text-gray-700 mb-1">
        {label}
      </RadioGroup.Label>
    )}
    <div className="flex space-x-1">
      {options.map((option) => (
        <RadioGroup.Option
          key={option}
          value={option}
          className="flex-grow rounded link focus:outline-none focus:ring-green-500 focus:border-green-500 bg-white"
        >
          {({ checked }) => (
            <div
              className={`relative p-3 flex cursor-pointer rounded border shadow-sm flex-1 hover:shadow ${
                checked ? 'border-green-600 bg-green-50' : 'border-gray-200'
              }
            `}
            >
              <RadioButton value={option} isDate={isDate} />
            </div>
          )}
        </RadioGroup.Option>
      ))}
    </div>
  </RadioGroup>
);

export default RadioButtons;
