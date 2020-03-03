import React from 'react'

const Header = (props) => (
  <h1 className={`text-2xl leading-tight font-semibold text-gray-800 ${props.className}`}>
    {props.children}
  </h1>
)

export default Header