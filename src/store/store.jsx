import { persistReducer, persistStore } from 'redux-persist'
// import { storage } from 'redux-persist/lib/storage'
import sessionStorage from 'redux-persist/es/storage/session'

import { createStore, combineReducers } from 'redux'

import { amountReducer, cryptoAmountReducer, countryReducer, userReducer, currenciesReducer } from './reducers'

const persistConfig = {
    key: 'IPERCash2021',
    storage: sessionStorage
}

const RootReducer = combineReducers({ amountReducer, cryptoAmountReducer, countryReducer, userReducer, currenciesReducer })

const persistedReducer = persistReducer(persistConfig, RootReducer)

const store = createStore(persistedReducer)

const persistor = persistStore(store)


export default store
export { persistor }