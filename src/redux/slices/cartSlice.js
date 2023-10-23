import { createSlice } from '@reduxjs/toolkit'

const initialState = {

    cartItems: [],
    totalAmount: 0,
    totalQuantity: 0
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem:(state, action)=>{
        const newItem = action.payload;
        const existingItem = state.cartItems.find((item)=>item.id === newItem.id)
        console.log("le newItem",newItem)
        
        // state.totalQuantity++

        if(!existingItem){
            state.cartItems.push({
                id: newItem.id,
                producName: newItem.productName,
                imgUrl: newItem.imgUrl,
                price: newItem.price, 
                quantity: newItem.quantity,
                totalPrice: newItem.price 
            })
        } 
        else{
            existingItem.quantity = existingItem.quantity + newItem.quantity
            existingItem.totalPrice = Number(existingItem.totalPrice) + Number(newItem.totalPrice)
        }

        state.totalAmount = state.cartItems.reduce((total, item)=> total + Number(item.price) * Number(item.quantity),0)
        state.totalQuantity = state.cartItems.reduce((quantite,item)=> quantite + Number(item.quantity),0)
    },

    deleteItem: (state, action)=> {
        const id = action.payload
        const existingItem = state.cartItems.find(item => item.id == id )

        if (existingItem.quantity == 1 || existingItem.quantity == 0) {
            state.cartItems = state.cartItems.filter( item => item.id != id)
        } else {
            existingItem.quantity--
        }
        
        state.totalQuantity = state.totalQuantity - 1
        state.totalAmount = state.cartItems.reduce((total, item)=> total + Number(item.price) * Number(item.quantity),0)
    },

    removeItem: (state, action) =>{
        const id = action.payload
        const existingItem = state.cartItems.find(item => item.id == id )

        if (existingItem) {
            state.cartItems = state.cartItems.filter( item => item.id != id)
        }
        
        state.totalQuantity = state.totalQuantity - existingItem.quantity
        state.totalAmount = state.cartItems.reduce((total, item)=> total + Number(item.price) * Number(item.quantity),0)

    }
  }
});

export const cartActions = cartSlice.actions

export default cartSlice.reducer