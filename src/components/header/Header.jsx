import React, { useRef, useEffect } from "react";
import { Link,useNavigate } from 'react-router-dom'
import { Container,Col,Row } from 'reactstrap'
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { Tooltip } from "reactstrap";
import { auth } from "../../firebase.config";
import { signOut } from "firebase/auth";
import UseAuthe from "../../custom-hooks/UseAuthe";

import Shape from "../UI/shape/Shape";
import logo from "../../assets/images/eco-logo.png";
import logo1 from "../../assets/images/all237.png";
import userIcon from "../../assets/images/user-icon.png";

import "./header.css"
const Header = () => {

  const {t}= useTranslation()
  const navigate = useNavigate()

  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const profileRef = useRef(null);
  
  const boutiqueName = useSelector(state => state.boutique.productName)
  const { currentUser } = UseAuthe();
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const [tooltipOpen, setTooltipOpen] = React.useState(false);
  const [showName, setShowName] = React.useState(false);

   //fction to show profile
   const actionProfile = () => {
    profileRef.current.classList.toggle("show_profile");
  };

  //fction to logout
  const Logout = () => {
    signOut(auth);
    navigate("/");
  };

   //function to add shadow at navbar
   const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        console.log("le scrol active")
        headerRef.current.classList.add("sticky_bottom");
      } else {
        headerRef.current.classList.remove("sticky_bottom");
      }
    });
  };

  useEffect(() => {
    stickyHeaderFunc();
    return () => {
      window.removeEventListener("scroll", stickyHeaderFunc);
    };
  }, []);

  const menuToggle = () => menuRef.current.classList.toggle("active_menu");
  return (
    <Container className="header px-0 " fluid>
      <Container className="header_haut">
        <Row className="mx-0 ">
          <Col
            
            md="3"
            className=" d-flex justify-content-start  align-items-center"
          >
            <div className="logo">
              <Link>
                <img className="logo2" src={logo} alt="logo" />
              </Link>
              <div>
                <Link to="/">
                  <img className="logo1" src={logo1} alt="logo  all 237" />
                  {/* <h2>ALL237</h2> */}
                  {/* <h2>ALL237{showName ? -boutiqueName : t("titre")}</h2> */}
                </Link>
                {/* <p>since 2022</p> */}
              </div>
            </div>
          </Col>

          <Col className="d-flex flex-xs-column-reverse "  md="9">
            <Col  md="10" className="search_bars">
              <div className="position-relative">
                <select className="select">
                  <option defaultValue="all">All</option>
                  <option value="diffuseur">diffuseur</option>
                  <option value="mobile">Mobile</option>
                  <option value="chair">Chair</option>
                  <option value="watch">Watch</option>
                  <option value="wireless">wireless</option>
                </select>

                <input placeholder="I'm shopping for..." className="search_field" type="text" name="" id="" />
                <button className="search_submit">Recherche</button>
                <div className="d-flex d-md-none position-absolute mobil_active">
                  =
                </div>
              </div>
            </Col>
            <Col className="niv_icon" xs="6" md="3">
            <div className="nav_icons">
                <span className="fav_icon">
                  <i class="ri-heart-line"></i>
                  <span className="badge">1</span>
                </span>
                <span
                  id="cart_icon"
                  className="cart_icon"
                  onClick={() => navigate("/cart")}
                >
                  <i
                    class="ri-shopping-bag-line"
                    onClick={() => navigate("/cart")}
                  ></i>
                  <span className="badge">{totalQuantity}</span>
                </span>
                <span>
                  <div className="profile">
                    {!currentUser ? (
                      <i class="ri-user-fill" onClick={actionProfile}></i>
                    ) : (
                      <img
                        onClick={actionProfile}
                        src={currentUser ? currentUser.photoURL : userIcon}
                        alt="user"
                      />
                    )}

                    <div
                      className="profile_actions"
                      ref={profileRef}
                      onClick={actionProfile}
                    >
                      {currentUser ? (
                        <span onClick={Logout}>{t("logout")}</span>
                      ) : (
                        <>
                          <Shape />
                          <div className="d-flex mobile_list  align-items-center justify-content-center flex-column">
                            <Link to="/shop">{t("headerSubtitle1")}</Link>
                            <Link to="/login/1">{t("headerSubtitle2")}</Link>
                            <Link to="/login/0">{t("headerSubtitle3")}</Link>
                            <Link to="/dashboard">{t("headerSubtitle4")}</Link>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </span>
                <div className="mobile_menu" id="mobile_menu">
                  <span onClick={menuToggle}>
                    <i class="ri-menu-line"></i>
                  </span>
                </div>
              </div>
            </Col>
          </Col>
        </Row>
        <div ref={headerRef} className="header_bottom d-flex justify-content-between py-2">
          <Col xs="4" className="mobil_menu">
            <span className='fw-bolder'>Shop By Departement</span>
          </Col>
          <Col xs="8" >                                                   
            <ul className="mon_menu">
              <li>sell on All237</li>
              <li>Track your order</li>
              <li>us dollar</li>
              <li>english</li>
            </ul>
          </Col>
        </div>
      </Container>
    </Container>
  );
}

export default Header
