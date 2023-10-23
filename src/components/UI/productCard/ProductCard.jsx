import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {Col} from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import {cartActions} from "../../../redux/slices/cartSlice"
import { toast } from 'react-toastify'

import './product-card.css'

const ProductCard = ({item}) => {

  const Dispatch  = useDispatch()
  const cartItems = useSelector(state => state.cart.cartItems)
  const totalAmount = useSelector(state => state.cart.totalAmount)
  const totalQuantity = useSelector(state => state.cart.totalQuantity)

  const addToCart = ()=>{
    Dispatch(
      cartActions.addItem({
        id: item.id,
        productName: item.productName,
        price: item.price,
        imgUrl: item.imgUrl1,
        quantity: 1,
        totalPrice: item.price
      })
    );
      
    toast.success('produit ajouté avec success')  
  }

  return (
    <Col xs="6" lg="3" md="4" className="mb-4 product_card">
      <div className="product_item">
        <Link to={`/productDetails/${item.id}`}>
          <div className="product_img" >
            <motion.img whileHover={{scale: 0.9}} src={item.imgUrl1} alt="productImg" />
          </div>
        </Link>
       
        <div className="p-2 product-info">
          <h4 className="product_name"><Link to={`/productDetails/${item.id}`}>{item.productName} </Link></h4>
          <span className="pt-4 body_name">{item.category}</span>
        </div>
        <div className="product_card-bottom d-flex align-items-center justify-content-between p-2">
          <span className="price">{item.price + " "}  Xaf </span>
          <motion.span className='btn_carte' whileTap={{scale: 1.2}} onClick={addToCart}>
            ajouter
            <i class="ri-add-circle-fill btn_plus" ></i>
          </motion.span>
        </div>  
      </div>
    </Col>
  );
}

export default ProductCard