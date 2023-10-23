import React,{useEffect} from 'react'
import { Container, Row, Col, Form, FormGroup } from 'reactstrap'
import Helmet from '../../components/helmet/Helmet'
import CommonBanner from '../../components/UI/commonBanner/CommonBanner'
import { UseSelector, useSelector } from 'react-redux'

import './checkout.css'
const Checkout = () => { 

  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])

  const totalQty = useSelector(state => state.cart.totalQuantity)
  const totalAmount = useSelector(state => state.cart.totalAmount)

  return (
    <Helmet title="Checkout">
      <CommonBanner title="checkout" />
      <section>
        <Container>
          <Row>
            <Col lg="8">
              <h6>Billing Information</h6>
              <Form className="billing_form">
                <FormGroup className="form_group">
                  <input type="text" placeholder="Enter Your name" />
                </FormGroup>

                <FormGroup className="form_group">
                  <input type="email" placeholder="Enter Your Email" />
                </FormGroup>

                <FormGroup className="form_group">
                  <input type="number" placeholder="Phone Number" />
                </FormGroup>

                <FormGroup className="form_group">
                  <input type="text" placeholder="street adress" />
                </FormGroup>

                <FormGroup className="form_group">
                  <input type="text" placeholder="City" />
                </FormGroup>

                <FormGroup className="form_group">
                  <input type="text" placeholder="Country" />
                </FormGroup>
              </Form>
            </Col>
            <Col lg="4">
              <div className="checkout_cart">
                <h6>
                  Total Qty: <span>{totalQty} items </span>
                </h6>
                <h6>
                  Sumtotal: <span>${totalAmount} </span>
                </h6>
                <h6>
                  <span>
                    Shipping: <br />
                    Free Shipping
                  </span>
                  <span>$0 </span>
                </h6>

                <h4>
                  Total Coast: <span>${totalAmount}</span>{" "}
                </h4>
                <button className="btn_detail auth_btn">Place an order</button>
              </div>
              
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
}

export default Checkout