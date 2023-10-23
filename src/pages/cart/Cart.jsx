import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'
import Helmet from '../../components/helmet/Helmet'
import CommonSection from '../../components/UI/commonSection/CommonSection'
import {Container, Row, Col} from 'reactstrap'
import { motion } from 'framer-motion'
import {cartActions} from '../../redux/slices/cartSlice'
import products from '../../assets/data/products'
import {useSelector, useDispatch} from 'react-redux'

import './cart.css'

const Cart = () => {

  const cartItems = useSelector(state => state.cart.cartItems)
  const totalAmount = useSelector(state => state.cart.totalAmount)
  const totalQuantity = useSelector(state => state.cart.totalQuantity)
  const store = useSelector(state => state.cart)
  console.log("le store",store)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


  return (
    <Helmet title="panier des produits">
      {/* <CommonSection title="Carte de shopping" /> */}

      <section>
        <Container>
          <Row>
            <Col sm="12" lg="9">
              {cartItems.length == 0 ? (
                <h2 className="fs-4 text-center">
                  Aucun élément ajouté à votre panier
                </h2>
              ) : (
                <table className="table bordered">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Titre</th>
                      <th>Prix</th>
                      <th>Qty</th>
                      <th>Supprimer</th>
                    </tr>
                  </thead>

                  <tbody>
                    {cartItems.map((item, index) => (
                      <LigneItem item={item} index={index} />
                    ))}
                  </tbody>
                </table>
              )}
            </Col>

            <Col sm="12" lg="3">
              <div>
                <h6 className="d-flex w-100 align-items-center justify-content-between">
                  Total partiel
                  <span className="fs-5 fw-bold">{totalAmount} Xaf</span>
                </h6>
                <p className="fs-6 mt-3">
                  Les taxes et les frais d'expédition seront calculés lors de la
                  validation de la commande.
                </p>
                <div>
                  <Link to="/checkout">
                    <button className="btn_detail w-100 ">Commander</button>
                  </Link>
                  <Link to="/shop">
                    <button className="btn_detail w-100 mt-3">Continuer Ajout</button>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
}


const LigneItem = ({item, index}) => {

  // const { imgUrl, productName, price, avgRating, reviews, description, shortDesc, category} = produit
  // const produit = products.find(item => item.id == id)
  const dispatch = useDispatch()

  //function to delete product
  const deleteProduct = ()=>{
    dispatch(cartActions.deleteItem(item.id))
  }
  const removeProduct = ()=> {
    dispatch(cartActions.removeItem(item.id))
  }
  //function to add number of product
  const addNumberProduct = ()=>{
      dispatch(
        cartActions.addItem({
          id: item.id,
          imag: item.imgUrl,
          productName: item.producName,
          price: item.price,
          quantity: 1,
          totalPrice: item.price
        })
      ); 
  }


  return (
    <tr key={index}>
      <td>
      <Link to={`/productDetails/${item.id}`}>
        <img src={item.imgUrl} alt="article1" />
      </Link>
      </td>
      <td ><Link to={`/productDetails/${item.id}`}>{item.producName}</Link></td>
      <td>{item.price} Xaf</td>
      <td>{item.quantity} pcs</td>
      <td>
        <span className='cart_others'>
          <motion.i
            whileTap={{ scale: 1.3 }}
            onClick={removeProduct}
            class="ri-delete-bin-line"
          ></motion.i>
          <span className="cart_add_item">
            <span className="cart_left" onClick={deleteProduct}>
              -
            </span>
            1{" "}
            <span className="cart_rigth" onClick={addNumberProduct}>
              +
            </span>
          </span>
        </span>
      </td>
    </tr>
  );
}

export default Cart