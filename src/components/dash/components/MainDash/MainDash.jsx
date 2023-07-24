import React from 'react'
import './maindash.css'
import Cards from '../Boxcards/Cards'
import Table from '../table/Table'

function MainDash({option}) {
  console.log('option',option)
  return (
    <div className='maindash'>
        <h1>{option}</h1>
        <Cards />
        <h2>Recent Orders</h2>
        <Table />
    </div>
  )
}

export default MainDash