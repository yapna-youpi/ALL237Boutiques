import React from 'react'
import { Container } from 'reactstrap'
import "./common-banner.css"

const CommonSection = ({title}) => {
  return (
    <section className="common_banner">
        <Container className='text-center mt-5 ' >
            <h1>{title}</h1>
        </Container>
    </section>
  )
}

export default CommonSection