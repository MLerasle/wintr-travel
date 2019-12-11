import React from 'react'

import '../assets/style.css'
import Nav from '../components/Nav'
import SelectInput from '../components/SelectInput'

const resorts = [
  { value: 1, label: 'Avoriaz' },
  { value: 2, label: 'Chamonix' },
  { value: 3, label: 'Megève' },
  { value: 4, label: 'Tignes' },
  { value: 5, label: 'Val d\'Isère' },
  { value: 6, label: 'Val Thorens' },
  { value: 7, label: 'Seythenex' },
  { value: 8, label: 'Semnoz' },
  { value: 9, label: 'Zermatt' },
  { value: 10, label: 'Verbier' },
  { value: 11, label: 'Les Paccots' },
  { value: 12, label: 'Les 2 Alpes' },
]

const handleResortChange = () => {
  document.getElementById('dateFromInput').focus()
}

const Home = () => (
  <div className="cover w-full h-full absolute top-0 left-0">
    <Nav />
    <div className="bg-white rounded-lg shadow-xl p-8 sm:ml-16 md:ml-24 my-10 max-w-lg">
      <h2 className="text-3xl leading-tight font-semibold text-gray-800">
        Réservez votre matériel de ski.
        <br />
        Et votre forfait.
      </h2>
      <form className="flex flex-col mt-4">
        <SelectInput
          options={resorts}
          label="Où"
          placeholder="À la montagne"
          handleChange={handleResortChange} />
        <input type="text" id="dateFromInput" className="border border-gray-300 rounded-lg mt-8 p-2" />
        <input type="text" className="border border-gray-300 rounded-lg mt-8 p-2" />
        <div className="flex flex-col items-end">
          <button
            type="submit"
            id="searchButton"
            className="bg-secondary-blue text-white font-bold py-3 px-4 mt-8 w-1/2 rounded-lg focus:outline-none focus:shadow-outline">
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
