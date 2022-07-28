import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Modal } from 'react-responsive-modal'
import ReactLoading from 'react-loading'
import { TiWarningOutline } from 'react-icons/ti'
import { FaCheck, FaArrowLeft } from 'react-icons/fa'
import { connect } from 'react-redux'
import { isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { useTranslation } from 'react-i18next'
import Modal2 from '../sendmoney/Modal2'

import './buycrypto.css'
import Sumsub from '../sumsub/Sumsub'
import { Input, Input2 } from '../addons/input/Input'
import PhoneInput from '../addons/input/PhoneInput'
import Fiats from '../addons/Fiats/Fiats'
import { randomId, getCryptoRate, checkWalletAddress } from '../../utils/utilFunctions'
import { xafChange, euroChange, cryptoChange } from './handleMobile'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        

function BuyCryptoMobile({ Amount, country, User }) {
    //initialisation de variabl d'environnement
    let enable=process.env.REACT_APP_BUY_ENABLE
    const [mode, setMode] = useState(false)

    const { t } = useTranslation()
    // initialisation des taux de changes
    const [rate, setRate] = useState({ EUR: 0, USD: 0 })
    // initialisation du state du composants
    const [state, setState] = useState({
        crypto: "BTC", operator: "", amount: 0, xaf: 0, eu: 0, fiat: 'EUR',
        rate: rate.EUR, number: "", confirmNumber: "", wallet: ""
    })
    // initialisation du state des erreurs
    const [errors, setErrors] = useState({
        xaf: false, wallet: false, number: false, confirmNumber: false
    })
    const [modal, setModal] = useState(false)
    const [valid, setValid] = useState(false)
    // state of sumsub
    const [sum, setSum] = useState(false)
    const openModal = () => setModal(!modal)
    let history = useHistory()
    useEffect(async () => {
        getCryptoRate().then(newRate => {
            if (!newRate) return
            setRate({ ...rate, EUR: newRate.EUR.rate_float, USD: newRate.USD.rate_float })
            setState({ ...state, rate: newRate[state.fiat].rate_float, ...xafChange(Amount, newRate) })
        })
        let interval = setInterval(() => {
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
    const handleChange = e => {
        let newState = state
        newState[e.name] = e.value
        setState({ ...state })
    }
    // la fonction qui gere l'evenement onBlur des inputs
    const handleBlur = e => {
        if (e.value === "") {
            let newErrors = errors
            newErrors[e.name] = true
            setErrors({ ...errors })
        } else {
            let newErrors = errors
            newErrors[e.name] = false
            setErrors({ ...errors })
        }
    }
    // fonction qui gere les changements de montants
    const amountChange = e => {
        let result
        switch (e.name) { // amount c'est le montant en crypto monnaie 
            case "crypto":
                result = cryptoChange(e.value, rate[state.fiat])
                setState({ ...state, ...result })
                break
            case "xaf":
                result = xafChange(e.value, rate[state.fiat])
                setState({ ...state, ...result })
                break;

            case "eu":
                result = euroChange(e.value, rate[state.fiat])
                setState({ ...state, ...result })
                break;
            default:
                break;
        }
    }
    // fonction qui gere l'activation du bouton
    const active = () => {
        if (((state.amount && state.amount < 65597) && state.number && isValidPhoneNumber(state.number || 342))
            && (state.number === state.confirmNumber) && (state.wallet && checkWalletAddress(state.wallet)) && enable) 
            return false
        else return true
    }
    const validPhone = (value, func) => {
        if (value) {
            return !func(value)
        }
        return false
    }
    const checkConfirm = (value1, value2) => {
        if (value1) {
            return value1 !== value2
        }
        return false
    }
    // fonction qui verifie la correspondance des addresse
    const checkAddress = e => {
        if (e.value === state.wallet) {
            // sessionStorage.clear()
            sessionStorage.removeItem('data')
            sessionStorage.setItem('data', JSON.stringify({ ...state, id: randomId('BM'), rate: rate[state.fiat] }))
            setValid(true)
            // setTimeout(()=>history.push('/purchase'), 2000)
            !User.kyc ? setTimeout(() => {
                setModal(false)
                setSum(true)
                setValid(false)
            }, 2000) : setTimeout(() => history.push('/purchase'), 2000)
        }
    }
    const changeFiat = (f) => {
        let result = cryptoChange(state.amount, rate[f])
        setState({ ...state, ...result, fiat: f, rate: rate[f] })
    }
    const noCopy = (e) => {
        e.preventDefault()
        return false
    }
// function that check if environement variable is true or false to disable services
    const Eclip = () =>{
        if (enable == "FALSE") {
            setMode(!mode);
        }else{
            openModal();
        }
    }

    return (
        <div className="buycrypto">
            {enable ==="FALSE" ? <h3 className='disjoint'>Le service est indisponible</h3> : ""}
            <Modal2 mode={mode} close={()=>setMode(false)}  />

            <Modal open={modal} onClose={() => setModal(!modal)} showCloseIcon={false} center classNames={{ modal: 'custom-modal' }}>
                <div className="modal-confirm">
                    <div className="modal-head">
                        <TiWarningOutline size={70} color="#fbbd07" style={{ verticalAlign: 'middle' }} />
                        <h2>{t('buyCryptoMobileTitle')}</h2>
                    </div>
                    <div className="modal-body">
                        <div className="wallet-div" onCopy={(e) => noCopy(e)} >
                            <b>{t('buyCryptoMobileSous1')} </b><br /> <br />
                            {state.wallet}
                        </div> <br />
                        <div style={{ marginBottom: "5px" }} className="form-group">
                            <Input2 label={t('buyCryptoMobileSous21')} change={checkAddress} />
                        </div>
                        <div className="load">
                            {valid ? (<FaCheck size={50} color="#CC1616" />) : (<ReactLoading type="spinningBubbles" color='#CC1616' height={70} width={70} />)}
                        </div>
                        <span onClick={() => setModal(!modal)}> <FaArrowLeft />{t('buyCryptoMobileSous2')}</span>
                    </div>
                </div>
            </Modal>
            {sum && <Modal open={true} onClose={() => setSum(false)} center={true} closeOnOverlayClick={false} >
                <Sumsub call={() => setTimeout(() => history.push('/purchase'), 2000)} close={() => setSum(false)} />
            </Modal>}
            <h1>{t('buyCryptoMobileSous3')}</h1>
            <div className="buy-container">
                <div className="rate">
                    <Fiats action={changeFiat} fiat={state.fiat} />
                    <h3>{t('buyCryptoMobileSous5')}</h3>
                    <div className=""> 1 BTC === {Intl.NumberFormat('de-DE').format(Math.round(rate[state.fiat] * 655))} XAF === {Intl.NumberFormat('de-DE').format(rate[state.fiat])} {state.fiat} </div>
                    <span>
                        {t('buyCryptoMobileSous6')} <a href="https://www.coindesk.com" target="_blank">{t('buyCryptoMobileSous4')}</a>
                    </span>
                </div>
                <div className="form">
                    <div className="form-group">
                        <Input val={state.xaf} label={t('buyCryptoMobileSous7')} name="xaf" type="number" help={t('buyCryptoMobileSous8')}
                            change={amountChange} error={(state.xaf < 5000 || state.xaf > 65595) && state.xaf !== 0}
                        />
                    </div>
                    <div className="form-group">
                        <Input val={state.eu} label={t('buyCryptoMobileSous9') + ' ' + state.fiat} name="eu" type="number"
                            help={t('buyCryptoMobileSous10')} change={amountChange}
                        />
                    </div>
                    <div className="form-group">
                        <Input val={state.amount} label={t('buyCryptoMobileSous11')} name="crypto" type="number"
                            help={t('buyCryptoMobileSous12')} change={amountChange}
                        />
                    </div>
                    <div className="form-group">
                        <Input val={state.xaf * 0.065} label={t('sellCrypto12')} />
                    </div>
                    <div className="form-group">
                        <PhoneInput label={t('buyCryptoMobileSous13')} name="number" help={t('buyCryptoMobileSous14')}
                            change={handleChange} error={validPhone(state.number, isValidPhoneNumber)}
                        />
                    </div>
                    <div className="form-group">
                        <PhoneInput label={t('buyCryptoMobileSous15')} name="confirmNumber" help={t('buyCryptoMobileSous16')}
                            change={handleChange} error={checkConfirm(state.confirmNumber, state.number)}
                        />
                    </div>
                    <div className="form-group">
                        <Input val={state.wallet} label={t('buyCryptoMobileSous17')} name="wallet" help={t('buyCryptoMobileSous18')}
                            error={errors.wallet || (state.wallet && !checkWalletAddress(state.wallet))}
                            change={handleChange} handBlur={handleBlur}
                        />
                    </div>
                    <div className="form-group">
                        <button disabled={active() || (state.crypto === 0) || state.xaf === 0}
                            onClick={Eclip}
                        >
                            {(state.rate === 0) ? t('buyCryptoMobileSous19') : t('buyCryptoMobileSous20')}
                        </button>
                    </div>
                    {/* 13tuVVNDH1PLfUEiTEPkMDRQfTRVHyiYn2 */}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    Amount: state.cryptoAmountReducer.crypto,
    country: state.countryReducer.country,
    User: state.userReducer.user
})


export default connect(mapStateToProps)(BuyCryptoMobile)


