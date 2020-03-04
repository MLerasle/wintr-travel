import React, { createContext, useState } from 'react'

export const LocaleContext = createContext()

const LocaleContextProvider = (props) => {
  const [locale, setLocale] = useState('en')
  const storeLocale = l => setLocale(l)

  return (
    <LocaleContext.Provider value={{ locale, storeLocale }}>
      {props.children}
    </LocaleContext.Provider>
  )
}

export default LocaleContextProvider