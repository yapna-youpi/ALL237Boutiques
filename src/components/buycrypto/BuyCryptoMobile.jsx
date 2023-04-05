import React, { useState, useEffect,useLayoutEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Modal } from 'react-responsive-modal';
import ReactLoading from 'react-loading';
import { TiWarningOutline } from 'react-icons/ti';
import { FaCheck, FaArrowLeft } from 'react-icons/fa';
import { connect } from 'react-redux';
import { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useTranslation } from 'react-i18next';
import Modal2 from '../sendmoney/Modal2';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Helmet } from "react-helmet";

import './buycrypto.css'
import Sumsub from '../sumsub/Sumsub'
import PromoCode from '../promocode/PromoCode'
import { Input, Input2 } from '../addons/input/Input'
import InputPhone from '../addons/input/PhoneInput'
import Fiats from '../addons/Fiats/Fiats'
import { randomId, getCryptoRate, roundPrecision,roundDecimal} from '../../utils/utilFunctions'
import { xafChange, euroChange, cryptoChange } from './handleMobile'

    var WAValidator = require('multicoin-address-validator');
    const max = {
        BTC: parseInt(process.env.REACT_APP_BUY_BTC_MAX),
        ETH: parseInt(process.env.REACT_APP_BUY_ETH_MAX),
        USDT: parseInt(process.env.REACT_APP_BUY_USDT_MAX)
    }
    const min = {
        BTC: parseInt(process.env.REACT_APP_BUY_BTC_MIN),
        ETH: parseInt(process.env.REACT_APP_BUY_ETH_MIN),
        USDT: parseInt(process.env.REACT_APP_BUY_USDT_MIN)
    }
    const enable = process.env.REACT_APP_BUY_ENABLE

    let interval
