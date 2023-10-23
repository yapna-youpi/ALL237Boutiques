import { Routes, Route, Navigate} from 'react-router-dom'
import React from 'react'

import Home from '../pages/home/Home'
import Shop from '../pages/shop/Shop'
import Cart from "../pages/cart/Cart"
import Contact from '../pages/contact/Contact'
import ProductDetails from '../pages/productDetail/ProductDetails'
import Checkout from '../pages/checkout/Checkout'
import Login from '../pages/login/Login'
import Signup from '../pages/signup/Signup'
import Boutique from '../pages/boutique/Boutique'
import ProtectedRoutes from './ProtectedRoutes'
import About from '../components/about/About'
import ShopDetails from '../pages/shopDetails/ShopDetails'
import Actualite from '../pages/actualite/Actualite'



const Routers = ({boutique,handleFilter}) => {
  return (
    <Routes>
        <Route exact path="/" element={<Navigate to="home" />} />
        <Route exact path="home" element={<Home />} />
        <Route exact path="Boutique/:productName" element={<ShopDetails />} />
        <Route exact path="shop" element={<Shop />} />
        <Route exact path="contact" element={<Contact />} />
        <Route exact path="productDetails/:id" element={<ProductDetails/>} />
        <Route exact path="cart" element={<Cart />} />
        {/* <Route path={"checkout"} element={Checkout} /> */}
        <Route exact path="about" element={<About/>} />
        <Route exact path="actualite" element={<Actualite/>} />
        <Route exact path="boutique" element={<Boutique />} />
        <Route exact path="checkout" element={<ProtectedRoutes ><Checkout /></ProtectedRoutes>}/>
        <Route exact path="login/:id" element={<Login />} />
        <Route exact path="signup" element={<Signup />} />
    </Routes>
  )
}

export default Routers