import React from 'react'
import { useDispatch } from 'react-redux'
import Icon from '@mdi/react'
import { mdiCheck } from '@mdi/js'

import BookingActions from '../stores/Booking/Actions'
import Layout from '../components/Layout'

const Confirmation = () => {
  const dispatch = useDispatch()

  const resetBooking = () => {
    dispatch(BookingActions.resetBooking())
  }

  return (
    <Layout>
      <div className="flex justify-center items-center">
        <div className="flex flex-col justify-center items-center mt-16 p-10 bg-white md:rounded-lg md:shadow-xl w-full sm:max-w-3xl text-center ">
          <Icon path={mdiCheck} size={6} color="#0CB3FA" />
          <h1 className="mb-6 text-2xl sm:text-3xl leading-tight font-semibold text-gray-800">Commande validée!</h1>
          <p className="mb-2 text-gray-700">Votre réservation et votre paiement ont bien été enregistrés.</p>
          <p className="mb-2 text-gray-700">Vous allez recevoir un email contenant les détails de votre réservation et les instructions pour récupérer votre matériel.</p>
          <p className="mb-2 text-gray-800 font-semibold">Bon séjour!</p>
          <a href="/" onClick={resetBooking} className="bg-secondary-blue text-white font-bold py-3 px-4 mt-6 w-32 rounded-lg shadow-md focus:outline-none focus:shadow-outline hover:opacity-90">
            OK
          </a>
        </div>
      </div>
    </Layout>
  )
}

export default Confirmation