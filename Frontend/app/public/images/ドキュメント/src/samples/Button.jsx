import React from 'react'

function Button({count, onClick}) {
  return (
    <button onClick={onClick}>Click me: {count}</button>
  )
}

export default Button