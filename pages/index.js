import React from 'react'
import fetch from 'isomorphic-unfetch'
import Icon from '@mdi/react'
import { mdiCheckCircleOutline } from '@mdi/js'

import '../assets/style.css'
import Nav from '../components/Nav'
import SelectInput from '../components/SelectInput'
import DatesInput from '../components/DatesInput'
import SkierInput from '../components/SkierInput'

const handleResortChange = () => {
  document.querySelector('.InputDates-from input').focus()
}

const Index = props => (
  <div className="cover w-full h-full absolute top-0 left-0">
    <div className="hidden sm:block">
      <Nav />
    </div>
    <div className="mobile-image sm:hidden h-64">
      <Nav />
    </div>
    <div className="bg-white sm:rounded-lg shadow-xl px-6 py-4 sm:p-8 sm:ml-16 md:ml-24 sm:my-10 w-full sm:max-w-lg">
      <h2 className="text-2xl sm:text-3xl leading-tight font-semibold text-gray-800">
        Réservez votre matériel de ski.<br className="hidden sm:block" /> Et votre forfait.
      </h2>
      <form className="flex flex-col mt-4">
        <SelectInput
          options={props.resorts}
          label="Où"
          placeholder="À la montagne"
          handleChange={handleResortChange} />
        <DatesInput />
        <SkierInput />
        <div className="flex flex-col items-end">
          <button
            type="submit"
            id="searchButton"
            className="bg-secondary-blue text-white font-bold py-3 px-4 mt-8 w-full sm:w-1/2 rounded-lg shadow-md focus:outline-none focus:shadow-outline hover:opacity-90">
            Search
          </button>
        </div>
      </form>
    </div>
    <div className="bg-white shadow-xl px-6 py-6 w-full sm:hidden">
      <h2 className="text-2xl leading-tight font-semibold text-gray-800">
        Contenu d'un pack:
      </h2>
      <ul className="mt-4 p-4 text-gray-600 rounded-lg shadow-md">
        <li className="my-2 flex items-center">
          <Icon path={mdiCheckCircleOutline} size={1} color="#0CB3FA" />
          <span className="ml-2">Skis ou Snowboard récent</span>
        </li>
        <li className="my-2 flex items-center">
          <Icon path={mdiCheckCircleOutline} size={1} color="#0CB3FA" />
          <span className="ml-2">Chaussures</span>
        </li>
        <li className="my-2 flex items-center">
          <Icon path={mdiCheckCircleOutline} size={1} color="#0CB3FA" />
          <span className="ml-2">Casque</span>
        </li>
        <li className="my-2 flex items-center">
          <Icon path={mdiCheckCircleOutline} size={1} color="#0CB3FA" />
          <span className="ml-2">Assurance casse / vol</span>
        </li>
        <li className="my-2 flex items-center">
          <Icon path={mdiCheckCircleOutline} size={1} color="#0CB3FA" />
          <span className="ml-2">Forfait remontées mécaniques</span>
        </li>
      </ul>
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

Index.getInitialProps = async function() {
  const res = await fetch('https://catalog.wintr.travel/v1/catalog.json')
  const data = await res.json()

  return {
    resorts: data.resorts.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)).map(r => {
      return { value: r.id, label: r.name }
    })
  }
}

export default Index
