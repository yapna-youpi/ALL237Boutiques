import React,{useState} from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import Lang from "../lang/Lang";
import { useTranslation } from "react-i18next";

import "./searchbar.css";
import All237 from "../../../assets/images/all237.png"

const SearchBar = () => {
  const { t } = useTranslation()

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handeSearch = ()=>{
    // setModal(true)
    setModal(!modal)
    console.log("lee modal lancee")
  }
  console.log("l modal",modal)
  return (
    <div className="search_bar">
      <Container>
        <Row className="d-flex justif-content-center align-items-center">
          <Col xs="5" lg="3" md="3">
            <div className="logo_seanrchbar">
              <Link to="/">
                <img src={All237} className="search_img" alt="logo ALL237" />
              </Link>
            </div>
          </Col>
          <Col
            xs="7"
            lg="5"
            md="6"
            className="d-block ms-lg-5   justify-content-between  align-items-center  "
          >
            <div className="search ">
              <div className="formGroup  ">
                <input
                  className="input_search w-100"
                  onChange={handeSearch}
                  type="text"
                  name="text"
                  required
                  //   value=""
                  //   onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder={t("search")}
                />
                <div className="search_result">
                  
                </div>
                <button className="btn_search" onClick={toggle}>
                  Search
                </button>
              </div>
            </div>
          </Col>
          <Col xs="0" lg="3" md="3" className=" d-flex justify-content-end ">
            <div className="searchbar_btn w-100 ">
              <Link to="/login/1">
                <p className="vendez">{t("searchsell")}</p>
              </Link>
            </div>
            <Lang />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SearchBar;
