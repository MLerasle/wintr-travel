import React from 'react'

import '../assets/style.css'

const Label = props => (
  <label className="text-gray-800 text-xs font-semibold uppercase tracking-wide mb-1">
    {props.title}
  </label>
)

export default Label