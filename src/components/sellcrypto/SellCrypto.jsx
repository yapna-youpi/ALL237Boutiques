import React, { useState, useEffect, createRef } from 'react'
import 'react-phone-number-input/style.css'
import { isValidPhoneNumber } from 'react-phone-number-input'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Modal } from 'react-responsive-modal'
import Modal2 from '../sendmoney/Modal2'
import Button from '@material-ui/core/Button'

import { useFormik } from 'formik';
import * as yup from 'yup';

import './sellcrypto.css'
import SellModal from './SellModal';
import { Input, Input2 } from '../addons/input/Input';
import PromoCode from '../promocode/PromoCode'
import InputPhone from '../addons/input/PhoneInput'
import Fiats from '../addons/Fiats/Fiats'
import { getCryptoRate, regWallet, regPhone, roundPrecision } from '../../utils/utilFunctions'
import { xafChange, euroChange, cryptoChange } from './handleAmount'
import Sumsub from '../sumsub/Sumsub'

const max = parseInt(process.env.REACT_APP_SELL_MAX);
const min = parseInt(process.env.REACT_APP_SELL_MIN);
const enable = process.env.REACT_APP_SELL_ENABLE;
const fees = process.env.REACT_APP_SELL_FEES;
const intouchFees = process.env.REACT_APP_INTOUCH_CI_FEES;


