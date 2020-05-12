import { useState, useRef, useEffect } from 'react'
import useTranslation from 'next-translate/useTranslation'

import Label from '@/UI/Label'
import Counter from '@/UI/Counter'

const SkierInput = props => {
  const node = useRef()
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    document.addEventListener("mousedown", handleClick)

    return () => {
      document.removeEventListener("mousedown", handleClick)
    }
  }, [])

  const handleClick = e => {
    if (node.current.contains(e.target)) { return }
    setIsOpen(false)
  }

  const inputValue = () => {
    const adultsLabel = props.adultsCount > 1 ? `${t('common:label.adult_plural')}` : `${t('common:label.adult')}`
    const childrenLabel = props.childrenCount > 1 ? `${t('common:label.child_plural')}` : `${t('common:label.child')}`
    let skiers = `${props.adultsCount} ${adultsLabel}`
    if (props.childrenCount > 0) {
      skiers += ` - ${props.childrenCount} ${childrenLabel}`
    }
    return skiers
  }

  return (
    <div ref={node} className="relative w-full mt-4 z-50">
      <Label title={t('common:form.skiersLabel')} for="skiersInput" />
      <input
        type="text"
        readOnly
        id="skiersInput"
        className="border border-gray-300 rounded-lg px-2 py-2 h-12 focus:outline-none focus:border-secondary-blue w-full text-gray-800 appearance-none"
        style={{ paddingLeft: '10px' }}
        onFocus={() => setIsOpen(true)}
        value={inputValue()}
      />
      <div className={"bg-white rounded-lg shadow-md px-4 py-6 border border-gray-300 mt-2 w-full absolute " + (isOpen ? 'block' : 'hidden')}>
        <div className="flex justify-between items-center">
          <label className="text-gray-800 text-md tracking-wide">
            {t('common:label.adult_plural')}
          </label>
          <Counter
            value={props.adultsCount}
            label="adults"
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
            {t('common:label.child_plural')}
          </label>
          <Counter
            value={props.childrenCount}
            label="children"
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
            name={t('common:button.cancel')}
            className="text-gray-600 font-semibold hover:underline text-sm focus:outline-none focus:shadow-outline"
            onClick={e => {
              e.preventDefault()
              props.onChange('reset')
              setIsOpen(false)
            }}>
            {t('common:button.cancel')}
          </button>
          <button
            name={t('common:button.save')}
            className="text-secondary-blue font-semibold hover:underline text-sm focus:outline-none focus:shadow-outline"
            onClick={e => {
              e.preventDefault()
              setIsOpen(false)
              document.getElementById('searchButton').focus()
            }}>
            {t('common:button.save')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default SkierInput