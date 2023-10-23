import { createSlice } from '@reduxjs/toolkit'

const initialState = {

    boutiqueName: ""
}

const headerSlice = createSlice({

    name: 'header',
    initialState,
    reducers:{
        addBoutique: ( state, action)=>{
            const newItem = action.payload;
            // const existingItem = state.boutiqueName === newItem.productName

            state.boutiqueName = newItem.productName

            // if(!existingItem){
            //     state.boutiqueName.push({
            //                 productName: newItem.productName,
            //             })
            // } else{
            //     state.boutiqueName[0] = newItem.productName
            // }
            
        }
        
    }

})

export const headerActions = headerSlice.actions

export default headerSlice.reducer
