import React, { useState, useContext } from 'react'
import { FaEuroSign } from 'react-icons/fa'
import Modal from 'react-responsive-modal'

import { roundPrecision } from '../../../../utils/utilFunctions'
import { BalanceContext } from '../../Cabital'
import Payment from './Payments'
import RenderInfo from './RenderInfo'
import { useTranslation } from 'react-i18next'

import usdt from './usdt.svg'


function Linked({ data, User }) {
    const { t } = useTranslation()
    const {balance}=useContext(BalanceContext)
    const [state, setState] = useState({ method: '', ...balance })
    // const [state, setState] = useState({ method: '', eur: data.balance.EUR, usdt: data.balance.USDT })
    const [payment, setPayment] = useState({ method: '', active: false })

    const startPayment = (method) => {
        console.log("the payment will start ", method)
        setState({ ...state, method })
    }
    const endPayment = (balance) => {
        setState(({ method: '', eur: balance.EUR, usdt: balance.USDT }))
    }
    // console.log("the state ", state)
    return (
        <div className="linked">
            <div className="balances">
                <span className='inlin'><FaEuroSign /> {roundPrecision(balance.eur, 2)}&ensp; EUR </span>
                <span className='inlin'><img src={usdt} /> {roundPrecision(balance.usdt, 2)}&ensp; USDT </span>
            </div>
            <div className="purchase">
                {payment.active ? <Payment back={() => setPayment({ ...payment, active: false })} process={startPayment} /> :
                    <> 
                        <ul>
                            <li>{t('linked1')} </li>
                            <li>{t('linked2')}  </li>
                        </ul>
                        <button className='btnpays' onClick={() => setPayment({ ...payment, active: true })}>{t('linked3')} </button>
                    </>
                }
            </div>
            {state.method &&
                <Modal open={true} onClose={() => setState({ ...state, method: '' })} closeOnOverlayClick={false}>
                    <RenderInfo User={User} info={data.info.meta || {}} state={defautState}
                        method={state.method} end={endPayment} />
                </Modal>}
        </div>
    )
}

const defautState = {
    "name": "Name for state",
    "phone": "+237651851676",
    "amount": 20,
    "fiat_pay": 16780,
    "transaction_id": "IPC123456789"
}

export default Linked