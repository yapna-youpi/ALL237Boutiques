import React, { useState, useEffect } from 'react'
import {useHistory} from 'react-router-dom'
import { Modal } from 'react-responsive-modal';
import ReactLoading from 'react-loading'
import { TiWarningOutline } from 'react-icons/ti'
import { FaCheck, FaArrowLeft } from 'react-icons/fa'
import { connect } from 'react-redux'
import { isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { useTranslation } from 'react-i18next'

import './buycrypto.css'
import {Input, Input2} from '../addons/input/Input';
import PhoneInput from '../addons/input/PhoneInput'
import { randomId, getCryptoRate, checkWalletAddress } from '../../utils/utilFunctions'
import { xafChange, euroChange, cryptoChange } from './handleMobile'

function BuyCryptoMobile({Amount, country, User}) {
    const { t } = useTranslation()
    // initialisation des taux de changes
    const [rate, setRate] = useState({BCH: 575.69, BTC: 0, ETH: 2075.48})
    // initialisation du state du composants
    const [state, setState] = useState({
        crypto: "BTC", operator: "", amount: 0, xaf: 0, eu: 0, rate: rate.BTC, number: "", confirmNumber: "", wallet: ""
    })
    // initialisation du state des erreurs
    const [errors, setErrors]= useState({
        xaf: false, wallet: false, number: false, confirmNumber: false
    })
    const [modal, setModal] = useState(false)
    const [valid, setValid] = useState(false)
    const openModal=()=>setModal(!modal)
    let history=useHistory()
    useEffect(async() => {
        getCryptoRate().then(newRate=>{
            // console.log("le nouveau rate", newRate)
            if(rate) {
                //setState
                setRate({...rate, BTC: newRate})
                setState({...state, rate: newRate, ...xafChange(Amount, newRate)})

            }
        })
        setInterval(() => {
            let interval=getCryptoRate().then(newRate=>{
                // console.log("l'etat avant", state)
                if(rate) setRate({...rate, BTC: newRate})
            })
            return () => {
                clearInterval(interval)
            }
        }, 60*1000);
    }, [])

    // la fonction qui gere les changement des inputs
    const handleChange=e=>{
        //console.log(e.name);
        let newState=state
        newState[e.name]=e.value
        setState({...state})
    }
    // la fonction qui gere l'evenement onBlur des inputs
    const handleBlur=e=>{
        console.log(e.name)
        if(e.value==="") {
            let newErrors=errors
            newErrors[e.name]=true
            setErrors({...errors})
        } else {
            let newErrors=errors
            newErrors[e.name]=false
            setErrors({...errors})
        }
    }
    // fonction qui gere les changements de montants
    const amountChange=e=>{
        let result
        switch (e.name) { // amount c'est le montant en crypto monnaie 
            case "crypto":
                console.log("c'est le montant")
                result=cryptoChange(e.value, rate.BTC)
                setState({...state, ...result})
            break
            case "xaf":
                console.log("c'est le xaf")
                result=xafChange(e.value, rate.BTC)
                setState({...state, ...result})
            break;
            
            case "eu":
                console.log("c'est le eu")
                result=euroChange(e.value, rate.BTC)
                setState({...state, ...result})
            break;
            default:
                console.log("c;est autre chose")
            break;
        }
    }
    // fonction qui gere l'activation du bouton
    const active=()=>{
        if( (state.amount && state.number && isValidPhoneNumber(state.number || 342) && state.wallet) && (state.number===state.confirmNumber) && checkWalletAddress(state.wallet) )
            return false
        else return true
    }
    const validPhone=(value, func)=>{
        if(value) {
            console.log("value ", value)
            return !func(value)
        }
        return false
    }
    const checkConfirm=(value1, value2)=>{
        if(value1) {
            console.log(value1===value2)
            return value1!==value2
        }
        return false
    }
    // fonction qui verifie la correspondance des addresse
    const checkAddress=e=>{
        console.log("hello")
        if(e.value===state.wallet) {
            console.log("ils correspondent")
            sessionStorage.clear()
            sessionStorage.setItem('data', JSON.stringify({...state, id: randomId('BM'), rate: rate.BTC, User: User}))
            setValid(true)
            setTimeout(()=>history.push('/purchase'), 2000)
        }
    }

    console.log(state)
    return (
        <div className="buycrypto">
            <Modal open={modal} onClose={()=>setModal(!modal)} showCloseIcon={false} center classNames={{modal: 'custom-modal'}}>
                <div className="modal-confirm">
                    <div className="modal-head">
                        <TiWarningOutline size={70} color="#fbbd07" style={{verticalAlign: 'middle'}} />
                        <h2>{t('buyCryptoMobileTitle')}</h2>
                    </div>
                    <div className="modal-body">
                        <div className="wallet-div">
                            <b>{t('buyCryptoMobileSous1')} </b><br/> <br/>
                            {state.wallet}
                        </div> <br/>
                        <div className="form-group">
                            <Input2 label="paste your wallet address here" change={checkAddress} />
                        </div>
                        <div className="load">
                            {valid ? (<FaCheck size={50} color="#CC1616" />) : (<ReactLoading type="spinningBubbles" color='#CC1616' height={70} width={70} />)} 
                        </div>
                        <span onClick={()=>setModal(!modal)}> <FaArrowLeft />{t('buyCryptoMobileSous2')}</span>
                    </div>
                </div>
            </Modal>
            <h1>{t('buyCryptoMobileSous3')}</h1>
            <div className="buy-container">
                <div className="rate">
                    <h3>{t('buyCryptoMobileSous5')}</h3>
                    <div className=""> 1 BTC === {Math.round(rate.BTC*655)} XAF === {rate.BTC} EU </div>
                    <span>{t('buyCryptoMobileSous6')} <a href="https://www.coindesk.com/coindesk-api" target="_blank">{t('buyCryptoMobileSous4')}</a> </span> 
                </div>
                <div className="form">
                    <div className="form-group">
                        <Input val={state.xaf}  label={t('buyCryptoMobileSous7')} name="xaf" type="number" help={t('buyCryptoMobileSous8')} change={amountChange} error={state.xaf<10000&&state.xaf!==0}   />
                    </div>
                    <div className="form-group">
                        <Input val={state.eu}  label={t('buyCryptoMobileSous9')} name="eu" type="number" help={t('buyCryptoMobileSous10')}  change={amountChange} />
                    </div>
                    <div className="form-group">
                        <Input val={state.amount} label={t('buyCryptoMobileSous11')} name="crypto" type="number" help={t('buyCryptoMobileSous12')} change={amountChange}  />
                    </div>
                    <div className="form-group">
                        <PhoneInput label={t('buyCryptoMobileSous13')} name="number" help={t('buyCryptoMobileSous14')} change={handleChange} error={validPhone(state.number, isValidPhoneNumber)} country={country} />
                    </div>
                    <div className="form-group">
                        <PhoneInput label={t('buyCryptoMobileSous15')} name="confirmNumber" help={t('buyCryptoMobileSous16')} change={handleChange} error={checkConfirm(state.confirmNumber, state.number)} country={country} />
                    </div>
                    <div className="form-group">
                        <Input val={state.wallet} label={t('buyCryptoMobileSous17')} name="wallet" help={t('buyCryptoMobileSous18')} error={errors.wallet || (state.wallet&&!checkWalletAddress(state.wallet))} change={handleChange} handBlur={handleBlur}  />
                    </div>
                    <div className="form-group">
                        <button disabled={active() || (state.crypto===0) || state.xaf===0 } 
                            onClick={()=>openModal()} 
                        > 
                            {(state.rate===0) ? t('buyCryptoMobileSous19'):t('buyCryptoMobileSous20')} 
                        </button>
                    </div>
                {/* 13tuVVNDH1PLfUEiTEPkMDRQfTRVHyiYn2 */}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps=state=>({
    Amount: state.cryptoAmountReducer.crypto,
    country: state.countryReducer.country,
    User: state.userReducer.user
})


export default connect(mapStateToProps)(BuyCryptoMobile)

