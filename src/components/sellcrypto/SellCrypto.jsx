import React, { useState, useEffect, createRef } from 'react'
import 'react-phone-number-input/style.css'
import { isValidPhoneNumber } from 'react-phone-number-input'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Modal } from 'react-responsive-modal'
import Modal2 from '../sendmoney/Modal2'

import './sellcrypto.css'
import SellModal from './SellModal';
import { Input } from '../addons/input/Input';
import PhoneInputool from '../addons/input/PhoneInputool'
import Fiats from '../addons/Fiats/Fiats'
import { getCryptoRate, checkWalletAddress } from '../../utils/utilFunctions'
import { xafChange, euroChange, cryptoChange } from './handleAmount'
import Sumsub from '../sumsub/Sumsub'

function SellCrypto({Amount, country, User}) {
    //initialisation de variabl d'environnement
    let enable = process.env.REACT_APP_SELL_ENABLE;
    const [mode, setMode] = useState(false)

    const { t } = useTranslation()
    // initialisation des taux de changes
    const [rate, setRate] = useState({ EUR: 0, USD: 0})
    // initialisation du state du composants
    const [state, setState] = useState({
        crypto: "BTC", operator: "", amount: 0, xaf: 0, eu: 0, rate: rate.euroChange, number: "",
        confirmNumber: "", wallet: "", fiat: 'EUR',
    })
    // initialisation du state des erreurs
    const [errors, setErrors]= useState({
        xaf: false, wallet: false, number: false, confirmNumber: false
    })
    const [modal, setModal] = useState(false)
    const [sum, setSum] = useState(false)
    const myRef=createRef(null)
    useEffect(async() => {
        getCryptoRate().then(newRate=>{
            if(!newRate) return
           
            setRate({...rate, EUR: newRate.EUR.rate_float, USD: newRate.USD.rate_float})
            setState({...state, rate: newRate[state.fiat].rate_float, ...xafChange(Amount, newRate)})
        })
        let interval=setInterval(() => {
            getCryptoRate().then(newRate=>{
                if(!newRate) return
                
                setRate({...rate, EUR: newRate.EUR.rate_float, USD: newRate.USD.rate_float})
            })
        }, 60*1000)
        return () => {
            clearInterval(interval)
        }
    }, [])
    const openModal=()=>{
        setSum(false)
        setModal(!modal)
    }
    // function that manage change event on input fields
    const handleChange=e=>{
        let newState=state
        newState[e.name]=e.value
        setState({...state})
    }
    // function that manage blur event on input fields
    const handleBlur=e=>{
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
    // function that manage the change of amount on each field
    const amountChange=e=>{
        let result
        switch (e.name) { // amount c'est le montant en crypto monnaie 
            case "crypto":
                result=cryptoChange(e.value, rate[state.fiat])
                setState({...state, ...result})
            break
            case "xaf":
                result=xafChange(e.value, rate[state.fiat])
                setState({...state, ...result})
            break;
            
            case "eu":
                result=euroChange(e.value, rate[state.fiat])
                setState({...state, ...result})
            break;
            default:
            break;
        }
    }
    // function that manages the activation of the button
    const active=()=>{
        if( ((state.amount&&(state.xaf>=6550 && state.xaf<32750)) && state.number && isValidPhoneNumber(state.number || 342)) 
            && (state.number===state.confirmNumber) && (state.wallet && checkWalletAddress(state.wallet)) )
            return false
        else return true
    }
    // function that checks and valid phone number
    const validPhone=(value, func)=>{
        if(value) {
            return !func(value)
        }
        return false
    }
    // function that check if the phone numbers are identical
    const checkConfirm=(value1, value2)=>{
        if(value1) {
            return value1!==value2
        }
        return false
    }
    const changeFiat=(f)=>{
        let result=cryptoChange(state.amount, rate[f])
        setState({...state, ...result, fiat: f, rate: rate[f]})
    }

    const Eclip = () =>{
        if (enable == "FALSE") {
            setMode(!mode)
        }else{
            if(User.kyc){
                openModal()
            }else{
                setSum(true)
            }
        }
    }
  
    return (
        <div id="sellcrypto" className="sellcrypto" ref={myRef}>
            {enable ==="FALSE"  ? <h3 className='disjoint'>Le service est indisponible</h3> : ""}
            <Modal2 mode={mode} close={()=>setMode(false)}  />
            
            {sum&&<Modal open={true} onClose={()=>setSum(false)} center={true} container={myRef.current} > 
                <Sumsub call={openModal} close={()=>setSum(false)} />
            </Modal>}
            {modal&&<SellModal open={modal} toogle={setModal} data={state} rate={rate[state.fiat]} User={User} />}

            <h1>{ t('sellCrypto')}</h1>
            <div className="sell-container">
                <div className="rate">
                    <Fiats action={changeFiat} fiat={state.fiat} />
                    <h3>{ t('sellCrypto2')}</h3>
                    <div className=""> 1 BTC === {Intl.NumberFormat('de-DE').format(Math.round(rate[state.fiat]*655))} XAF === {Intl.NumberFormat('de-DE').format(rate[state.fiat])} {state.fiat} </div>
                    <span><a href="https://www.coindesk.com" target="_blank">{ t('sellCrypto4')} { t('sellCrypto3')}  </a> </span> 
                </div>
                <div className="form">
                    <div className="form-group">
                        <Input val={state.wallet} label={t('sellCrypto6')}  name="wallet" help={t('sellCrypto7')}
                            error={errors.wallet || (state.wallet && !checkWalletAddress(state.wallet))}
                            change={handleChange} handBlur={handleBlur}
                        />
                    </div>
                    <div className="form-group">
                        <Input val={state.xaf} label={t('sellCrypto8')} name="xaf" type="number" help={t('sellCrypto9')}
                            change={amountChange} error={(state.xaf<6550 || state.xaf>32750)&&state.xaf!==0}
                        />
                    </div>
                    <div className="form-group">
                        <Input val={state.eu}  label={t('buyCryptoMobileSous9')+' '+state.fiat} 
                            name="eu" type="number" help={t('sellCrypto17')} change={amountChange}
                            error={(state.eu<10 || state.eu>50)&&state.eu!==0}
                        />
                    </div>
                    <div className="form-group">
                        <Input val={state.amount} label={t('sellCrypto10')} name="crypto" type="number" 
                            help={t('sellCrypto11')} change={amountChange}
                            error={(state.amount<0.000296 || state.amount>0.00148485)&&state.amount!==0}
                        />
                    </div>
                    <div className="form-group">
                        {/* val={state.xaf*0.0395+250}  */}
                        <Input val={ state.xaf ? state.xaf*0.0395+250 : 0} label={t('sellCrypto12')} />  
                        {/* TODO: should fee calcul to handle amount */}
                    </div>
                    <div className="form-group">
                        <PhoneInputool label={t('sellCrypto13')} name="number" help={t('sellCrypto14')} 
                            change={handleChange} error={validPhone(state.number, isValidPhoneNumber)} 
                            cm={true} alert={ country !=='CM'}
                        />
                    </div>
                    <div className="form-group">
                        <PhoneInputool label={t('sellCrypto15')} name="confirmNumber" help={t('sellCrypto16')} 
                            change={handleChange} error={checkConfirm(state.confirmNumber, state.number)}
                            cm={true} alert={ country !=='CM'}
                        />
                    </div>
                    <div className="form-group">
                        <button disabled={active() || (state.crypto===0) || state.xaf===0 } 
                            // onClick={()=>openModal()} 
                            onClick={ ()=>Eclip()} 
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