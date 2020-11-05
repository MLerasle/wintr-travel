import { useState } from 'react';
import Link from 'next/link';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';

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
      className={`fixed w-full left-0 bottom-0 bg-gray-900 text-gray-100 flex justify-center px-5 xs:px-4 py-2 transition-opacity duration-300 ease-in-out ${
        cookiePolicy === 'shown' ? 'opacity-0 hidden' : 'opacity-75'
      }`}
    >
      <p>
        En utilisant notre site, vous acceptez notre{' '}
        <Link href="/privacy" prefetch={false}>
          <a className="underline" onClick={closeBanner}>
            Politique de confidentialité
          </a>
        </Link>
        .
      </p>
      <Icon
        path={mdiClose}
        size={1}
        className="cursor-pointer ml-4"
        color="#F7FAFC"
        onClick={closeBanner}
      />
    </div>
  );
};

export default CookieBanner;
