import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'

import './operations.css'
import Countries from './Countries'
import { changeAmount, changeCrypto } from '../../../store/actions';
import image from './undraw_Mobile_pay_re_sjb8.svg';

const appUrl="http://localhost:3000/"

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
        <>
        {/* <div className='contrie'><Countries /></div> */}
        <div className="operations" id="operations">
            <div className="operations-container" data-aos="zoom-in"  data-aos-duration="800" data-aos-once="true" >
                <div className='thead' >
                    <h1 className='theader'> {t('operationTitle')} </h1>
                </div>
                <div className="listen">
                    <input type="number" name="amount" placeholder={t('operationPlaceholder')} onChange={(e)=>handleChange(e.target)} />
                    <div className='contri'><Countries /></div> 
                </div>
                <div className="button-operation">
                    <button className='btn-neon' onClick={()=>startOperation('/sendmoney')} > 
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        {t('operationButton1')} 
                    </button>
                    <div className="taille">
                        <button className='btn-neon' onClick={()=>startOperation('/sellcrypto', 'crypto')}>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            {t('operationButton2')}
                        </button>
                        <button className='btn-neon' onClick={()=>startOperation('/buycrypto', 'crypto')} >
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            {t('operationButton3')}
                        </button>
                    </div>
                </div>
            </div>
            <img src={image} alt="" className="picture" data-aos="fade-up"  data-aos-duration="1500" data-aos-once="true" />
        </div>
        </>
    )
}


const mapStateToProps=state=>({Amount: state.amountReducer.amount, crypto: state.cryptoAmountReducer.crypto})

export default connect(mapStateToProps)(Operations)   //Operations
