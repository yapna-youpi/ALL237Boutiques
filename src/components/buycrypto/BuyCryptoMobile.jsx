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

import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button'

import './buycrypto.css'
import Sumsub from '../sumsub/Sumsub'
import PromoCode from '../promocode/PromoCode'
import { Input, Input2 } from '../addons/input/Input'
// import { Input } from '../addons/input/Input';
import InputPhone from '../addons/input/PhoneInput'
import PhoneInput from '../addons/input/PhoneInput'
import Fiats from '../addons/Fiats/Fiats'
import { randomId, getCryptoRate, checkWalletAddress } from '../../utils/utilFunctions'
import { regWallet, regPhone } from '../../utils/utilFunctions'
import { xafChange, euroChange, cryptoChange } from './handleMobile'

const max = parseInt(process.env.REACT_APP_BUY_MAX)
const min = parseInt(process.env.REACT_APP_BUY_MIN)
const enable = process.env.REACT_APP_BUY_ENABLE



function BuyCryptoMobile({ Amount, country, User }) {
    const { t } = useTranslation()

    const validationSchema = yup.object({
        wallet: yup.string().required(`${t('formikBuy1')}`).matches(regWallet, `${t('formikBuy2')}`),
        xaf: yup.string().required(`${t('formikBuy3')}`),
        eu: yup.string().required(`${t('formikBuy4')}`),
        amount: yup.string().required(`${t('formikBuy5')}`),
        phone: yup.string().required(`${t('formikBuy6')}`),
        cfphone: yup.string().required(`${t('formikBuy7')}`)
    })

    //initialisation de variabl d'environnement
    const [mode, setMode] = useState(false)


    // initialisation des taux de changes
    const [rate, setRate] = useState({ EUR: 0, USD: 0 })
    // initialisation du state du composants
    const [state, setState] = useState({
        crypto: "BTC", amount: 0, xaf: 0, eu: 0, fiat: 'EUR',
        rate: rate.EUR, number: "", confirmNumber: "", wallet: ""
    })
    // initialisation du state des erreurs
    const [errors, setErrors] = useState({
        xaf: false, wallet: false, number: false, confirmNumber: false
    })
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
            wallet: "", xaf: "0", eu: "0",
            amount: "0", phone: "", cfphone: "",
            rate: rate.EUR, fiat: 'EUR', crypto: "BTC",
        },
        validationSchema,
        onSubmit: async () => {
            Eclip()
        }
    })
    let history = useHistory()
    useEffect(async () => {
        getCryptoRate().then(newRate => {
            if (!newRate) return
            setRate({ ...rate, EUR: newRate.EUR.rate_float, USD: newRate.USD.rate_float })
            // formik.setValues({...formik, rate: newRate[state.fiat].rate_float, ...xafChange(Amount, newRate)})
            formik.setFieldValue('rate', newRate[formik.values.fiat].rate_float)
            // setState({ ...state, rate: newRate[state.fiat].rate_float, ...xafChange(Amount, newRate) })
        })
        let interval = setInterval(() => {
            getCryptoRate().then(newRate => {
                if (!newRate) return
                setRate({ ...rate, EUR: newRate.EUR.rate_float, USD: newRate.USD.rate_float })
                formik.setFieldValue('rate', newRate[formik.values.fiat].rate_float)
            })
        }, 30 * 1000)
        // if(User.parrain_id) window.alert('the parrain id : '+User.parrain_id+', '+User.percent)
        return () => {
            clearInterval(interval)
        }
    }, [])
    useEffect(() => {
        const target = { name: "xaf", value: parseInt(formik.values.xaf) }
        amountChange({ target })
    }, [formik.values.rate, promo])

    const openModal = () => setModal(!modal)
    // function that manage the change of amount on each field
    const amountChange = e => {
        let result
        // console.log(e.target.name)
        switch (e.target.name) { // amount c'est le montant en crypto monnaie 
            case "amount":
                formik.setFieldValue(e.target.name, e.target.value)
                result = cryptoChange(e.target.value, rate[formik.values.fiat], promo.promotion, User.percent)
                formik.setValues({ ...formik.values, ...result }, true)
                break
            case "xaf":
                // console.log("xaf has changed")
                // formik.setFieldValue(e.target.name, e.target.value)
                result = xafChange(e.target.value, rate[formik.values.fiat], promo.promotion, User.percent)
                formik.setValues({ ...formik.values, ...result }, true)
                break;

            case "eu":
                formik.setFieldValue(e.target.name, e.target.value)
                result = euroChange(e.target.value, rate[formik.values.fiat], promo.promotion, User.percent)
                formik.setValues({ ...formik.values, ...result }, true)
                break;
            default:
                break
        }
    }
    // function that manages the activation of the button
    const active = () => {
        if (!(min > parseFloat(formik.values.xaf) || parseFloat(formik.values.xaf) > max) && formik.values.wallet.match(regPhone) && isValidPhoneNumber(formik.values.phone || '') && formik.values.cfphone === formik.values.phone) {
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
            !formik.values.wallet.match(regPhone) && formik.setFieldError('wallet', `${t('formikBuy10')}`)
        }
        if (formik.values.xaf && !formik.errors.xaf) {
            (min > montant || montant > max) && formik.setFieldError('xaf', `${t('formikBuy11')}`)
        }

    })()
    const setTouched = (field) => {
        if (!formik.touched[field])
            formik.setFieldTouched(field, true)
    }

    // fonction qui verifie la correspondance des addresse
    const checkAddress = e => {
        if (e.value === formik.values.wallet) {
            // sessionStorage.clear()
            sessionStorage.removeItem('data')
            // sessionStorage.setItem('data',JSON.stringify(formik.setValues(({ ...formik, id: randomId('BM'), rate: rate[formik.values.fiat] }))))
            sessionStorage.setItem('data', JSON.stringify({ ...formik.values, id: randomId('BM'), rate: rate[formik.values.fiat], ...promo }))
            setValid(true)
            // console.log("the values stored ", JSON.parse(sessionStorage.getItem('data')))
            setTimeout(() => history.push('/purchase'), 2000)

            // !User.kyc ? setTimeout(() => {
            //     setModal(false)
            //     // setSum(true) // annulation de la verification kyc sur buycrypto
            //     setValid(false)
            // }, 2000) : setTimeout(() => history.push('/purchase'), 2000)
        }
    }
    const changeFiat = (f) => {
        let result = cryptoChange(formik.values.amount, rate[f])
        formik.setValues({ ...formik, ...result, fiat: f, rate: rate[f] })
        // setState({ ...formik, ...result, fiat: f, rate: rate[f] })
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
        else return formik.values.xaf * (0.065 + User.percent / 100)
    }
    // promo.promotion ? 0 : formik.values.xaf * (0.065 + User.percent / 100)
    (() => {
        if (!active() && !promo.code && !promo.show) setPromo({ ...promo, show: true })
    })()

    return (
        <div className="buycrypto">
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
                    <div className=""> 1 BTC === {Intl.NumberFormat('de-DE').format(Math.round(rate[formik.values.fiat] * 655))} XAF === {Intl.NumberFormat('de-DE').format(rate[formik.values.fiat])} {formik.values.fiat} </div>
                    <span>
                        {t('buyCryptoMobileSous6')} <a href="https://www.coindesk.com" target="_blank">{t('buyCryptoMobileSous4')}</a>
                    </span>
                </div>

                <div className="form">
                    <div className="form-group">
                        <Input val={formik.values.xaf} type="text" label={t('buyCryptoMobileSous7')} name="xaf" id="signup-xaf"
                            help={formik.touched.xaf && formik.errors.xaf} error={formik.errors.xaf && Boolean(formik.touched.xaf)}
                            change={amountChange} handBlur={() => setTouched('xaf')}
                        />
                    </div>
                    <div className="form-group">
                        <Input val={formik.values.eu} type="text" label={t('buyCryptoMobileSous9') + ' ' + formik.values.fiat} name="eu" id="eu"
                            help={formik.errors.eu} error={formik.errors.eu && formik.touched.eu}
                            change={amountChange} handBlur={() => setTouched('eu')}
                        />
                    </div>
                    <div className="form-group">
                        <Input val={formik.values.amount} type="text" label={t('buyCryptoMobileSous11')}
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


