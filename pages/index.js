import React from 'react'
import Head from 'next/head'
import { connect } from 'react-redux'

import '../assets/style.css'
import Nav from '../components/Nav'
import BookingForm from '../components/BookingForm'
import PackContent from '../components/PackContent'

const Index = props => {
  return (
    <div className="cover w-full h-full absolute top-0 left-0">
      <Head>
        <title>Ski Rental & Ski Pass - Wintr Travel</title>
      </Head>
      <div className="hidden md:block">
        <Nav />
      </div>
      <div className="mobile-image md:hidden h-64">
        <Nav />
      </div>
      <div className="flex flex-col items-start sm:items-center md:pt-6">
        <BookingForm resorts={props.resorts} />
      </div>
      <div className="md:hidden">
        <PackContent />
      </div>
      <style jsx>{`
        .mobile-image {
          background-image: url(/wintr-travel-home-sm.jpg);
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
          background-color: transparent;
        }

        @media (min-width: 640px) {
          .cover {
            background-image: url(/wintr-travel-home.jpg);
            background-position: center;
            background-repeat: no-repeat;
            background-attachment: fixed;
            background-size: cover;
            background-color: transparent;
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
  resorts: state.catalog.resorts.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)).map(r => {
    return { value: r.id, label: r.name }
  })
})

export default connect(mapStateToProps)(Index)
