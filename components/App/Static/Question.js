import { Disclosure } from '@headlessui/react';
import { HiChevronUp } from 'react-icons/hi';

const Question = ({ query, children }) => (
  <Disclosure as="div" className="pt-6 text-lg">
    {({ open }) => (
      <>
        <Disclosure.Button className="text-left w-full flex justify-between items-start text-gray-400 link">
          <span className="font-medium text-gray-900">{query}</span>
          <HiChevronUp
            className={`${open ? 'transform rotate-180' : ''} w-6 h-6`}
          />
        </Disclosure.Button>
        <Disclosure.Panel className="mt-2 pr-12">{children}</Disclosure.Panel>
      </>
    )}
  </Disclosure>
);

export default Question;
