import React from 'react'

import '../assets/style.css'
import PackItem from './PackItem'

const PackContent = () => {
  const items = [
    'Skis ou Snowboard',
    'Chaussures',
    'Casque',
    'Assurance casse / vol',
    'Forfait remontées mécaniques'
  ]

  return (
    <div className="bg-white shadow-xl px-6 py-6 w-full md:hidden">
      <h2 className="text-2xl leading-tight font-semibold text-gray-800">
        Contenu d'un pack:
      </h2>
      <ul className="mt-4 p-4 text-gray-600 rounded-lg shadow-md">
        {
          items.map(item => (
            <PackItem item={item} key={item} />
          ))
        }
      </ul>
    </div>
  )
}

export default PackContent;