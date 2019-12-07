import React from 'react'

import '../assets/style.css'
import Nav from '../components/Nav'

const Home = () => (
  <div className="cover w-full h-full absolute top-0 left-0">
    <Nav />
    <div className="bg-white rounded-lg shadow-xl p-8 sm:ml-16 md:ml-24 my-10 max-w-lg">
      <h2 className="text-3xl leading-tight font-semibold text-gray-800">
        Réservez votre matériel de ski.<br/>
        Et votre forfait.
      </h2>
      <form className="flex flex-col mt-4">
        <input type="text" className="border border-gray-300 rounded-lg mt-8 p-2" />
        <input type="text" className="border border-gray-300 rounded-lg mt-8 p-2" />
        <input type="text" className="border border-gray-300 rounded-lg mt-8 p-2" />
        <div className="flex flex-col items-end">
          <button type="submit" className="bg-secondary-blue text-white font-bold py-3 px-4 mt-8 w-1/2 rounded-lg">
            Search
          </button>
        </div>
      </form>
    </div>
    <style jsx>{`
      .cover {
        background-image: url(/wintr-travel-home.jpg);
        background-position: center center;
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-size: cover;
        background-color: transparent;
      }
    `}</style>
  </div>
)

export default Home
