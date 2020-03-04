import React from 'react'

import LocaleContextProvider from '../context/LocaleContext'
import '../assets/style.css'

const MyApp = ({ Component, pageProps }) => {
  return(
    <LocaleContextProvider>
      <Component {...pageProps} />
    </LocaleContextProvider>
  )
}

export default MyApp