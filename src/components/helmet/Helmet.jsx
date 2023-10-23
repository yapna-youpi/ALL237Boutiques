import React from 'react'

const Helmet = (props) => {

    document.title = "ALL237Bouiques - " + props.title
  return (
    <div className='w-100 helmet'>{props.children}</div>
  )
}

export default Helmet