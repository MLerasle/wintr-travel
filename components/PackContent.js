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
    <div className="py-3 sm:py-0 px-6 bg-white w-full">
      <h2 className="text-2xl leading-tight font-semibold text-gray-800">
        Contenu d'un pack:
      </h2>
      <ul className="text-gray-600 px-2 py-4">
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