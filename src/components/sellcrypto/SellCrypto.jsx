import React, { useState, useEffect, createRef } from 'react'
import 'react-phone-number-input/style.css'
import { isValidPhoneNumber } from 'react-phone-number-input'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Modal } from 'react-responsive-modal'
import Modal2 from '../sendmoney/Modal2'
import { Helmet } from "react-helmet";

import { useFormik } from 'formik';
import * as yup from 'yup';

import './sellcrypto.css'
import SellModal from './SellModal';
import { Input } from '../addons/input/Input';
import PromoCode from '../promocode/PromoCode'
import InputPhone from '../addons/input/PhoneInput'
import Fiats from '../addons/Fiats/Fiats'
import { xafChange, euroChange, cryptoChange } from './handleAmount'
import Sumsub from '../sumsub/Sumsub'


var WAValidator = require('multicoin-address-validator');
const max = parseInt(process.env.REACT_APP_SELL_MAX);
const min = parseInt(process.env.REACT_APP_SELL_MIN);
const enable = process.env.REACT_APP_SELL_ENABLE;
const FEES = process.env.REACT_APP_SELL_FEES + parseInt(process.env.REACT_APP_INTOUCH_CI_FEES);
const fees = process.env.REACT_APP_SELL_FEES;
const intouchFees = process.env.REACT_APP_INTOUCH_CI_FEES;

