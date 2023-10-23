import React,{useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import Helmet from "../../components/helmet/Helmet";
import CommonSection from "../../components/UI/commonSection/CommonSection";
import { Container, Row, Col } from "reactstrap";

import boutiques from "../../assets/data/boutique";

import "./shopDetails.css";
import ProductsList from "../../components/UI/producList/ProductList";

const ShopDetails = () => {

  const { productName } = useParams();
  const boutique = boutiques.find((item) => item.productName == productName);
  console.log("la nouvelle boutique", boutique);

  const [productData, setProductData] = useState([])
  const [selected, setSelected] = useState('')
  const [searchActiver,setSerchActiver] = useState(false)
  
  useEffect(()=>{
    setProductData(boutique.produits)
    window.scrollTo(0, 0);
  },[])

  const handleChoice = e => {
    setSelected(e.target.value)
    const filterProductData = boutique.produits.filter((item)=>item.category === e.target.value)

    setProductData(filterProductData)
    if (e.target.value == "all") {
      setSerchActiver(false)
    }
    setSerchActiver(true)
  }
  // console.log(productData)
  const handleSearch = e =>{
    let searchTerm = e.target.value
    const searchedProduct = boutique.produits.filter(item => item.productName.toLowerCase().includes(searchTerm.toLowerCase())) 
    setProductData(searchedProduct)
  }

  console.log("les produis de la boutique", boutique.produits)


  return (
    <Helmet title={`Boutique + ${productName}`}>

      <CommonSection data={boutique} />

      <section>
        <Container >
          <Row >
            <Col xs="12" className="colon mt-xs-5 pt-xs-5"> 
              <h1 className="my-5  text-center fw-bolder ">{boutique.shortDesc}</h1>
            </Col>
            <Col xs="6" lg="3" md="6" className="text-end">
              <div className="filter_widget">
                <select onChange={handleChoice}>
                  <option defaultValue="all">Filtrer Par Categories</option>
                  <option value="diffuseur">diffuseur</option>
                  <option value="mobile">Mobile</option>
                  <option value="chair">Chair</option>
                  <option value="watch">Watch</option>
                  <option value="wireless">wireless</option>
                </select>
              </div>
            </Col>
            <Col xs="6" lg="3" md="6">
              <div className="filter_widget">
                <select>
                  <option>Filtrer Par Ordre </option>
                  <option value="Sofa">croissant</option>
                  <option value="mobile">Decroissant</option>
                </select>
              </div>
            </Col>
            <Col lg="6" md="12">
              <div className="search_box">
                <input
                  onChange={handleSearch}
                  type="text"
                  placeholder="Recherche...."
                />
                <span>
                  <i class="ri-search-line"></i>
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="new_arrirals">
        <Container>
          <Row>
            {productData.length == 0 ? (
              <h2>Aucun Produits Disponibles</h2>
            ) : (
              <>
                <Col lg="12" className="text-center mb-5">
                  <h2 className="section_title">Nos Produits: {selected} </h2>
                </Col>
                <ProductsList data={boutique.produits} />
              </>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default ShopDetails;
