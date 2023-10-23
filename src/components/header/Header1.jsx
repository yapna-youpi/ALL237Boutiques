import React, { useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Container, Row } from "reactstrap";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { Tooltip } from "reactstrap";
import { auth } from "../../firebase.config";
import { signOut } from "firebase/auth";
import { useTranslation } from "react-i18next";

import "./header.css";
import UseAuthe from "../../custom-hooks/UseAuthe";
import logo from "../../assets/images/eco-logo.png";
import userIcon from "../../assets/images/user-icon.png";
import SearchBar from "./searchbar/SearchBar"
import Shape from "../UI/shape/Shape";

const Header = () => {

  const {t} = useTranslation()

  const nav_links = [
    {
      path: "Home",
      display: `${t("link1")}`,
    },
    {
      path: "boutique",
      display: `${t("link2")}`,
    },
    {
      path: "about",
      display: `${t("link3")}` ,
    },
    {
      path: "actualite",
      display: `${t("link4")}`,
    }
  ];

  const boutiqueName = useSelector(state => state.boutique.productName)

  const { currentUser } = UseAuthe();
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const [tooltipOpen, setTooltipOpen] = React.useState(false);
  const [showName, setShowName] = React.useState(false);

  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const profileRef = useRef(null);

  //function to add shadow at navbar
  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky_header");
      } else {
        headerRef.current.classList.remove("sticky_header");
      }
    });
  };

  useEffect(() => {
    stickyHeaderFunc();

    if (boutiqueName) {
      setShowName(true)
    }
    return () => {
      window.removeEventListener("scroll", stickyHeaderFunc);
    };
  }, []);

  const menuToggle = () => menuRef.current.classList.toggle("active_menu");
  const toggleTooltip = () => setTooltipOpen(!tooltipOpen);

  //fction to show profile
  const actionProfile = () => {
    profileRef.current.classList.toggle("show_profile");
  };

  //fction to logout
  const Logout = () => {
    signOut(auth);
    navigate("/");
  };

  console.log("le product name",boutiqueName)

  return (
    <>
      <header className="header" ref={headerRef}>
        <Container>
          <Row>
            <div className="nav_wrapper">
              <div className="logo">
                <img src={logo} alt="logo" />
                <div>
                  <Link to="/">
                    <h2>ALL237</h2>
                    {/* <h2>ALL237{showName ? -boutiqueName : t("titre")}</h2> */}
                  </Link>
                  {/* <p>since 2022</p> */}
                </div>
              </div>

              <div className="navigation_search">
                <div className="hd_group">
                    <select className="search_select">
                      <option defaultValue="all">All</option>
                      <option value="diffuseur">diffuseur</option>
                      <option value="mobile">Mobile</option>
                      <option value="chair">Chair</option>
                      <option value="watch">Watch</option>
                      <option value="wireless">wireless</option>
                    </select>
                    
                    <input className="search_field" type="text" name="" id="" />
                    <button className="search_submit">Recherche</button>
                </div>
              </div>

              {/* <div className="navigation" ref={menuRef} onClick={menuToggle}>
                <ul className="menu">
                  {nav_links.map((item, index) => (
                    <li className="nav_item" key={index}>
                      <NavLink
                        to={item.path}
                        className={(navClass) =>
                          navClass.isActive ? "nav_active" : ""
                        }
                      >
                        {item.display}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div> */}

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
                      <i class="ri-user-fill"></i>
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
            </div>
            <div>
              <Tooltip
                placement="top"
                isOpen={tooltipOpen}
                autohide={false}
                target="cart_icon"
                toggle={toggleTooltip}
              >
                Pannier
              </Tooltip>
            </div>
          </Row>
        </Container>
      </header>
    </>
  );
};

export default Header;
