import React from 'react'

const Navbar = ({ onPreviousClick, onNextClick, className }) => {
  const style = {
    position: 'absolute',
    top: 14,
    color: '#718096',
    border: '1px solid #E2E8F0',
    padding: '0.2rem 0.7rem',
    cursor: 'pointer'
  }
  const styleLeft = {
    left: 16
  }
  const styleRight = {
    right: 16
  }
  return (
    <div className={className}>
      <button aria-label="previous month" style={{...style, ...styleLeft}} onClick={e => {
        e.preventDefault()
        onPreviousClick()
      }}>
        ←
      </button>
      <button aria-label="next month" style={{...style, ...styleRight}} onClick={e => {
        e.preventDefault()
        onNextClick()
      }}>
        →
      </button>
    </div>
  )
}

export default Navbar