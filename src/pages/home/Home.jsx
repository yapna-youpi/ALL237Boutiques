import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Container, Row, Col} from 'reactstrap'
import { motion } from 'framer-motion'

import Helmet from '../../components/helmet/Helmet'
import heroImg from '../../assets/images/hero-img.png'
import counterImg from '../../assets/images/counter-timer-img.png'
import products from '../../assets/data/products'


import './home.css'
import Services from '../../components/services/Services'
import ProductsList from '../../components/UI/producList/ProductList'
import Clock from '../../components/UI/clock/Clock'
import Banner from './banner/Banner'
import Hero from './hero/Hero'
import ServiceBoutique from '../boutique/service-boutique/ServiceBoutique'

const Home = () => {

  const [trendingProducts, setTrendingProducts] = useState([])
  const [bestSalesProducts, setBestSalesProducts] = useState([])
  const [mobileProducts, setMobileProducts] = useState([])
  const [wirelessProducts, setWirelessProducts] = useState([])
  const [popularProducts, setPopularProducts] = useState([])

  const navigate = useNavigate()
  
  const year = new Date().getFullYear()

   useEffect(() => {
     const filteredTrendingProducts = products.filter(
      item => item.category === "diffuseur"
     )
     const filteredBestSalesProducts = products.filter(
      item => item.category === "chair"
     )
     const filteredMobileProducts = products.filter(
      item => item.category === "mobile"
     )
     const filteredWirelessProducts = products.filter(
      item => item.category === "wireless"
     )
     const filteredPopularProducts = products.filter(
      item => item.category === "watch"
     )

     setTrendingProducts(filteredTrendingProducts)
     setBestSalesProducts(filteredBestSalesProducts)
     setMobileProducts(filteredMobileProducts)
     setWirelessProducts(filteredWirelessProducts)
     setPopularProducts(filteredPopularProducts)
    //  console.log("les produits de la database", products)
   
    }, [])

    //function to control scrool
    const stickyHeaderFunc =()=>{
      let rootElement = document.querySelector("#home");
      let toUp = document.querySelector(".to-up");

      window.addEventListener("scroll", () => {
        if (
          document.body.scrollTop > 600 ||
          document.documentElement.scrollTop > 600
        ) {
          toUp.classList.add("appear");
        } else {
          toUp.classList.remove("appear");
        }
      });
    }

    
  useEffect(() => {
    stickyHeaderFunc()

    return () => {};
  }, []);
   

  return (
    <Helmet title={"Home"} id="home" >
      <div className="pt-5 my-5 ">

      </div>
      {/* <Banner /> */}

      
      <Services />
      <Hero />
      <a onClick={() => window.scrollTo(0, 0)}>
        <div className="to-up">
          {" "}
          <i class="ri-arrow-up-line text-white fs-4"></i>{" "}
        </div>
      </a>

      <ServiceBoutique />
      {/* <section className="best_sales">
      </section> */}

      <section className="trending_products">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h2 className="section_title">Produits à la Mode</h2>
            </Col>
            <ProductsList data={trendingProducts} />
          </Row>
        </Container>
      </section>

      {/* <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h2 className="section_title">Nos Différentes Boutiques</h2>
            </Col>
            <ProductsList data={bestSalesProducts} />
          </Row>
        </Container> */}

      {/* <section className="timer_count px-5">
        <Container>
          <Row>
            <div className="clock-top-content">
              <h4 className="text-white fs-6 mb-2">Offres Limitées</h4>
              <h3 className="text-white fs-5 mb-3">Qualitée Armchair</h3>
            </div>
            <Col  lg="6" md="6"className='tim'>
              <Clock durée={360000000} />
              <motion.button
                whileTap={{ scale: 1.2 }}
                whileHover={{ translateY: "-0.4rem" }}
                className="buy_btn store_btn"
                onClick={()=> navigate('/shop')}
              >
                Acquérir
              </motion.button>
            </Col>
            <Col lg="6" md="6" className="text-end">
              <img src={counterImg} alt="counterImg" />
            </Col>
          </Row>
        </Container>
      </section> */}

      <section className="new_arrirals">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h2 className="section_title">Nouveaux Produits</h2>
            </Col>
            <ProductsList data={mobileProducts} />
            <ProductsList data={wirelessProducts} />
          </Row>
        </Container>
      </section>

      {/* <section className="popular_category">
        <Container >
          <Row>
            <Col lg="12" className='text-center mb-5'>
              <h2 className='section_title'>Categories Populaires</h2>
            </Col>
            <ProductsList  data={popularProducts} />
          </Row>
        </Container>
      </section> */}
    </Helmet>
  );
}

export default Home