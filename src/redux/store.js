import  { configureStore } from '@reduxjs/toolkit'
import cartSlice from './slices/cartSlice'
import headerSlice from "./slices/headerslice"

const store = configureStore({
    reducer: {
        cart: cartSlice,
        boutique: headerSlice,
    }
})  

export default store 