import React, { useState, useEffect } from 'react'
import {useHistory} from 'react-router-dom'
import 'react-phone-number-input/style.css'
import { isValidPhoneNumber } from 'react-phone-number-input'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Modal } from 'react-responsive-modal'

import './sellcrypto.css'
import SellModal from './SellModal';
import { Input } from '../addons/input/Input';
import PhoneInputool from '../addons/input/PhoneInputool'
import { getCryptoRate, checkWalletAddress } from '../../utils/utilFunctions'
import { xafChange, euroChange, cryptoChange } from './handleAmount';
import Sumsub from '../sumsub/Sumsub';

function SellCrypto({Amount, country, User}) {
    const { t } = useTranslation()

     
    console.log(Amount, User)
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
    const [sum, setSum] = useState(false)
    const openModal=()=>{
        setSum(false)
        setModal(!modal)
    }
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
        let interval=setInterval(() => {
            getCryptoRate().then(newRate=>{
                //console.log("l'etat avant", state)
                if(rate) setRate({...rate, BTC: newRate})
            })
        }, 60*1000)
        return () => {
            clearInterval(interval)
        }
    }, [])
    // la fonction qui gere les changement des inputs
    const handleChange=e=>{
        console.log(" c'est le ",e.name);
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
        if( (state.amount && state.number && isValidPhoneNumber(state.number || 342) && state.wallet) && (state.number===state.confirmNumber) )
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
    console.log("the sum ", country)


    return (
        <div id="sellcrypto" className="sellcrypto">
            {sum&&<Modal open={true} onClose={()=>setSum(false)} center={true} >
                <Sumsub call={openModal} close={()=>setSum(false)} />
            </Modal>}
            {modal&&<SellModal open={modal} toogle={setModal} data={state} rate={rate.BTC} />}
            <h1>{ t('sellCrypto')}</h1>
            <div className="sell-container">
                <div className="rate">
                    <h3>{ t('sellCrypto2')}</h3>
                    <div className=""> 1 BTC === {Math.round(rate.BTC*655)} XAF === {rate.BTC} EU </div>
                    <span>{ t('sellCrypto4')} <a href="https://www.coindesk.com/coindesk-api" target="_blank">{ t('sellCrypto3')}  </a> </span> 
                </div>
                <div className="form">
                    <div className="form-group">
                        <Input val={state.wallet} label={t('sellCrypto6')}  name="wallet" help={t('sellCrypto7')} error={errors.wallet || (state.wallet&&!checkWalletAddress(state.wallet))} change={handleChange} handBlur={handleBlur}  />
                    </div>
                    <div className="form-group">
                        <Input val={state.xaf}  label={t('sellCrypto8')} name="xaf" type="number" help={t('sellCrypto9')} change={amountChange} error={state.xaf<3000&&state.xaf!==0}   />
                    </div>
                    {/* <div className="form-group">
                        <Input val={state.eu}  label="Amount in EUR" name="eu" type="number" help="the min value is 15.26 EUR" change={amountChange} />
                    </div> */}
                    <div className="form-group">
                        <Input val={state.amount} label={t('sellCrypto10')} name="crypto" type="number" help={t('sellCrypto11')} change={amountChange}  />
                    </div>
                    <div className="form-group">
                        <Input val={state.xaf*0.05}  label={t('sellCrypto12')}   />
                    </div>
                    <div className="form-group">
                        <PhoneInputool label={t('sellCrypto13')} name="number" help={t('sellCrypto14')}  change={handleChange} error={validPhone(state.number, isValidPhoneNumber)} cm={true} alert={ country !=='CM'} />
                    </div>
                    <div className="form-group">
                        <PhoneInputool label={t('sellCrypto15')} name="confirmNumber" help={t('sellCrypto16')} change={handleChange} error={checkConfirm(state.confirmNumber, state.number)} cm={true} alert={ country !=='CM'} />
                    </div>
                    <div className="form-group">
                        <button disabled={active() || (state.crypto===0) || state.xaf===0 } 
                            // onClick={()=>openModal()} 
                            onClick={ User.kyc ? ()=>openModal() : ()=>setSum(true)} 
                        > {t('sellCrypto5')}
                        </button>
                    </div>
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
export default connect(mapStateToProps)(SellCrypto)