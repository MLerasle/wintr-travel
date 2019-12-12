import React, { useState, useReducer } from 'react'
import onClickOutside from "react-onclickoutside";
import Label from './Label'
import SkierCounter from './SkierCounter'

const reducer = (state, action) => {
  switch (action.type) {
    case 'incrementAdults':
      return { ...state, adultsCount: state.adultsCount + 1 }
    case 'incrementChildren':
      return { ...state, childrenCount: state.childrenCount + 1 }
    case 'decrementAdults':
      if (state.adultsCount > 0) {
        return { ...state, adultsCount: state.adultsCount - 1 }
      }
    case 'decrementChildren':
      if (state.childrenCount > 0) {
        return { ...state, childrenCount: state.childrenCount - 1 }
      }
    case 'reset':
      return { ...state, adultsCount: 2, childrenCount: 0 }
    default:
      return state
  }
}

const SkierInput = () => {
  const [isOpen, setIsOpen] = useState(false)
  const initialState = {
    adultsCount: 2,
    childrenCount: 0
  }
  const [state, dispatch] = useReducer(reducer, initialState)

  SkierInput.handleClickOutside = () => setIsOpen(false)

  const inputValue = () => {
    const adultsLabel = state.adultsCount > 1 ? 'Adultes' : 'Adulte';
    const childrenLabel = state.childrenCount > 1 ? 'Enfants' : 'Enfant';
    let skiers = `${state.adultsCount} ${adultsLabel}`;
    if (state.childrenCount > 0) {
      skiers += ` - ${state.childrenCount} ${childrenLabel}`;
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
        onBlur={() => setIsOpen(false)}
        defaultValue={inputValue()}
      />
      <div className={"bg-white rounded-lg shadow-md px-4 py-6 border border-gray-300 mt-2 w-full absolute " + (isOpen ? 'block' : 'hidden')}>
        <div className="flex justify-between items-center">
          <label className="text-gray-800 text-md tracking-wide">
            Adultes
          </label>
          <SkierCounter
            value={state.adultsCount}
            onIncrement={e => {
              e.preventDefault()
              dispatch({type: 'incrementAdults'})
            }}
            onDecrement={e => {
              e.preventDefault()
              dispatch({type: 'decrementAdults'})
            }}
          />
        </div>
        <div className="flex justify-between items-center mt-6">
          <label className="text-gray-800 text-md tracking-wide">
            Enfants
          </label>
          <SkierCounter
            value={state.childrenCount}
            onIncrement={e => {
              e.preventDefault()
              dispatch({type: 'incrementChildren'})
            }}
            onDecrement={e => {
              e.preventDefault()
              dispatch({type: 'decrementChildren'})
            }}
          />
        </div>
        <div className="flex justify-between items-center mt-8">
          <button
            className="text-gray-600 font-semibold hover:underline text-sm focus:outline-none focus:shadow-outline"
            onClick={e => {
              e.preventDefault()
              dispatch({type: 'reset'})
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