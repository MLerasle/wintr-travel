import { useState } from 'react';
import Link from 'next/link';
import { IconContext } from 'react-icons';
import { IoCloseOutline } from 'react-icons/io5';

const CookieBanner = () => {
  const [cookiePolicy, setCookiePolicy] = useState(
    localStorage.getItem('cookiePolicy')
  );

  const closeBanner = () => {
    setCookiePolicy('shown');
    localStorage.setItem('cookiePolicy', 'shown');
  };

  return (
    <div className={`${cookiePolicy === 'shown' ? 'hidden' : 'block'}`}>
      <div className="p-2 bg-gray-800 shadow-lg sm:p-3">
        <div className="flex items-center justify-between flex-wrap max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="w-0 flex-1 flex flex-col justify-center items-center font-medium text-white">
            <p className="">
              THIS IS A DEMO WEBSITE, NO REAL BOOKING CAN BE MADE. COVID-19
              KILLED THIS PROJECT.
            </p>
            <p>YOU CAN STILL MAKE A FAKE BOOKING IF YOU WANT TO :)</p>
          </div>
          {/* <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
            <button
              type="button"
              className="-mr-1 flex p-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <span className="sr-only">Dismiss</span>
              <IconContext.Provider value={{ className: 'h-6 w-6 text-white' }}>
                <div onClick={closeBanner}>
                  <IoCloseOutline />
                </div>
              </IconContext.Provider>
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
