import React from "react";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";

import "./footer.css";
import logo from "../../assets/images/all237.png";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <>
      <div className="footer_top"></div>
      <footer className="footer">
        <Container>
          <Row>
            <Col className="footer_firt-content sm:mx-4" lg="3" md="12">
              <div className="logo_footer">
                <img className="me-1" src={logo} alt="logo" />
                {/* <div>
                <h5 className='text-white'>MarshaBoutique</h5>
              </div>  */}
              </div>
              <p className="footer_text mt-4">
                ALL237 groupe est votre espace dédié & votre Salon ou vos produits sont ecoulés facilement
                en 1 click! choissisez le meilleur; choissisez All237Boutiques.
              </p>
            </Col>

            <Col className=" mt-3" lg="8" md="12">
              <Row>
                <Col className="px-3" lg="4" md="4">
                  <div className="footer_quick-links">
                    <h5 className="quick_links-title">Meilleures Categories</h5>
                    <ListGroup className="mt-2">
                      <ListGroupItem className="ps-0 border-0">
                        <Link to="#">Diffuseur</Link>
                      </ListGroupItem>
                      <ListGroupItem className="ps-0 border-0">
                        <Link to="#">Téléphone portable</Link>
                      </ListGroupItem>
                      <ListGroupItem className="ps-0 border-0">
                        <Link to="#">Sac à main</Link>
                      </ListGroupItem>
                      <ListGroupItem className="ps-0 border-0">
                        <Link to="#">Montres de luxes</Link>
                      </ListGroupItem>
                    </ListGroup>
                  </div>
                </Col>

                <Col className="px-3" lg="4" md="4">
                  <div className="footer_quick-links">
                    <h5 className="quick_links-title">Liens Utiles</h5>
                    <ListGroup className="mt-2">
                      <ListGroupItem className="ps-0 border-0">
                        <Link to="/shop">Shop</Link>
                      </ListGroupItem>
                      <ListGroupItem className="ps-0 border-0">
                        <Link to="/cart">Cart</Link>
                      </ListGroupItem>
                      <ListGroupItem className="ps-0 border-0">
                        <Link to="/login">Login</Link>
                      </ListGroupItem>
                      <ListGroupItem className="ps-0 border-0">
                        <Link to="#">Privacy Policy</Link>
                      </ListGroupItem>
                    </ListGroup>
                  </div>
                </Col>

                <Col className="px-3" lg="4" md="4">
                  <div className="footer_quick-links">
                    <h5 className="quick_links-title">Contact</h5>
                    <ListGroup className="footer_contact mt-2">
                      <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                        <span>
                          <i className="ri-map-pin-line"></i>
                        </span>
                        <p>Bienmassi, derrière  Moghamo voyage</p>
                      </ListGroupItem>
                      <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                        <span>
                          <i className="ri-phone-line"></i>
                        </span>
                        <a
                          href="https://api.whatsapp.com/send?phone=237651870240"
                          target="_blank"
                        >
                          <p>+237 677 42 58 13</p>
                        </a>
                      </ListGroupItem>
                      <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                        <span>
                          <i className="ri-mail-line"></i>
                        </span>
                        <a href="exemple@gmail.com">
                          <p>exemple@gmail.com</p>
                        </a>
                      </ListGroupItem>
                    </ListGroup>
                  </div>
                </Col>

                <Col lg="12" className="md-mt-5">
                  <p className="footer_copyright">
                    Copyright {year} developper par{" "}
                    <a
                      className="dev_link"
                      target="_blank"
                      href="https://www.linkedin.com/in/pierre-stallone-guifo-3a9478226/"
                    >
                      Stallone William
                    </a>
                    . Tout droits reservés ALL237Boutiques.
                  </p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
