import { SET_AMOUNT, SET_CRYPTO, SET_COUNTRY, SET_USER } from './constants';

const initialState={amount: 25, crypto: 0, country: 'CM', user: {}}

const amountReducer=(state=initialState, action)=>{
    switch (action.type) {
        case SET_AMOUNT:
            return {amount: action.amount}
        default:
            return state
    }
}

const cryptoAmountReducer=(state=initialState, action)=>{
    switch (action.type) {
        case SET_CRYPTO:
            if(action.amount>=0) return {...state, crypto: action.amount}
            else return state
        default:
            return state
    }
}

const countryReducer=(state=initialState, action)=>{
    switch (action.type) {
        case SET_COUNTRY:
            return {...state, country: action.country}
        default:
            return state
    }
}

const userReducer=(state=initialState, action)=>{
    switch (action.type) {
        case SET_USER:
            return {...state, user: action.user}
        default:
            return state
    }
}

export { amountReducer, cryptoAmountReducer, countryReducer, userReducer }