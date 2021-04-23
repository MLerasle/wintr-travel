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
    <div
      className={`fixed bottom-0 inset-x-0 pb-2 sm:pb-5 ${
        cookiePolicy === 'shown' ? 'hidden' : 'block'
      }`}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="p-2 rounded-lg bg-gray-800 shadow-lg sm:p-3">
          <div className="flex items-center justify-between flex-wrap">
            <div className="w-0 flex-1 flex items-center">
              <p className="ml-3 font-medium text-white">
                <span>
                  En utilisant notre site, vous acceptez notre{' '}
                  <Link href="/privacy" prefetch={false}>
                    <a className="underline" onClick={closeBanner}>
                      Politique de confidentialité
                    </a>
                  </Link>
                  .
                </span>
              </p>
            </div>
            <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
              <button
                type="button"
                className="-mr-1 flex p-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-white"
              >
                <span className="sr-only">Dismiss</span>
                <IconContext.Provider
                  value={{ className: 'h-6 w-6 text-white' }}
                >
                  <div onClick={closeBanner}>
                    <IoCloseOutline />
                  </div>
                </IconContext.Provider>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
