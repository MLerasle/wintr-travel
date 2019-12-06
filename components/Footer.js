import React from 'react'
import Link from 'next/link'
import Icon from '@mdi/react'
import { mdiTwitter, mdiFacebook, mdiInstagram } from '@mdi/js';

import '../assets/style.css'

const Footer = () => (
  <footer className="flex justify-between items-center bg-primary-blue text-white px-6 py-4 absolute bottom-0 w-full h-10">
    <section>
      <p>© {new Date().getFullYear()} Wintr Travel, All rights reserved.</p>
    </section>
    <section>
      <ul className="flex items-center">
        <li className="mr-4 tracking-wide">
          <Link href="/">
            <a className="hover:underline">About</a>
          </Link>
        </li>
        <li className="mr-4 tracking-wide">
          <Link href="/">
            <a className="hover:underline">Terms</a>
          </Link>
        </li>
        <li className="mr-4 tracking-wide">
          <Link href="/">
            <a className="hover:underline">Privacy</a>
          </Link>
        </li>
      </ul>
    </section>
    <section className="flex items-center">
      <a className="pl-3" href="https://twitter.com">
        <Icon path={mdiTwitter} size={1} color="white" />
      </a>
      <a className="pl-3" href="https://facebook.com">
        <Icon path={mdiFacebook} size={1} color="white" />
      </a>
      <a className="pl-3" href="https://instagram.com">
        <Icon path={mdiInstagram} size={1} color="white" />
      </a>
    </section>
  </footer>
)

export default Footer