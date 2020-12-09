import { useState } from 'react';
import Link from 'next/link';

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
      className={`fixed w-full left-0 bottom-0 bg-gray-900 text-gray-100 flex md:justify-center px-4 md:px-16 py-2 transition-opacity duration-300 ease-in-out ${
        cookiePolicy === 'shown' ? 'opacity-0 hidden' : 'opacity-75'
      }`}
    >
      <p className="container">
        En utilisant notre site, vous acceptez notre{' '}
        <Link href="/privacy" prefetch={false}>
          <a className="underline" onClick={closeBanner}>
            Politique de confidentialité
          </a>
        </Link>
        .
        <button
          className="bg-gray-100 text-gray-800 rounded font-semibold px-2 ml-2"
          onClick={closeBanner}
        >
          OK
        </button>
      </p>

      <style jsx>{`
        .container {
          max-width: calc(100vw - 95px);
        }
      `}</style>
    </div>
  );
};

export default CookieBanner;
