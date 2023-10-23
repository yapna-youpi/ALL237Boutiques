import React, { useState, useRef, useEffect } from "react";

import { Container, Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
import products from "../../assets/data/products";
import Helmet from "../../components/helmet/Helmet";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { cartActions } from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";

import "./product_detail.css";
import ProductsList from "../../components/UI/producList/ProductList";
import CommonSection from "../../components/UI/commonSection/CommonSection";

const ProductDetails = () => {
  const { id } = useParams();
  const produit = products.find((item) => item.id == id);
  const [tab, setTab] = useState("desc");
  const [rating, setRating] = useState("");
  const dispatch = useDispatch();
  const [showImg,setShowImg] = useState()
  const [quantity,setQuantity] = useState(1)

  const reviewUser = useRef("");
  const reviewMsg = useRef("");
  const formRef = useRef("");

  const {
    imgUrl1,
    imgUrl2,
    imgUrl3,
    imgUrl4,
    productName,
    price,
    avgRating,
    reviews,
    description,
    shortDesc,
    category,
  } = produit;

  const relatedProducts = products.filter((item) => item.category == category);

  useEffect(() => {
    window.scrollTo(0, 0);
    setShowImg(imgUrl1)
  }, [produit]);

  const handleImg = (e) =>{
    setShowImg(e.target.currentSrc)
    console.log(e.target.currentSrc)
  }

  const handlerSubmit = (e) => {
    e.preventDefault();

    const reviewUserName = reviewUser.current.value;
    const reviewUserMsg = reviewMsg.current.value;

    const reviewObj = {
      userName: reviewUserName,
      text: reviewMsg,
      rating,
    };
    toast.success("Avis soumit");
    formRef.current.reset();
  };

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id,
        imag: imgUrl1,
        productName,
        price: price,
        quantity: quantity,
        totalPrice: price * quantity
      })
    );

    toast.success("produit ajouté avec succèss");
  };
  const addQuantity = ()=>  setQuantity(quantity+1)
  const deleteQuantity = ()=> setQuantity(quantity-1)
  console.log("la quandite de produit",quantity)

  return (
    <Helmet title={productName}>

      <section>
        <Container className="product_detail">
          <Row>
            <Col md="4" sm="12">
              <Col lg="12">
                {
                   <img src={showImg} alt={productName} className="mainImg" />
                }
              </Col>

              <Col>
                <div className="all_img d-flex">
                  <img
                    src={imgUrl1}
                    alt={productName}
                    className="slide"
                    onClick={(e) => handleImg(e)}
                  />
                  <img
                    src={imgUrl2}
                    alt={productName}
                    className="slide"
                    onClick={(e) => handleImg(e)}
                  />
                  <img
                    src={imgUrl3}
                    alt={productName}
                    className="slide"
                    onClick={(e) => handleImg(e)}
                  />
                  <img
                    src={imgUrl4}
                    alt={productName}
                    className="slide"
                    onClick={(e) => handleImg(e)}
                  />
                </div>
              </Col>
            </Col>
            <Col md="5" sm="12">
              <div className="product_details">
                <h1 className="product_name">{productName}</h1>
                <div className="product_rating d-flex align-items-center gap-5 mb-3">
                  <div>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                  </div>
                  <p>({avgRating} ratings)</p>
                </div>

                <div className=" align-items-center gap-5">
                  <span className="product_price">{price} Xaf</span>
                  <br/>
                  <br/>
                  <span className="category_product">Categorie: {category.toUpperCase()}</span>
                </div>
                <p className="mt-3 category_product">{shortDesc}</p>
                <div className="quantity">
                  <span onClick={deleteQuantity}> - </span>
                  <span> {quantity} </span>
                  <span onClick={addQuantity}> + </span>
                </div>
                <motion.button
                  whileTap={{ scale: 1.2 }}
                  className="btn_detail "
                  onClick={addToCart}
                >
                  Add to Cart
                </motion.button>
              </div>
            </Col>
            <Col md="3">
              <h4 className="title_descript">DISTRIBUTION DE PRODUITS</h4>
              <div className="mt-3 ">
                <h6 className="title_descript">Paiement sécurisé</h6>
                <p className="text_descript">
                  Naviguez en toute sécurité et effectuez un paiement sécurisé.
                </p>
              </div>
              <div className="mt-3 ">
                <h6>norme et qualité</h6>
                <p className="text_descript">Ce produit est agrée par la norme iso 9001.</p>
              </div>
              <div className="mt-3 ">
                <h6 className="title_descript">Livraison rapide</h6>
                <p className="text_descript">Option de livraison rapide disponible sur ce produit.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className="tab_wrapper d-flex align-items-center gap-5">
                <h6
                  className={`${tab == "desc" ? "active_tab" : ""}`}
                  onClick={() => setTab("desc")}
                  title="Description"
                >
                  Description
                </h6>
                <h6
                  className={`${tab == "rev" ? "active_tab" : ""}`}
                  onClick={() => setTab("rev")}
                  title="Reviews"
                >
                  Reviews({reviews.length})<i class="ri-arrow-down-s-line"></i>
                </h6>
              </div>

              {tab == "desc" ? (
                <div className="tab_content mt-5">
                  <p>{description}</p>
                </div>
              ) : (
                <div className="product_review">
                  <div className="review_wrapper">
                    <ul className="mt-3">
                      {reviews.map((item, index) => (
                        <li key={index}>
                          <span>{item.rating} (rating)</span>
                          <p>{item.text}</p>
                        </li>
                      ))}
                    </ul>

                    <div className="review_form">
                      <h4>Laisser Votre Avis</h4>
                      <form
                        action=""
                        id="form"
                        ref={formRef}
                        onSubmit={handlerSubmit}
                      >
                        <div className="form_group">
                          <input
                            type="text"
                            placeholder="text here"
                            ref={reviewUser}
                            required
                          />
                        </div>

                        <div className="form_group rating_group d-flex align-items-center gap-5">
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(1)}
                          >
                            1<i className="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(2)}
                          >
                            1<i className="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(3)}
                          >
                            1<i className="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(4)}
                          >
                            1<i className="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(5)}
                          >
                            1<i className="ri-star-s-fill"></i>
                          </motion.span>
                        </div>

                        <div className="form_group">
                          <textarea
                            ref={reviewMsg}
                            rows={4}
                            type="text"
                            placeholder="Review Message..."
                            required
                          />
                        </div>

                        <motion.button
                          whileTap={{ scale: 1.2 }}
                          className="btn_detail"
                        >
                          envoyer
                        </motion.button>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </Col>
          </Row>
        </Container>

        <Container className="mt-3">
          <Row>
            <Col lg="12" className="my-3">
              <h2 className="related_title">Vous pourriez aussi aimer</h2>
            </Col>
            <ProductsList data={relatedProducts} />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default ProductDetails;
