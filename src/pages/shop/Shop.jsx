import React,{useState, useEffect} from 'react'
import Helmet from '../../components/helmet/Helmet'
import CommonBanner from '../../components/UI/commonBanner/CommonBanner'
import { Container,Row,Col } from 'reactstrap'
import products from '../../assets/data/products'
import ProductsList from '../../components/UI/producList/ProductList'

import "./shop.css"

const Shop = () => {

  const [productData, setProductData] = useState([])
  const [selected, setSelected] = useState('')
  const [searchActiver,setSerchActiver] = useState(false)
  
  useEffect(()=>{
    setProductData(products)
    window.scrollTo(0, 0);
  },[])

  const handleChoice = e => {
    setSelected(e.target.value)
    const filterProductData = products.filter((item)=>item.category === e.target.value)

    setProductData(filterProductData)
    if (e.target.value == "all") {
      setSerchActiver(false)
    }
    setSerchActiver(true)
  }
  // console.log(productData)
  const handleSearch = e =>{
    let searchTerm = e.target.value
    const searchedProduct = products.filter(item => item.productName.toLowerCase().includes(searchTerm.toLowerCase())) 
    setProductData(searchedProduct)
  }

  return (
    <Helmet title="boutique">
      {/* <CommonBanner data={products}  /> */}

      <section>
        <Container>
          <Row>
            <Col lg="3" md="6" className='text-end'>
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
            <Col lg="3" md="6">
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
                <input onChange={handleSearch} type="text" placeholder="Recherche...." />
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
            {
              productData.length == 0 ? <h2>Aucun Produits Disponibles</h2> : (
                <>
                  <Col lg="12" className="text-center mb-5">
                    <h2 className="section_title">Categorie: {selected} </h2>
                  </Col>
                  <ProductsList data={productData} />
                </>
              )
            }
          </Row>
        </Container>
      </section>
    </Helmet>
  );
}

export default Shop