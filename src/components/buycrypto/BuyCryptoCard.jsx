import React, { useState, useEffect } from 'react'
import {useHistory} from 'react-router-dom'
import { connect } from 'react-redux'
import { Modal } from 'react-responsive-modal'
import ReactLoading from 'react-loading'
import { useTranslation } from 'react-i18next'

import Widget from './Widget';
import {Input} from '../addons/input/Input'
import {randomId, getCryptoRate, sendToApi} from '../../utils/utilFunctions'
import { xafChange, euroChange, cryptoChange } from './handleCard';

function BuyCryptoCard({Amount, User}) {
    const { t } = useTranslation()
    const [operationId, setId]=useState({id: randomId('BC'), status: false})
    // initialisation des taux de changes
    const [rate, setRate] = useState({BCH: 575.69, BTC: 0, ETH: 2075.48})
    //initialisation de la valeur reele de usdt en francs
    const [forex, setForex] = useState({ USD: 0, XAF: 0, XOF: 0 })

    useEffect(() => {
        let result = fetch("https://api-beta-05.herokuapp.com/api/currencies")
            .then(resp => resp.json())
            .then( data => setForex(data))
            .catch(err => 0)
        }, [])
        console.log(forex, 'le forex sur mesure')

    // initialisation du state du composants
    const [state, setState] = useState({
        crypto: "BTC", operator: "", amount: 0, xaf: 0, eu: 0, rate: rate.BTC, wallet: ""
    })
    // initialisation du state des erreurs
    const [errors, setErrors]= useState({
        xaf: false, wallet: false, number: false, confirmNumber: false
    })
    const [modal, setModal] = useState(false)
    const openModal=()=>setModal(!modal)
    let history=useHistory()
    useEffect(async() => {
        getCryptoRate().then(newRate=>{
            if(rate) {
                //setState
                setRate({...rate, BTC: newRate})
                setState({...state, rate: newRate, ...xafChange(Amount, newRate,forex)})

            }
        })
        setInterval(() => {
            let interval=getCryptoRate().then(newRate=>{
                if(rate) setRate({...rate, BTC: newRate})
            })
            return () => {
                clearInterval(interval)
            }
        }, 60*1000);
    }, [])

    // la fonction qui gere les changement des inputs
    const handleChange=e=>{
        let newState=state
        newState[e.name]=e.value
        setState({...state})
    }
    // la fonction qui gere l'evenement onBlur des inputs
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
    // fonction qui gere les changements de montants
    const amountChange=e=>{
        let result
        switch (e.name) { // amount c'est le montant en crypto monnaie 
            case "crypto":
                result=cryptoChange(e.value, rate.BTC,forex.XAF)
                setState({...state, ...result})
            break
            case "xaf":
                result=xafChange(e.value, rate.BTC,forex.XAF)
                setState({...state, ...result})
            break;
            
            case "eu":
                result=euroChange(e.value, rate.BTC,forex.XAF)
                setState({...state, ...result})
            break;
            default:
            break;
        }
    }
    // fonction qui gere l'activation du bouton
    const active=()=>{
        if( (state.amount && state.wallet) )
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
        if(result.response) {
            setId({...operationId, status: false})
            openModal()
        } else setId({...operationId, status: false})
    }

    return (
        <div className="buycrypto">
            <h1>{t('buyCryptoCardTitle')}</h1>
            <div className="buy-container">
                <div className="rate">
                    <h3>{t('buyCryptoCardSous1')}</h3>
                    <div className=""> 1 BTC === {Math.round(rate.BTC*forex.XAF)} XAF === {rate.BTC} EU </div>
                    <span>{t('buyCryptoCardSous3')}  <a href="https://www.coindesk.com/coindesk-api" target="_blank">{t('buyCryptoCardSous2')}  </a> </span> 
                </div>
                <div className="form">
                    <div className="form-group">
                        <Input val={state.xaf}  label={t('buyCryptoCardSous4')} name="xaf" type="number" help={t('buyCryptoCardSous10')} change={amountChange} error={state.xaf<10000&&state.xaf!==0}   />
                    </div>
                    <div className="form-group">
                        <Input val={state.eu}  label={t('buyCryptoCardSous5')} name="eu" type="number" help={t('buyCryptoCardSous11')} change={amountChange} />
                    </div>
                    <div className="form-group">
                        <Input val={state.amount} label={t('buyCryptoCardSous6')} name="crypto" type="number" help={t('buyCryptoCardSous12')} change={amountChange}  />
                    </div>
                    <div className="form-group">
                        <Input val={state.wallet} label={t('buyCryptoCardSous7')} name="wallet" help={t('buyCryptoCardSous13')} error={errors.wallet} change={handleChange} handBlur={handleBlur}  />
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
