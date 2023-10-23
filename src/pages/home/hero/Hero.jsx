import React from 'react'
import { Container,Row,Col } from 'reactstrap'

import "./hero.css"
import diamond from "../../../assets/images/diamond.png"
import compass from "../../../assets/images/compass.png"
import book from "../../../assets/images/book.png"

const data = [
  {
    icon: compass,
    title: "Mission",
    text: "loremps ipmspm mias dgfjlk habiosjkh loremps ipmspm mias dgfjlk habiosjkh loremps ipmspm mias dgfjlk habiosjkh"
  },
  {
    icon: diamond,
    title: "Vision",
    text: " loremps ipmspm mias dgfjlk habiosjkh loremps ipmspm mias dgfjlk habiosjkh loremps ipmspm mias dgfjlk habiosjkh"
  },
  {
    icon: book,
    title: "Histoire",
    text: "loremps ipmspm mias dgfjlk habiosjkh loremps ipmspm mias dgfjlk habiosjkh loremps ipmspm mias dgfjlk habiosjkh"
  }
]

const Hero = () => {
  return (
    <div className='hero'>
      <Container fluid="sm" >
        <Row className='hero_first d-flx justify-content-center'>
          <Col lg="5" md="5" className='px-0 mx-1' >
            <h3 className="hero_first_content">Effectuez vos achats en toutes simpliciter et moins chers</h3>
          </Col>
          <Col lg="6" md="6" className='pt-4 '>
            <h5>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio aperiam saepe iusto, neque facilis adipisci quis delectus facere ab voluptate velit ipsam vitae amet mollitia accusantium? Nemo obcaecati molestias dolore!</h5>
          </Col>
        </Row>
        <Row className='hero_second'>
          {
            data.map((item,key)=>(
              <Col lg="3" md="3" key={key} className='hero_second1'>
                <span className='hero_second2'>
                  <img src={item.icon} alt={item.title} />
                </span>
                <span className='hero_second3'>{item.title}</span>
                <p className='hero_second4'>{item.text}</p>
              </Col>
            ))
          }  
        </Row>
      </Container>
    </div>
  )
}

export default Hero