let interval = null
function SellCrypto({ Amount, country, User }) {
    const { t } = useTranslation()

    const validationSchema = yup.object({
        wallet: yup.string().required(`${t('formikSell1')}`),    //.matches(regWallet, `${t('formikSell2')}`),
        xaf: yup.number().required(`${t('formikSell3')}`),
        eu: yup.number().required(`${t('formikSell4')}`),
        amount: yup.number().required(`${t('formikSell5')}`),
        phone: yup.string().required(`${t('formikSell6')}`),
        cfphone: yup.string().required(`${t('formikSell7')}`)
    })

    //initialisation de variabl d'environnement

    const [mode, setMode] = useState(false)

    //initialisation de la valeur reele de usdt en francs
    const [forex, setForex] = useState([])

    //for active promocode
    const [modal, setModal] = useState(false)
    const [sum, setSum] = useState(false)
    const [reduction, setReduction] = React.useState('')
    // promo state
    const [promo, setPromo] = useState({ promotion: false, code: '', show: false })
    const myRef = createRef(null)

    //initialisation of formik validation
    const formik = useFormik({
        initialValues: {
            wallet: "", xaf: 0, eu: 0,
            amount: 0, phone: "", cfphone: "",
            rate: { EUR: 0, USD: 0 }, fiat: 'EUR', crypto: "BTC",
            operator: "",
            rateApi: {
                "USD": 0, "XAF": 0, "XOF": 0,
                "BTC": { "USD": 0, "EUR": 0, "XAF": 0 },
                "ETH": { "USD": 0, "EUR": 0, "XAF": 0 },
                "USDT": { "USD": 0, "EUR": 0, "XAF": 0 }
            }
        },
        validationSchema,
        onSubmit: async () => {
            Eclip()
        }
    })
    useEffect(async () => {
        setTimeout(() => { document.getElementById('BTC').classList.toggle('cryptoActif') }, 1)

        fetch(process.env.REACT_APP_API_URL + "currencies")
            .then(resp => resp.json())
            .then(data => {
                setForex(data)
                formik.setValues({ ...formik.values, rateApi: data }, true)
            })
            .catch(err => 0)

        interval = setInterval(() => {

            fetch(process.env.REACT_APP_API_URL + "currencies")
                .then(resp => resp.json())
                .then(data => {
                    setForex(data)
                    formik.setFieldValue({ rateApi: data }, true)
                })
                .catch(err => 0)

        }, 60 * 1000)

        return () => {
            clearInterval(interval)
        }

    }, [])

    const openModal = () => {
        setModal(!modal)
    }
    // function that manage the change of amount on each field
    const amountChange = e => {
        let result
        let unit = formik.values.fiat == 'EUR' ? forex.XAF : forex.XAF / forex.USD
        switch (e.target.name) { // amount c'est le montant en crypto monnaie 
            case "amount":
                result = cryptoChange(e.target.value, formik.values.rateApi[formik.values.crypto][formik.values.fiat], promo.promotion, User.percent, unit, formik.values.crypto,reduction)
                formik.setValues({ ...formik.values, ...result }, true)
                break
            case "xaf":
                result = xafChange(e.target.value, formik.values.rateApi[formik.values.crypto].XAF, promo.promotion, User.percent, unit, formik.values.crypto,reduction)
                formik.setValues({ ...formik.values, ...result }, true)
                break;
            case "eu":
                result = euroChange(e.target.value, formik.values.rateApi[formik.values.crypto][formik.values.fiat], promo.promotion, User.percent, unit, formik.values.crypto,reduction)
                formik.setValues({ ...formik.values, ...result }, true)
                break;
            default:
                break
        }
    }
    // function that manages the activation of the button
    const active = () => {
        if (!(min > parseFloat(formik.values.xaf) || parseFloat(formik.values.xaf) > max)
            && WAValidator.validate(`${formik.values.wallet}`, `${formik.values.crypto}`, 'both') && isValidPhoneNumber(formik.values.phone || '') && formik.values.cfphone === formik.values.phone) {
            return false
        } else return true

    }

    const changeFiat = (f) => {

        let unit = formik.values.fiat == 'EUR' ? forex.XAF / forex.USD : forex.XAF
        let result = xafChange(formik.values.xaf, formik.values.rateApi[formik.values.crypto][f], promo.promotion, User.percent, unit, formik.values.crypto,reduction)
        formik.setFieldValue('eu', result.eu)
        formik.setFieldValue('fiat', f)
        formik.setFieldValue('rate', formik.values.rateApi[formik.values.crypto][f])
    }
    const Eclip = () => {
        if (enable == "FALSE") {
            setMode(!mode)
        } else {
            openModal()
        }
    }

    const setPhone = (name, val) => {
        formik.setFieldValue(name, val || '')
    }
    (() => {
        const montant = parseFloat(formik.values.xaf)

        if (formik.values.phone && !formik.errors.phone) {
            !isValidPhoneNumber(formik.values.phone) && formik.setFieldError('phone', `${t('formikSell8')}`)
            setMode(true)
        }
        if (formik.values.cfphone && !formik.errors.cfphone) {
            formik.values.cfphone !== formik.values.phone && formik.setFieldError('cfphone', `${t('formikSell9')}`)
        }
        if (formik.values.wallet && !formik.errors.wallet) {
            !(WAValidator.validate(`${formik.values.wallet}`, `${formik.values.crypto}`) || WAValidator.validate(`${formik.values.wallet}`, `${formik.values.crypto}`, 'testnet'))
                && formik.setFieldError('wallet', `${t('formikSell10') + formik.values.crypto + t('formikSell12')}`)
        }
        if (formik.values.xaf && !formik.errors.xaf) {
            (min > montant || montant > max) && formik.setFieldError('xaf', `${t('formikSell11')}`)
        }

    })()
    const setTouched = (field) => {
        if (!formik.touched[field])
            formik.setFieldTouched(field, true)
    }
    const activePromotion = (code, response) => {
        setPromo({ promotion: true, code: code, show: true })
        setReduction(response.reduction)
        let unit = formik.values.fiat == 'EUR' ? forex.XAF/forex.USD : forex.XAF 
        setTimeout(() => {
            let result = xafChange(formik.values.xaf, formik.values.rateApi[formik.values.crypto].XAF, promo.show, User.percent, unit, formik.values.crypto,response.reduction)
            formik.setFieldValue('amount', result.amount)
        }, 100);
    }
    const showFee = () => {
        let nowFees = formik.values.xaf ? Math.round(formik.values.xaf * (fees + User.percent / 100)) + parseInt(intouchFees) : 0 // normal fees without codepromo 
        if (promo.promotion) {
            return nowFees - (formik.values.xaf * reduction/100 )
        }else return  nowFees 

        // if (promo.promotion) return 0
        // else return formik.values.xaf ? Math.round(formik.values.xaf * (fees + User.percent / 100)) + parseInt(intouchFees) : 0
    }
    // (() => {
    //     if (!active() && !promo.code && !promo.show) {
    //         setPromo({ ...promo, show: true })
    //     }
    // })()

    // function to choose with crypto to make transaction
    const handleCrypto = e => {
        // set
        let crp = formik.values.crypto
        if (crp != e.target.name) {
            switch (crp) {
                case "BTC":
                    formik.setValues({
                        ...formik.values, crypto: e.target.id, wallet: "", xaf: 0, eu: 0, amount: 0,
                        rate: { EUR: formik.values.rateApi[formik.values.crypto].EUR, USD: formik.values.rateApi[formik.values.crypto].USD }
                    }, true)
                    e.target.classList.toggle('cryptoActif');
                    document.querySelector('.btc').classList.toggle('cryptoActif')
                    break;

                case "USDT":
                    formik.setValues({
                        ...formik.values, crypto: e.target.id, wallet: "", xaf: 0, eu: 0, amount: 0,
                        rate: { EUR: formik.values.rateApi[formik.values.crypto].EUR, USD: formik.values.rateApi[formik.values.crypto].USD }
                    }, true)
                    e.target.classList.toggle('cryptoActif');
                    document.querySelector('.usdt').classList.toggle('cryptoActif')
                    break;

                case "ETH":
                    formik.setValues({
                        ...formik.values, crypto: e.target.id, wallet: "", xaf: 0, eu: 0, amount: 0,
                        rate: { EUR: formik.values.rateApi[formik.values.crypto].EUR, USD: formik.values.rateApi[formik.values.crypto].USD }
                    }, true)
                    e.target.classList.toggle('cryptoActif');
                    document.querySelector('.eth').classList.toggle('cryptoActif')
                    break;

                default:
                    break;
            }
        }

    }

    return (
        <div id="sellcrypto" className="sellcrypto" ref={myRef}>
            <Helmet>
                <title>Echanger sa crypto en Orange Money, MTN Mobile Money, Moov, Mobicash et Free</title>
            </Helmet>
            {enable === "FALSE" ? <h3 className='disjoint'>{t("sellCrypto18")} </h3> : ""}

            <Modal2 mode={mode} close={() => setMode(false)} />
            {promo.show && <PromoCode  activePromotion={activePromotion} closePromo={() => setPromo({ ...promo, show: false, code: "NO_CODE" })} />}
            {sum && <Modal open={true} onClose={() => setSum(false)} center={true} container={myRef.current} >
                <Sumsub call={openModal} close={() => setSum(false)} />
            </Modal>}
            {modal && <SellModal open={modal} toogle={setModal} data={{ ...formik.values, ...promo }} rate={formik.values.rateApi[formik.values.crypto]['XAF']} User={User} promotion={promo.promotion} />}

            <h1>{t('sellCrypto')}</h1>
            <h2 className='crypt-sell'>{t('sellCrypto19')}</h2>
            <div className="sell-container">
                <form>
                    <div className="rate">
                        <Fiats action={changeFiat} fiat={formik.values.fiat} />
                        <h3>{t('sellCrypto2')}</h3>
                        <div className=""> 1 {formik.values.crypto} === {Intl.NumberFormat('de-DE').format(Math.round(formik.values.rateApi[formik.values.crypto].XAF))} XAF === {Intl.NumberFormat('de-DE').format(formik.values.rateApi[formik.values.crypto][formik.values.fiat])} {formik.values.fiat} </div>
                        <span>{t('sellCrypto4')}<a href="https://www.coindesk.com" target="_blank"> {t('sellCrypto3')}  </a> </span>

                        <div className="choisix">
                            <div className="choix1">
                                {/* <img className='imgBtc' src={imgBtc} alt="" /> */}
                                <input onClick={handleCrypto} className='btc' id='BTC' name='bitcoin' type="button" value="Bitcoin" />
                            </div>
                            <div className="choix1">
                                <input onClick={handleCrypto} className='usdt' id='USDT' name='usdt' type="button" value="Usdt" />
                            </div>
                            <div className="choix1">
                                <input onClick={handleCrypto} className='eth' id='ETH' name='ethereum' type="button" value="Ethereum" />
                            </div>
                        </div>

                    </div>
                    <div className="form">
                        <div className="form-group">
                            <Input val={formik.values.wallet} type="text" label={t('sellCrypto6')} name="wallet" id="signup-wallet"
                                help={formik.errors.wallet} error={formik.errors.wallet && Boolean(formik.touched.wallet)}
                                change={formik.handleChange} handBlur={() => setTouched('wallet')}
                            />
                        </div>
                        <div className="form-group">
                            <Input val={formik.values.xaf} type="text" label={t('sellCrypto8')} name="xaf" id="signup-xaf"
                                help={formik.touched.xaf && formik.errors.xaf} error={formik.errors.xaf && Boolean(formik.touched.xaf)}
                                change={amountChange} handBlur={() => setTouched('xaf')}
                            />
                        </div>
                        <div className="form-group">
                            <Input type="text" label={t('buyCryptoMobileSous9') + ' ' + formik.values.fiat} name="eu" id="eu"
                                // val={formik.values.fiat === "EUR" ? formik.values.eu : formik.values.eu}
                                val={formik.values.eu}
                                help={formik.errors.eu} error={formik.errors.eu && formik.touched.eu}
                                change={amountChange} handBlur={() => setTouched('eu')}
                            />
                        </div>
                        <div className="form-group">
                            <Input val={formik.values.crypto === 'USDT' ? Math.trunc(formik.values.amount) : (formik.values.amount)} type="text" label={t('sellCrypto10') + formik.values.crypto} name="amount" id="amount"
                                help={formik.errors.amount} error={formik.errors.amount && formik.touched.amount}
                                change={amountChange} handBlur={() => setTouched('amount')}
                            />
                        </div>
                        <div className="form-group">
                            <Input val={showFee()} label={t('sellCrypto12')} />
                        </div>
                        <div className="form-group">
                            <InputPhone val={formik.values.phone} name="phone" label={t('sellCrypto13')} id="phone"
                                all={false} cm={true} alert={country !== 'CM'}
                                help={formik.errors.phone} error={formik.errors.phone && formik.touched.phone}
                                change={(name, value) => setPhone(name, value)}
                                handBlur={() => setTouched('phone')}
                            />
                        </div>
                        <div className="form-group">
                            <InputPhone val={formik.values.cfphone} name="cfphone" label={t('sellCrypto15')} id="cfphone"
                                all={false} cm={true} alert={country !== 'CM'}
                                help={formik.errors.cfphone} error={formik.errors.cfphone && formik.touched.cfphone}
                                change={(name, value) => setPhone(name, value)}
                                handBlur={() => setTouched('cfphone')}
                            />
                        </div>

                        <div className="form-group">
                            <button style={{ marginTop: "10px" }}
                                type="submit"
                                disabled={active()}
                                onClick={formik.handleSubmit}
                            >
                                {t('sellCrypto5')}
                            </button>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    )
}
const mapStateToProps = state => ({
    Amount: state.cryptoAmountReducer.crypto,
    country: state.countryReducer.country,
    User: state.userReducer.user
})
export default connect(mapStateToProps)(SellCrypto)