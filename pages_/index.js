import React from 'react'
import Head from 'next/head'
import { connect } from 'react-redux'
import useTranslation from 'next-translate/useTranslation'

import Nav from '../components/nav'
import BookingForm from '../components/BookingForm'
import PackContent from '../components/PackContent'

const Index = props => {
  const { t } = useTranslation()

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
      <div className="booking-form flex flex-col items-start sm:items-center md:py-6">
        <BookingForm resorts={props.resorts} />
      </div>
      <div className="md:hidden">
        <PackContent />
      </div>
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

Index.getInitialProps = async function({ req, store }) {
  if (req) {
    await store.dispatch({ type: 'SET_CATALOG' })
  }

  return {
    namespacesRequired: ['common']
  }
}

const mapStateToProps = state => ({
  resorts: state.catalog.resorts ? state.catalog.resorts.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)).map(r => {
    return { value: r.id, label: r.name }
  }) : []
})

export default connect(mapStateToProps)(Index)
