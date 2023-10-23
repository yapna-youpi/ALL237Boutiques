import React from 'react'
import { Container,Col,Row } from 'reactstrap'

const Free = () => {
  return (
    <Container>
        <Row>
          <Col xs="10" md="4" mx-auto>
            <span>
              <i className='icon-rocket'></i>
            </span>
            <div>
              <h4>Free delivery</h4>
              <p>For all oders over $99</p>
            </div>
          </Col>
          <Col xs="10" md="4" mx-auto></Col>
          <Col xs="10" md="4" mx-auto></Col>
          <Col xs="10" md="4" mx-auto></Col>
        </Row>
      </Container>
  )
}

export default Free
