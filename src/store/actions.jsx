import { SET_AMOUNT, SET_CRYPTO, SET_COUNTRY, SET_USER } from './constants';


const changeAmount=(amount=25)=>({
    type: SET_AMOUNT,
    amount: amount
})

const changeCrypto=(amount=10000)=>({
    type: SET_CRYPTO,
    amount: amount
})

const changeCountry=(country='CM')=>({
    type: SET_COUNTRY,
    country: country
})

const setUser=(user={})=>({
    type: SET_USER,
    user: user
})

export {changeAmount, changeCrypto, changeCountry, setUser}