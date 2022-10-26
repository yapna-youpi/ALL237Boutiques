import React, { useState } from 'react'

import First from './first/First'
import Form from './form/Form'

import './cabitals.css'

const BalanceContext = React.createContext()

function Cabital() {
    const [balance, setBalance] = useState({ eur: 0, usdt: 0, ready: false })


    return (
        <div id="cabital" className='cabitals'>
            <div className="cabital-content">
                <BalanceContext.Provider value={{ balance, setBalance }}>
                    <First />
                    <Form />
                </BalanceContext.Provider>
            </div>
        </div>
    )
}


export default Cabital
export { BalanceContext }