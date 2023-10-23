import React from "react";
import { Container,Col,Row } from "reactstrap";
import "./common-section.css";

const CommonSection = ({ data }) => {
  return (
    <Container fluid className="common_section">
      <img className="img_common_section" src={data.imgUrl} alt="title" />
      <div className="common_section_content">
        <Row>
          <Col md="3">
            <img className="common_profil" src={data.profil} />
          </Col>
          <Row className="colone " >
            <Col md="4" >
              <div className="common_title pt-4">
                <div className="common_name">{data.productName}</div>
                <div className="common_category">{data.category}</div>
              </div>
            </Col>
            <Col md="8" className="d-flex  justify-content-center mt-4">

              <a href="#" className="mx-5">
                <button className="btn_common">Nous Découvrir</button>
              </a>
              <a href="https://api.whatsapp.com/send?phone=678719650" target="_blank">
                <button className="btn_common">Nous Contacter</button>
              </a>
            </Col>
          </Row>

        </Row>
      </div>
    </Container>
  );
};

export default CommonSection;
