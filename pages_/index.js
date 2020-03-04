import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import useTranslation from 'next-translate/useTranslation'
import fetch from 'isomorphic-unfetch'

import Nav from '../components/nav'
import BookingForm from '../components/BookingForm'
import PackContent from '../components/PackContent'

const Index = props => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(true)
  const [catalog, setCatalog] = useState([])

  useEffect(() => {
    if (props.catalog) {
      sessionStorage.setItem('catalog', JSON.stringify(props.catalog))
    }
    const storedCatalog = JSON.parse(sessionStorage.getItem('catalog'))
    setCatalog(storedCatalog)
    setIsLoading(false)
  }, [])

  return (
    <div className="cover w-full absolute top-0 left-0">
      <Head>
        <title>{t('home:title')}</title>
      </Head>
      <div className="hidden md:block">
        <Nav />
      </div>
      <div className="mobile-image md:hidden h-64">
        <Nav />
      </div>
      {
        !isLoading ?
        <>
          <div className="booking-form flex flex-col items-start sm:items-center md:py-6">
            <BookingForm catalog={catalog} />
          </div>
          <div className="md:hidden mx-6 mt-2 mb-6">
            <PackContent />
          </div>
        </>
        : null
      }
      <style jsx>{`
        .mobile-image {
          background-image: url(/wintr-travel-home-sm.webp);
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
          background-color: transparent;
        }

        .no-webp .mobile-image {
          background-image: url(/wintr-travel-home-sm.jpg);
        }

        @media (min-width: 640px) {
          .cover {
            background-image: url(/wintr-travel-home.webp);
            background-position: center;
            background-repeat: no-repeat;
            background-attachment: fixed;
            background-size: cover;
            background-color: transparent;
          }

          .no-webp .cover {
            background-image: url(/wintr-travel-home.jpg);
          }
        }

        @media (min-height: 550px) {
          .cover {
            height: 100%;
          }
        }

        @media (min-width: 1024px) and (min-height: 768px) {
          .booking-form {
            padding: 3rem 0;
          }
        }
      `}</style>
    </div>
  )
}

Index.getInitialProps = async function({ req }) {
  if (!req) { return {} }
  const response = await fetch('https://catalog.wintr.travel/v1/catalog.json')
  const catalog = await response.json()
  return {
    catalog,
    namespacesRequired: ['common']
  }
}

export default Index
