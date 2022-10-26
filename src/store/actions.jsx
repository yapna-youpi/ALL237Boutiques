import { SET_AMOUNT, SET_CRYPTO, SET_COUNTRY, SET_USER, SET_CURRENCIES } from './constants';


const changeAmount=(amount=25)=>({
    type: SET_AMOUNT,
    amount: amount
})

const changeCrypto=(amount=10000)=>({
    type: SET_CRYPTO,
    amount: amount
})

const changeCountry=(country='FR')=>({
    type: SET_COUNTRY,
    country: country
})

const setUser=(user={})=>({
    type: SET_USER,
    user: user
})

const setCurrencies=(currencies={})=>({
    type: SET_CURRENCIES,
    currencies: currencies
})

export {changeAmount, changeCrypto, changeCountry, setUser, setCurrencies}