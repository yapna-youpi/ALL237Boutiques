import React from "react";
import { Container, Row, Col } from "reactstrap";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination,A11y, EffectFade, Autoplay } from "swiper/modules";
import { useTranslation } from "react-i18next";

// Import Swiper styles
import "swiper/css";
import 'swiper/swiper-bundle.css';
import 'swiper/css/autoplay'
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "./banner.css";
import heroImg from "../../../assets/images/hero-img.png";

const Banner = () => {

  const {t} = useTranslation()
  const year = new Date().getFullYear();

  return (
    <>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        loop={true}
        autoplay={{ delay: 2000 }}
        modules={[Pagination,Autoplay, A11y]}
        // slidesPerView={0}
        className="mySwiper"
      >
        <SwiperSlide>
          <section className="hero_section">
            <Container>
              <Row>
                <Col lg="6" md="6">
                  <div className="hero_content">
                    <p className="hero_subtitle">{t("banner1")} {year}</p>
                    <h2>{t("banner2")}</h2>
                    <p>{t("banner3")}</p>

                    <motion.button
                      whileTap={{ scale: 1.2 }}
                      whileHover={{ translateY: "-0.4rem" }}
                      className="buy_btn"
                    >
                      <Link to="/shop">{t("banner4")}</Link>
                    </motion.button>
                  </div>
                </Col>
                <Col lg="6" md="6">
                  <div className="hero_img">
                    <img
                      className="hero_img-content"
                      src={heroImg}
                      alt="heroImage"
                    />
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
        </SwiperSlide>
        <SwiperSlide>
          <section className="hero_section">
            <Container>
              <Row>
                <Col lg="6" md="6">
                  <div className="hero_content">
                    <p className="hero_subtitle">{t("banner1")} {year}</p>
                    <h2>{t("banner2")}</h2>
                    <p>{t("banner3")}</p>

                    <motion.button
                      whileTap={{ scale: 1.2 }}
                      whileHover={{ translateY: "-0.4rem" }}
                      className="buy_btn"
                    >
                      <Link to="/shop">{t("banner4")}</Link>
                    </motion.button>
                  </div>
                </Col>
                <Col lg="6" md="6">
                  <div className="hero_img">
                    <img
                      className="hero_img-content"
                      src={heroImg}
                      alt="heroImage"
                    />
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
        </SwiperSlide>
        <SwiperSlide>
          <section className="hero_section">
            <Container>
              <Row>
                <Col lg="6" md="6">
                  <div className="hero_content">
                    <p className="hero_subtitle">{t("banner1")} {year}</p>
                    <h2>{t("banner2")}</h2>
                    <p>{t("banner3")}</p>

                    <motion.button
                      whileTap={{ scale: 1.2 }}
                      whileHover={{ translateY: "-0.4rem" }}
                      className="buy_btn"
                    >
                      <Link to="/shop">{t("banner4")}</Link>
                    </motion.button>
                  </div>
                </Col>
                <Col lg="6" md="6">
                  <div className="hero_img">
                    <img
                      className="hero_img-content"
                      src={heroImg}
                      alt="heroImage"
                    />
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
        </SwiperSlide>

        {/* <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide> */}
        {/* <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide> */}
      </Swiper>
    </>
  );
};

export default Banner;
