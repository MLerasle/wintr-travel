import React from 'react'
import Link from 'next/link'

import '../assets/style.css'

const links = [
  { href: '', label: 'English' },
  { href: '/contact', label: 'Contact' },
  { href: '/help', label: 'Help' }
].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`
  return link
})

const Nav = props => (
  <nav className={"flex items-center justify-between " + (props.background && 'bg-primary-blue')}>
    <div className="text-white pl-6">
      <a href="/">WINTR TRAVEL</a>
    </div>
    <ul className="flex items-center pr-6">
      {links.map(({ key, href, label }) => (
        <li key={key} className="inline-block ml-8 py-6 border-b-2 border-transparent hover:border-white">
          <Link href={href}>
            <a className="text-white tracking-wide">{label}</a>
          </Link>
        </li>
      ))}
    </ul>
  </nav>
)

export default Nav
