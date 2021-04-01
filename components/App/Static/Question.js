import { useState } from 'react';

const Question = ({ query, children }) => {
  const [isOpened, setIsOpened] = useState(false);

  const toggleOpen = () => {
    setIsOpened(!isOpened);
  };

  return (
    <div className="pt-6">
      <dt className="text-lg">
        <button
          type="button"
          className="text-left w-full flex justify-between items-start text-gray-400"
          aria-controls="faq-0"
          aria-expanded="false"
          onClick={toggleOpen}
        >
          <span className="font-medium text-gray-900">{query}</span>
          <span className="ml-6 h-7 flex items-center">
            <svg
              className={`rotate ${
                isOpened ? '-rotate-180' : 'rotate-0'
              } h-6 w-6 transform`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
        </button>
      </dt>
      {isOpened && (
        <dd className="mt-2 pr-12" id="faq-0">
          {children}
        </dd>
      )}
    </div>
  );
};

export default Question;
