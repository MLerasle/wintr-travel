import React from 'react'

import LocaleContextProvider from 'context/LocaleContext'
import 'assets/style.css'
import 'assets/background-image.css'
import 'react-day-picker/lib/style.css'
import 'assets/react-day-picker.css'

const MyApp = ({ Component, pageProps }) => {
  return(
    <LocaleContextProvider>
      <Component {...pageProps} />
    </LocaleContextProvider>
  )
}

export default MyApp