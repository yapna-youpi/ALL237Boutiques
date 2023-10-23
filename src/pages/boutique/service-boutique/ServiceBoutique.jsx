import React, { useState } from "react";
import { Container, Col, Row } from "reactstrap";
import { getUniqueVal } from "../../../custom-hooks/addon";

import "./service-boutique.css";
import boutiques from "../../../assets/data/boutique";
import BoutiqueCard from "../BoutiqueList.jsx/BoutiqueCard";
import verte from "../../../assets/images/icon-verte.png";
import { NavLink } from "react-router-dom";

const ServiceBoutique = () => {

  const [boutique, setBoutique] = useState(boutiques);
  const [selected, setSelected] = useState(true)
  
  const handleBoutique = (e,index) => {

    setSelected(false)

    let links = document.getElementsByClassName("btq_name")
    console.log(links,"links lance")
    let newLinks = Array.from(links)

    newLinks.forEach(element => {
      switch (element.classList.contains("btq_active")) {
        case true:
          element.classList.remove("btq_active")
          break;
      
        default:
          break;
      }
      
    });

    // links.forEach(element => {
    //   element.className.remove("btq_active")
    // });

    e.target.classList.add("btq_active")

    let boutq = boutiques.filter((item)=> item.category == e.target.firstChild.nodeValue)
    setBoutique(boutq)
  }

  const category_listes = boutiques.map((item)=>item.category)
  const unique_category = category_listes.filter(getUniqueVal)

const setAll = ()=>{
  setSelected(true)
  setBoutique(boutiques)

  let links = document.getElementsByClassName("btq_name")
  let newLinks = Array.from(links)
  newLinks.forEach(element => {
    switch (element.classList.contains("btq_active")) {
      case true:
        element.classList.remove("btq_active")
        break;
    
      default:
        break;
    }
  })
}
  // console.log(unique_category,"la valeur unique")

  return (
    <div className="service_boutique">
      <Container>
        <Row>
          <Col lg="12" className="text-center mb-5">
            <h2 className="div_title">Nos Différentes Boutiques</h2>
          </Col>
          <Col lg="12" className="btq_content">
            <span className={selected ? "btq_active" : "btq_name"} onClick={setAll}>ALL</span>
            {unique_category.map((item, index) => (
              <span
                onClick={(e,index) => handleBoutique(e,index)}
                key={index}
                className="btq_name"
                id="btq_name"
              >
                {item}
              </span>
            ))}
          </Col>
        </Row>
        <Row className="mt-4">
          {boutique.map((item, index) => (
            <Col xs="6" sm="4" lg="2" className="mt-5 d-flex justify-content-center">
              <BoutiqueCard key={index} data={item} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default ServiceBoutique
