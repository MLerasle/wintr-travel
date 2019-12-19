import React, { useState } from 'react'
import onClickOutside from "react-onclickoutside";
import Label from './Label'
import Counter from './Counter'

const SkierInput = props => {
  const [isOpen, setIsOpen] = useState(false)
  SkierInput.handleClickOutside = () => setIsOpen(false)

  const inputValue = () => {
    const adultsLabel = props.adultsCount > 1 ? 'Adultes' : 'Adulte';
    const childrenLabel = props.childrenCount > 1 ? 'Enfants' : 'Enfant';
    let skiers = `${props.adultsCount} ${adultsLabel}`;
    if (props.childrenCount > 0) {
      skiers += ` - ${props.childrenCount} ${childrenLabel}`;
    }
    return skiers;
  };

  return (
    <div className="relative w-full mt-4">
      <Label title="Skieurs" />
      <input
        type="text"
        placeholder="Skieurs"
        id="skiersInput"
        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-secondary-blue w-full text-gray-800"
        style={{paddingLeft: '10px' }}
        onFocus={() => setIsOpen(true)}
        defaultValue={inputValue()}
      />
      <div className={"bg-white rounded-lg shadow-md px-4 py-6 border border-gray-300 mt-2 w-full absolute " + (isOpen ? 'block' : 'hidden')}>
        <div className="flex justify-between items-center">
          <label className="text-gray-800 text-md tracking-wide">
            Adultes
          </label>
          <Counter
            value={props.adultsCount}
            onIncrement={e => {
              e.preventDefault()
              props.onChange('increment', 'adult')
            }}
            onDecrement={e => {
              e.preventDefault()
              props.onChange('decrement', 'adult')
            }}
          />
        </div>
        <div className="flex justify-between items-center mt-6">
          <label className="text-gray-800 text-md tracking-wide">
            Enfants
          </label>
          <Counter
            value={props.childrenCount}
            onIncrement={e => {
              e.preventDefault()
              props.onChange('increment', 'child')
            }}
            onDecrement={e => {
              e.preventDefault()
              props.onChange('decrement', 'child')
            }}
          />
        </div>
        <div className="flex justify-between items-center mt-8">
          <button
            className="text-gray-600 font-semibold hover:underline text-sm focus:outline-none focus:shadow-outline"
            onClick={e => {
              e.preventDefault()
              props.onChange('reset')
              setIsOpen(false)
            }}>
            Annuler
          </button>
          <button
            className="text-secondary-blue font-semibold hover:underline text-sm focus:outline-none focus:shadow-outline"
            onClick={e => {
              e.preventDefault()
              setIsOpen(false)
              document.getElementById('searchButton').focus()
            }}>
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  )
}

SkierInput.prototype = {}

const clickOutsideConfig = {
  handleClickOutside: () => SkierInput.handleClickOutside
}

export default onClickOutside(SkierInput, clickOutsideConfig)