function SellCrypto({ Amount, country, User }) {
    const { t } = useTranslation()

    const validationSchema = yup.object({
        wallet: yup.string().required(`${t('formikSell1')}`).matches(regWallet, `${t('formikSell2')}`),
        xaf: yup.number().required(`${t('formikSell3')}`),
        eu: yup.number().required(`${t('formikSell4')}`),
        amount: yup.number().required(`${t('formikSell5')}`),
        phone: yup.string().required(`${t('formikSell6')}`),
        cfphone: yup.string().required(`${t('formikSell7')}`)
    })

    //initialisation de variabl d'environnement

    const [mode, setMode] = useState(false)

    // initialisation des taux de changes
    const [rate, setRate] = useState({ EUR: 0, USD: 0 })
    // initialisation du state du composants
    const [state, setState] = useState({
        crypto: "BTC", operator: "", amount: 0, xaf: 0, eu: 0, rate: rate.euroChange, number: "",
        confirmNumber: "", wallet: "", fiat: 'EUR',
    })
    // initialisation du state des erreurs
    const [errors, setErrors] = useState({
        xaf: false, wallet: false, number: false, confirmNumber: false
    })
    //for active promocode
    const [modal, setModal] = useState(false)
    const [sum, setSum] = useState(false)
    // promo state
    const [promo, setPromo] = useState({ promotion: false, code: '', show: false })
    const myRef = createRef(null)

    //initialisation of formik validation
    const formik = useFormik({
        initialValues: {
            wallet: "", xaf: "0", eu: "0",
            amount: "0", phone: "", cfphone: "",
            rate: rate.euroChange, fiat: 'EUR', crypto: "BTC",
            operator: ""
        },
        validationSchema,
        onSubmit: async () => {
            Eclip()
        }
    })

    useEffect(async () => {
        getCryptoRate().then(newRate => {
            if (!newRate) return
            setRate({ ...rate, EUR: newRate.EUR.rate_float, USD: newRate.USD.rate_float })
            // setState({...state, rate: newRate[state.fiat].rate_float, ...xafChange(Amount, newRate)})
            formik.setFieldValue('rate', newRate[formik.values.fiat].rate_float)
            // formik.setFieldValue(...formik,...xafChange(Amount, newRate))
        })
        console.log(state)
        let interval = setInterval(() => {
            getCryptoRate().then(newRate => {
                if (!newRate) return
                setRate({ ...rate, EUR: newRate.EUR.rate_float, USD: newRate.USD.rate_float })
                formik.setFieldValue('rate', newRate[formik.values.fiat].rate_float)
            })
        }, 60 * 1000)

        return () => {
            clearInterval(interval)
        }
    }, [])
    useEffect(() => {
        const target = { name: "xaf", value: parseInt(formik.values.xaf) }
        amountChange({ target })
    }, [promo])

    const openModal = () => {
        // setSum(true)
        setModal(!modal)
    }
    // function that manage the change of amount on each field
    const amountChange = e => {
        let result
        console.log(e.target.name)
        switch (e.target.name) { // amount c'est le montant en crypto monnaie 
            case "amount":
                result = cryptoChange(e.target.value, rate[formik.values.fiat], promo.promotion, User.percent)
                formik.setValues({ ...formik.values, ...result }, true)
                break
            case "xaf":
                result = xafChange(e.target.value, rate[formik.values.fiat], promo.promotion, User.percent)
                formik.setValues({ ...formik.values, ...result }, true)
                break;
            case "eu":
                result = euroChange(e.target.value, rate[formik.values.fiat], promo.promotion, User.percent)
                formik.setValues({ ...formik.values, ...result }, true)
                break;
            default:
                break
        }
    }
    // function that manages the activation of the button
    const active = () => {
        if (!(min > parseFloat(formik.values.xaf) || parseFloat(formik.values.xaf) > max) && formik.values.wallet.match(regPhone) && isValidPhoneNumber(formik.values.phone) && formik.values.cfphone === formik.values.phone) {
            return false
        } else return true

    }

    const changeFiat = (f) => {
        let result = cryptoChange(formik.values.amount, rate[f])
        // setState({...state, ...result, fiat: f, rate: rate[f]})
        formik.setFieldValue('result', result)
        formik.setFieldValue('fiat', f)
        formik.setFieldValue('rate', rate[f])
    }

    const Eclip = () => {
        if (enable == "FALSE") {
            setMode(!mode)
        } else {
            openModal()
            console.log('le compiosant eeset monter')
            // if(User.kyc){
            //     openModal()  // annulation de la kyc sur sellcrypto
            // }else{
            //     setSum(true)
            // }
        }
    }

    const setPhone = (name, val) => {
        formik.setFieldValue(name, val || '')
    }
    (() => {
        const montant = parseFloat(formik.values.xaf)

        if (formik.values.phone && !formik.errors.phone) {
            !isValidPhoneNumber(formik.values.phone) && formik.setFieldError('phone', `${t('formikSell8')}`)
        }
        if (formik.values.cfphone && !formik.errors.cfphone) {
            formik.values.cfphone !== formik.values.phone && formik.setFieldError('cfphone', `${t('formikSell9')}`)
        }
        if (formik.values.wallet && !formik.errors.wallet) {
            !formik.values.wallet.match(regPhone) && formik.setFieldError('wallet', `${t('formikSell10')}`)
        }
        if (formik.values.xaf && !formik.errors.xaf) {
            (min > montant || montant > max) && formik.setFieldError('xaf', `${t('formikSell11')}`)
        }

    })()
    const setTouched = (field) => {
        if (!formik.touched[field])
            formik.setFieldTouched(field, true)
    }
    const activePromotion = (code) => {
        console.log("active promo")
        setPromo({ ...promo, promotion: !promo.promotion, code: code, show: false })
    }
    const showFee = () => {
        if (promo.promotion) return 0
        else return formik.values.xaf ? Math.round(formik.values.xaf * (roundPrecision(fees, 4) + User.percent / 100)) + parseInt(intouchFees) : 0
    }
    (() => {
        if (!active() && !promo.code && !promo.show) {
            console.log("the promo state ", promo)
            setPromo({ ...promo, show: true })
        }
    })()

    // const closePromo = () => {
    //     document.getElementById('promocode').classList.toggle('hide')
    //     setTimeout(() => { setCode(false) }, 1000);
    // }

    // const changePromo=(data)=>{
    //     setPromo({...promo, ...data})
    // }

    return (
        <div id="sellcrypto" className="sellcrypto" ref={myRef}>
            {enable === "FALSE" ? <h3 className='disjoint'>{t("sellCrypto18")} </h3> : ""}

            <Modal2 mode={mode} close={() => setMode(false)} />
            {promo.show && <PromoCode closePromo={() => setPromo({ ...promo, show: false, code: "NO_CODE" })} activePromotion={activePromotion} />}
            {sum && <Modal open={true} onClose={() => setSum(false)} center={true} container={myRef.current} >
                <Sumsub call={openModal} close={() => setSum(false)} />
            </Modal>}
            {modal && <SellModal open={modal} toogle={setModal} data={{ ...formik.values, ...promo }} rate={rate[formik.values.fiat]} User={User} />}

            <h1>{t('sellCrypto')}</h1>
            <h2 className='crypt-sell'>{t('sellCrypto19')}</h2>
            <div className="sell-container">
                <div className="rate">
                    <Fiats action={changeFiat} fiat={formik.values.fiat} />
                    <h3>{t('sellCrypto2')}</h3>
                    <div className=""> 1 BTC === {Intl.NumberFormat('de-DE').format(Math.round(rate[formik.values.fiat] * 655))} XAF === {Intl.NumberFormat('de-DE').format(rate[formik.values.fiat])} {formik.values.fiat} </div>
                    <span><a href="https://www.coindesk.com" target="_blank">{t('sellCrypto4')} {t('sellCrypto3')}  </a> </span>
                </div>
                <div className="form">
                    <div className="form-group">
                        <Input val={formik.values.wallet} type="text" label={t('sellCrypto6')} name="wallet" id="signup-wallet"
                            help={formik.errors.wallet} error={formik.errors.wallet && Boolean(formik.touched.wallet)}
                            change={formik.handleChange} handBlur={() => setTouched('wallet')}
                        />
                    </div>
                    <div className="form-group">
                        <Input val={formik.values.xaf} type="number" label={t('sellCrypto8')} name="xaf" id="signup-xaf"
                            help={formik.touched.xaf && formik.errors.xaf} error={formik.errors.xaf && Boolean(formik.touched.xaf)}
                            change={amountChange} handBlur={() => setTouched('xaf')}
                        />
                    </div>
                    <div className="form-group">
                        <Input val={formik.values.eu} type="number" label={t('buyCryptoMobileSous9') + ' ' + state.fiat} name="eu" id="eu"
                            help={formik.errors.eu} error={formik.errors.eu && formik.touched.eu}
                            change={amountChange} handBlur={() => setTouched('eu')}
                        />
                    </div>
                    <div className="form-group">
                        <Input val={formik.values.amount} type="number" label={t('sellCrypto10')} name="amount" id="amount"
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