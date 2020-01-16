import React from 'react'

const Button = (props) => {
  let classes = "bg-secondary-blue text-white font-bold py-3 px-4 w-full rounded-lg shadow-md focus:outline-none focus:shadow-outline z-0 "
  if (props.disabled) {
    classes += "opacity-40 cursor-not-allowed"
  } else {
    classes += "hover:opacity-90"
  }

  return (
    <button
      id={props.id}
      className={classes}
      onClick={props.onClick}>
      {props.children}
    </button>
  )
}

export default Button