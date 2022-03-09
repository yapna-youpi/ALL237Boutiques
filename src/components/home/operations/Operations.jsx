import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'

import './operations.css'
import { changeAmount, changeCrypto } from '../../../store/actions';
import image from './undraw_Mobile_pay_re_sjb8.svg';


function Operations({dispatch, Amount, crypto}) {
    const { t }=useTranslation()
    // console.log(dispatch, Amount, crypto)
    const [amount, setAmount]=useState()
    let history=useHistory()

    const handleChange=(e)=>{
        console.log(e.name)
        setAmount(parseInt(e.value))
    }
    const startOperation=(route, op)=>{
        op ? dispatch(changeCrypto(amount)) : dispatch(changeAmount(amount))
        history.push(route)
    }
    return (
        <div className="operations" id="operations">
            <div className="operations-container">
                <h1> {t('operationTitle')} </h1>
                <input type="number" name="amount" placeholder={t('operationPlaceholder')} onChange={(e)=>handleChange(e.target)} />
                <div className="button-operation">
                    <button onClick={()=>startOperation('/sendmoney')} > {t('operationButton1')} </button>
                    <div className="">
                        <button onClick={()=>startOperation('/sellcrypto', 'crypto')}>
                            {t('operationButton2')}
                        </button>
                        <button onClick={()=>startOperation('/buycrypto', 'crypto')} >
                            {t('operationButton3')}
                        </button>
                    </div>
                </div>
            </div>
            <img src={image} alt="" className="picture" />
        </div>
    )
}


const mapStateToProps=state=>({Amount: state.amountReducer.amount, crypto: state.cryptoAmountReducer.crypto})

export default connect(mapStateToProps)(Operations)   //Operations
