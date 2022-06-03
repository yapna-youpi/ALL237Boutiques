import React, { useState, useEffect } from 'react'
import {useHistory} from 'react-router-dom'
import { connect } from 'react-redux'
import { Modal } from 'react-responsive-modal'
import ReactLoading from 'react-loading'
import { useTranslation } from 'react-i18next'

import Widget from './Widget';
import {Input} from '../addons/input/Input'
import Fiats from '../addons/Fiats/Fiats'
import {randomId, getCryptoRate, sendToApi, checkWalletAddress } from '../../utils/utilFunctions'
import { xafChange, euroChange, cryptoChange } from './handleCard';

let interval=null

function BuyCryptoCard({Amount, User}) {
    const { t } = useTranslation()
    const [operationId, setId]=useState({id: randomId('BC'), status: false})
    // initialisation des taux de changes
    const [rate, setRate] = useState({ EUR: 0, USD: 0 })
    // initialisation du state du composants
    const [state, setState] = useState({
        crypto: "BTC", operator: "", amount: 0, xaf: 0, eu: 0, fiat: 'EUR',
        rate: rate.EUR, number: "", confirmNumber: "", wallet: ""
    })
    // initialisation du state des erreurs
    const [errors, setErrors]= useState({
        xaf: false, wallet: false, number: false, confirmNumber: false
    })
    const [modal, setModal] = useState(false)
    const openModal=()=>setModal(!modal)
    useEffect(async() => {
        getCryptoRate().then(newRate => {
            if (!newRate) return
            console.log("the new rate ", newRate)
            setRate({ ...rate, EUR: newRate.EUR.rate_float, USD: newRate.USD.rate_float })
            setState({ ...state, rate: newRate[state.fiat].rate_float, ...xafChange(Amount, newRate) })
        })
        interval = setInterval(() => {
            getCryptoRate().then(newRate => {
                if (!newRate) return
                setRate({ ...rate, EUR: newRate.EUR.rate_float, USD: newRate.USD.rate_float })
            })
        }, 60 * 1000)
        return () => {
            clearInterval(interval)
        }
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
                result=cryptoChange(e.value,  rate[state.fiat])
                setState({...state, ...result})
            break
            case "xaf":
                console.log("c'est le xaf ",  rate[state.fiat])
                result=xafChange(e.value,  rate[state.fiat])
                setState({...state, ...result})
            break;
            
            case "eu":
                console.log("c'est le eu")
                result=euroChange(e.value,  rate[state.fiat])
                setState({...state, ...result})
            break;
            default:
                console.log("c;est autre chose")
            break;
        }
    }
    const changeFiat = (f) => {
        let result = cryptoChange(state.amount, rate[f])
        setState({ ...state, ...result, fiat: f, rate: rate[f] })
    }
    // fonction qui gere l'activation du bouton
    // const active=()=>{
    //     if( (state.amount && state.wallet) )
    //         return false
    //     else return true
    // }
    const active = () => {
        if (((state.xaf && state.xaf >= 16500) ) && (state.wallet && checkWalletAddress(state.wallet)))
            return false
        else return true
    }

    const start=async()=>{
        setId({...operationId, status: true})
        let params={
            transaction_id: operationId.id,
            cryptoCurency: state.crypto,
            amountCrypto: state.amount,
            amountFiat: state.xaf,
            phone: "+237",
            wallet: state.wallet,
            status: 'init',
            userId: User.userId,
            // type: 'credit_card',
        }
        let result=await sendToApi('cardinit', params, User.token)
        console.log(result)
        if(result.response) {
            setId({...operationId, status: false})
            openModal()
        } else setId({...operationId, status: false})
    }

    console.log("the rate ", rate)
    return (
        <div className="buycrypto">
            <h1>{t('buyCryptoCardTitle')}</h1>
            <div className="buy-container">
                <div className="rate">
                    {/* <Fiats action={changeFiat} fiat={state.fiat} /> */}
                    <h3>{t('buyCryptoMobileSous5')}</h3>
                    <div className=""> 1 BTC === {Intl.NumberFormat('de-DE').format(Math.round(rate[state.fiat] * 655))} XAF === {Intl.NumberFormat('de-DE').format(rate[state.fiat])} {state.fiat} </div>
                    <span>
                        {t('buyCryptoMobileSous6')} <a href="https://www.coindesk.com" target="_blank">{t('buyCryptoMobileSous4')}</a>
                    </span>
                </div>
                <div className="form">
                    <div className="form-group">
                        <Input val={state.xaf}  label={t('buyCryptoCardSous4')} name="xaf" type="number"
                            help={t('buyCryptoCardSous10')} change={amountChange} error={state.xaf<16500&&state.xaf!==0}
                        />
                    </div>
                    <div className="form-group">
                        <Input val={state.eu}  label={t('buyCryptoCardSous5')} name="eu" type="number"
                            help={t('buyCryptoCardSous11')} change={amountChange}
                        />
                    </div>
                    <div className="form-group">
                        <Input val={state.amount} label={t('buyCryptoCardSous6')} name="crypto" type="number"
                            help={t('buyCryptoCardSous12')} change={amountChange}
                        />
                    </div>
                    <div className="form-group">
                        <Input val={state.wallet} label={t('buyCryptoCardSous7')} name="wallet" 
                            help={t('buyCryptoCardSous13')} change={handleChange} handBlur={handleBlur}
                            error={errors.wallet || (state.wallet && !checkWalletAddress(state.wallet))}
                        />
                    </div>
                    
                    <div className="form-group">
                        <button disabled={active() || (state.crypto===0) || state.xaf===0 } 
                            onClick={start} 
                        > 
                            {(state.rate===0) ? t('buyCryptoCardSous8') : t('buyCryptoCardSous9') }  
                        </button>
                    </div>
                {/* 13tuVVNDH1PLfUEiTEPkMDRQfTRVHyiYn2 */}
                </div>
            </div>
            <Widget open={modal} close={openModal} amount={state.eu} crypto="BTC" wallet={state.wallet} opId={operationId.id} />

            <Modal open={operationId.status} showCloseIcon={false} center classNames={{modal: 'transparent-modal'}} closeOnOverlayClick={false}>
                <ReactLoading type="spin" color='#CC1616' height={150} width={150} />
            </Modal>
        </div>
    )
}

const mapStateToProps=state=>({Amount: state.cryptoAmountReducer.crypto, User: state.userReducer.user})

export default connect(mapStateToProps)(BuyCryptoCard)
