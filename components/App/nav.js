import { useState, useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'

import { LocaleContext } from 'context/LocaleContext'

const Nav = props => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [menuIconPath, setMenuIconPath] = useState("M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z")
  const { storeLocale } = useContext(LocaleContext)
  const { t, lang } = useTranslation()
  const router = useRouter()

  const links = [
    { label: 'English', locale: 'en' },
    { label: 'Français', locale: 'fr' },
    { label: `${t('common:help')}`, href: `/${lang}/help` }
  ].map(link => {
    link.key = `nav-link-${link.locale}`
    return link
  })

  // Change locale part of current url
  const localizedPath = locale => {
    let currentPath = router.pathname
    // Remove locale part of the current url
    currentPath = currentPath.replace('/en', '').replace('/fr', '')
    return `/${locale}${currentPath}`
  }

  const toggleIsMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen)
    // Toggle svg icon (close / menu)
    if (isMenuOpen) {
      setMenuIconPath("M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z")
    } else {
      setMenuIconPath("M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z")
    }
  }

  return (
    <nav className={`sm:flex sm:justify-between sm:items-center sm:px-6 sm:py-3 ${props.classes}`}>
      <div className="flex items-center justify-between px-6 py-3 sm:p-0 w-full">
        <div className="text-white font-title font-semibold text-2xl tracking-wide">
          {/* <img src="/logo.png" alt="Logo" className="mr-2" /> */}
          <Link href={`/${lang}`} prefetch={false}>
            <a>Wintr Travel</a>
          </Link>
        </div>
        <div className="sm:hidden flex items-center">
          <button type="button" aria-label={isMenuOpen ? "close menu" : "open menu"} className="text-white hover:text-white focus:text-white focus:outline-none" onClick={toggleIsMenuOpen}>
            <svg className="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d={menuIconPath} />
            </svg>
          </button>
        </div>
      </div>
      <div className={`px-6 pb-2 sm:flex sm:p-0 ${isMenuOpen ? 'block' : 'hidden'}`}>
        {links.map(({ label, href, key, locale }) => (
          <Link
            href={{
              pathname: href || localizedPath(locale),
              query: router.query
            }}
            key={key}>
            <a
              className="mt-1 block py-1 text-white tracking-wide hover:text-gray-300 sm:mt-0 sm:ml-2 sm:px-2 cursor-pointer"
              onClick={() => storeLocale(locale)}>
              {label}
            </a>
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default Nav