function BuyCryptoMobile({ Amount, country, User }) {

    const FEES = roundDecimal(roundDecimal(process.env.REACT_APP_BUY_FEES, 3) + roundDecimal(process.env.REACT_APP_INTOUCH_CO_FEES, 3))  //  frais de l'operation

    const { t } = useTranslation()

    const validationSchema = yup.object({
        wallet: yup.string().required(`${t('formikBuy2')}`),    //.matches(regWallet, `${t('formikBuy2')}`),
        xaf: yup.string().required(`${t('formikBuy3')}`),
        eu: yup.string().required(`${t('formikBuy4')}`),
        amount: yup.string().required(`${t('formikBuy5')}`),
        phone: yup.string().required(`${t('formikBuy6')}`),
        cfphone: yup.string().required(`${t('formikBuy7')}`)
    })

    //initialisation de variabl d'environnement
    const [mode, setMode] = useState(false)
    //initialisation de la valeur reele de usdt en francs
    const [forex, setForex] = useState([])

    //for active promocode
    const [code, setCode] = useState(false)
    const [modal, setModal] = useState(false)
    const [valid, setValid] = useState(false)
    // state of sumsub
    const [sum, setSum] = useState(false)
    // promo state
    const [promo, setPromo] = useState({ promotion: false, code: '', show: false })

    //initialisation of formik validation
    const formik = useFormik({
        initialValues: {
            wallet: "", xaf: 0, eu: 0,
            amount: 0, phone: "", cfphone: "",
            rate: { EUR: 0, USD: 0 }, fiat: 'EUR', crypto: "BTC",
            rateApi: {  "USD": 0,"XAF": 0,"XOF": 0,
                        "BTC": {"USD": 0,"EUR": 0,"XAF": 0},
                        "ETH": {"USD": 0,"EUR": 0,"XAF": 0},
                        "USDT": {"USD": 0,"EUR": 0,"XAF": 0}
                    }
        },
        validationSchema,
        onSubmit: async () => {
            Eclip()
        }
    })
    let history = useHistory()
    useEffect(() => {
        setTimeout(()=>{document.getElementById('BTC').classList.toggle('cryptoActif')},1)

        // getCryptoRate().then(newRate => {
        //     if (!newRate) return
        //     // setRate({ ...rate, EUR: newRate.EUR.rate_float, USD: newRate.USD.rate_float })
        //     formik.setValues({...formik.values, rate: { EUR: newRate.EUR.rate_float, USD: newRate.USD.rate_float }}, true)
        // })
        fetch(process.env.REACT_APP_API_URL+"currencies")   //https://api-beta-05.herokuapp.com/api/currencies
                .then(resp => resp.json())
                .then(data => {
                    setForex(data)
                    formik.setValues( {...formik.values, rateApi: data } , true) 
                })
                .catch(err => 0)

        interval = setInterval(() => {

            fetch(process.env.REACT_APP_API_URL+"currencies")   //https://api-beta-05.herokuapp.com/api/currencies
                .then(resp => resp.json())
                .then(data => {
                    setForex(data)
                    formik.setFieldValue( { rateApi: data } , true) 
                    
                })
                .catch(err => 0)

        }, 60 * 1000)


        return () => {
            clearInterval(interval)
        }

    }, [])
    // console.log('les valeurs de formik', formik)
    const openModal = () => setModal(!modal)
    // function that manage the change of amount on each field
    const amountChange = e => {
        let unit = formik.values.fiat == 'EUR' ?  forex.XAF : forex.XAF/forex.USD 
        let result
        switch (e.target.name) { // amount c'est le montant en crypto monnaie 
            case "amount":
                result = cryptoChange(e.target.value, formik.values.rateApi[formik.values.crypto][formik.values.fiat], promo.promotion, User.percent, unit, formik.values.crypto)
                formik.setValues({ ...formik.values, ...result }, true)
                break
            case "xaf":
                result = xafChange(e.target.value, formik.values.rateApi[formik.values.crypto][formik.values.fiat], promo.promotion, User.percent, unit, formik.values.crypto)
                formik.setValues({ ...formik.values, ...result }, true)
                break;
            case "eu":
                result = euroChange(e.target.value, formik.values.rateApi[formik.values.crypto][formik.values.fiat], promo.promotion, User.percent, unit, formik.values.crypto)
                // console.log("the result of euroChange ", result)
                formik.setValues({ ...formik.values, ...result }, true)
                break;
            default:
                break
        }
    }
    // console.log("les nouvelles valeurs de amount dans formik",formik.values)
    // function that manages the activation of the button
    const active = () => {
        if (!(min[formik.values.crypto] > parseFloat(formik.values.xaf) || parseFloat(formik.values.xaf) > max[formik.values.crypto])
            && WAValidator.validate(`${formik.values.wallet}`, `${formik.values.crypto }`, 'both') && isValidPhoneNumber(formik.values.phone || '') && formik.values.cfphone === formik.values.phone) {
            return false
        } else return true

    }


    const setPhone = (name, val) => {
        formik.setFieldValue(name, val)
    }
    (() => {
        const montant = parseFloat(formik.values.xaf)

        if (formik.values.phone && !formik.errors.phone) {
            !isValidPhoneNumber(formik.values.phone) && formik.setFieldError('phone', `${t('formikBuy8')}`)
        }
        if (formik.values.cfphone && !formik.errors.cfphone) {
            formik.values.cfphone !== formik.values.phone && formik.setFieldError('cfphone', `${t('formikBuy9')}`)
        }
        if (formik.values.wallet && !formik.errors.wallet) {
            !(WAValidator.validate(`${formik.values.wallet}`, `${formik.values.crypto }`) || WAValidator.validate(`${formik.values.wallet}`, `${formik.values.crypto }`, 'testnet'))
             && formik.setFieldError('wallet', `${t('formikBuy10') + formik.values.crypto + t('formikBuy12')}`)
            // !formik.values.wallet.match(regWallet) && formik.setFieldError('wallet', `${t('formikBuy10')}`)
        }
        if (formik.values.xaf && !formik.errors.xaf) {
            (min[formik.values.crypto] > montant || montant > max[formik.values.crypto]) && formik.setFieldError('xaf', `${ t('formikBuy11') + min[formik.values.crypto] + " et " + max[formik.values.crypto] + " XAF." }`)
        }

    })()
    const setTouched = (field) => {
        if (!formik.touched[field])
            formik.setFieldTouched(field, true)
    }

    // fonction qui verifie la correspondance des addresses
    const checkAddress = e => {
        if (e.value === formik.values.wallet) {
            // sessionStorage.clear()
            sessionStorage.removeItem('data')
            // sessionStorage.setItem('data',JSON.stringify(formik.setValues(({ ...formik, id: randomId('BM'), rate: rate[formik.values.fiat] }))))
            sessionStorage.setItem('data', JSON.stringify({ ...formik.values, id: randomId('BM'), rate: formik.values.rateApi[formik.values.crypto][formik.values.fiat], ...promo }))
            setValid(true)
            // console.log("the values stored ", JSON.parse(sessionStorage.getItem('data')))
            setTimeout(() => history.push('/purchase'), 2000)
            clearInterval(interval)

            // !User.kyc ? setTimeout(() => {
            //     setModal(false)
            //     // setSum(true) // annulation de la verification kyc sur buycrypto
            //     setValid(false)
            // }, 2000) : setTimeout(() => history.push('/purchase'), 2000)
        }
    }
    const changeFiat = (f) => {
        // console.log("the new fiat and forex ", f, forex)
        let unit = formik.values.fiat == 'EUR' ? forex.XAF/forex.USD : forex.XAF 
        let result = xafChange(formik.values.xaf, formik.values.rateApi[formik.values.crypto][f], promo.promotion, User.percent, unit, formik.values.crypto)
        // console.log("the result at changeFiat ", result)
        formik.setFieldValue('eu', result.eu)
        formik.setFieldValue('fiat', f)
        formik.setFieldValue('rate', formik.values.rateApi[formik.values.crypto][f])
    }
    const noCopy = (e) => {
        e.preventDefault()
        return false
    }
    // function that check if environement variable is true or false to disable services
    const Eclip = () => {
        if (enable == "FALSE") {
            setMode(!mode);
        } else {
            openModal();
        }
    }
    const activePromotion = (code) => {
        setPromo({ promotion: !promo.promotion, code: code })
    }
    const showFee = () => {
        if (promo.promotion) return 0
        else return formik.values.xaf * (FEES + User.percent / 100)
    }
    // promo.promotion ? 0 : formik.values.xaf * (0.065 + User.percent / 100)
    (() => {
        if (!active() && !promo.code && !promo.show) setPromo({ ...promo, show: true })
    })()

     // function to choose with crypto to make transaction
     const handleCrypto = e => {

        let crp = formik.values.crypto
        if(crp !== e.target.name){
            switch (crp) {
                case "BTC":
                    formik.setValues({ ...formik.values, crypto: e.target.id, wallet: "", xaf: 0, eu: 0,amount: 0,
                                        rate: {EUR: formik.values.rateApi[formik.values.crypto].EUR, USD:formik.values.rateApi[formik.values.crypto].USD} }, true)
                    e.target.classList.toggle('cryptoActif');
                    document.querySelector('#BTC').classList.toggle('cryptoActif')
                    break;
    
                case "USDT":
                      formik.setValues({ ...formik.values, crypto: e.target.id, wallet: "", xaf: 0, eu: 0,amount: 0,
                                        rate: {EUR: formik.values.rateApi[formik.values.crypto].EUR, USD:formik.values.rateApi[formik.values.crypto].USD} }, true)
                    e.target.classList.toggle('cryptoActif');
                    document.querySelector('#USDT').classList.toggle('cryptoActif')
                    break;
    
                case "ETH":
                      formik.setValues({ ...formik.values, crypto: e.target.id, wallet: "", xaf: 0, eu: 0,amount: 0,
                                        rate: {EUR: formik.values.rateApi[formik.values.crypto].EUR, USD:formik.values.rateApi[formik.values.crypto].USD} }, true)
                    e.target.classList.toggle('cryptoActif');
                    document.querySelector('#ETH').classList.toggle('cryptoActif')
                    break;
    
                default:
                    break;
            }
        }    
        
    }
    
    // console.log(formik.values)
    return (
        <div className="buycrypto">
            <Helmet>
                <title>Achat de crypto-actifs en francs FCFA</title>
            </Helmet>
            {enable === "FALSE" ? <h3 className='disjoint'>{t("sellCrypto18")} </h3> : ""}
            <Modal2 mode={mode} close={() => setMode(false)} />
            {/* {promo.show && <PromoCode openPromo={code} closePromo={() => setPromo({...promo, show: false})} activePromotion={activePromotion} />} */}
            {promo.show && <PromoCode openPromo={code} closePromo={() => setPromo({ ...promo, show: false, code: "NO_CODE" })} activePromotion={activePromotion} />}
            <Modal open={modal} onClose={() => setModal(!modal)} showCloseIcon={false} center classNames={{ modal: 'custom-modal' }}>
                <div className="modal-confirm">
                    <div className="modal-head">
                        <TiWarningOutline size={70} color="#fbbd07" style={{ verticalAlign: 'middle' }} />
                        <h2 className='buy-title'>{t('buyCryptoMobileTitle')}</h2>
                    </div>
                    <div className="modal-body">
                        <b>{t('buyCryptoMobileSous1')} </b><br /> <br />
                        <div className="wallet-div" onCopy={(e) => noCopy(e)} >
                            {formik.values.wallet}
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
            {
                sum && <Modal open={true} onClose={() => setSum(false)} center={true} closeOnOverlayClick={false} >
                    <Sumsub call={() => setTimeout(() => history.push('/purchase'), 2000)} close={() => setSum(false)} />
                </Modal>
            }
            <h1>{t('buyCryptoMobileSous3')}</h1>
            <h2 className='crypt-title'>{t('buyCryptoMobileSous22')}</h2>
            <div className="buy-container">
                <div className="rate">
                    <Fiats action={changeFiat} fiat={formik.values.fiat} />
                    <h3>{t('buyCryptoMobileSous5')}</h3>
                    <div className=""> 1 {formik.values.crypto} === {Intl.NumberFormat('de-DE').format(Math.round(formik.values.rateApi[formik.values.crypto].XAF))} XAF === {Intl.NumberFormat('de-DE').format(formik.values.rateApi[formik.values.crypto][formik.values.fiat])} {formik.values.fiat} </div>
                    <span>
                        {t('buyCryptoMobileSous6')} <a href="https://www.coindesk.com" target="_blank">{t('buyCryptoMobileSous4')}</a>
                    </span>

                    <div className="choisix">
                        <div className="choix1">
                            <input onClick={handleCrypto} className='btc' id='BTC' name='bitcoin' type="button" value="Bitcoin" /> 
                        </div>
                        <div className="choix1">
                            <input onClick={handleCrypto} className='usd'  id='USDT' name='usdt' type="button" value="Usdt" /> 
                        </div>
                        <div className="choix1">
                            <input onClick={handleCrypto} className='eth'  id='ETH' name='ethereum' type="button" value="Ethereum" /> 
                        </div>
                    </div>
                </div>

                <div className="form">
                    <div className="form-group">
                        <Input val={formik.values.xaf} type="text" label={t('buyCryptoMobileSous7')} name="xaf" id="signup-xaf"
                            help={formik.touched.xaf && formik.errors.xaf} error={formik.errors.xaf && Boolean(formik.touched.xaf)}
                            change={amountChange} handBlur={() => setTouched('xaf')}
                        />
                    </div>
                    <div className="form-group">
                        <Input type="text" label={t('buyCryptoMobileSous9') + ' ' + formik.values.fiat} name="eu" id="eu"
                            // val={formik.values.fiat === "EUR" ? formik.values.eu : formik.values.eu * forex.USD}
                            val={formik.values.eu}
                            help={formik.errors.eu} error={formik.errors.eu && formik.touched.eu}
                            change={amountChange} handBlur={() => setTouched('eu')}
                        />
                    </div>
                    <div className="form-group">
                        <Input val={ formik.values.crypto === 'USDT' ? Math.trunc(formik.values.amount) : (formik.values.amount)} type="text" label={t('buyCryptoMobileSous11') + formik.values.crypto}
                            name="amount" id="amount"
                            help={formik.errors.amount} error={formik.errors.amount && formik.touched.amount}
                            change={amountChange} handBlur={() => setTouched('amount')}
                        />
                    </div>
                    <div className="form-group">
                        <Input val={showFee()} label={t('sellCrypto12')} />
                    </div>
                    <div className="form-group">
                        <InputPhone val={formik.values.phone} name="phone" label={t('buyCryptoMobileSous13')} id="phone"
                            country={false} all={false} cm={true} alert={country !== 'CM'}
                            help={formik.errors.phone} error={formik.errors.phone && formik.touched.phone}
                            change={(name, value) => setPhone(name, value)}
                            handBlur={() => setTouched('phone')}
                        />
                    </div>
                    <div className="form-group">
                        <InputPhone val={formik.values.cfphone} name="cfphone" label={t('buyCryptoMobileSous15')} id="cfphone"
                            country={false} all={false} cm={true} alert={country !== 'CM'}
                            help={formik.errors.cfphone} error={formik.errors.cfphone && formik.touched.cfphone}
                            change={(name, value) => setPhone(name, value)}
                            handBlur={() => setTouched('cfphone')}
                        />
                    </div>
                    <div className="form-group">
                        <Input val={formik.values.wallet} type="text" label={t('buyCryptoMobileSous17')} name="wallet" id="signup-wallet"
                            help={formik.errors.wallet} error={formik.errors.wallet && Boolean(formik.touched.wallet)}
                            change={formik.handleChange} handBlur={() => setTouched('wallet')}
                        />
                    </div>
                    <div className="form-group">
                        <button
                            type="submit"
                            disabled={active()}
                            onClick={formik.handleSubmit}
                        >
                            {(formik.values.rate === 0) ? t('buyCryptoMobileSous19') : t('buyCryptoMobileSous20')}
                        </button>
                    </div>
                </div >
            </div >
        </div >
    )
}

const mapStateToProps = state => ({
    Amount: state.cryptoAmountReducer.crypto,
    country: state.countryReducer.country,
    User: state.userReducer.user
})


export default connect(mapStateToProps)(BuyCryptoMobile)



