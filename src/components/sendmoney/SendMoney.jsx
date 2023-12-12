import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { useTranslation } from 'react-i18next'
import ReactLoading from 'react-loading';

import { randomId, sendToApi, cancelForm } from '../../utils/utilFunctions'
import { toastify } from '../addons/toast/Toast'

import './sendmoney.css'
import { Input2 } from '../addons/input/Input'
import PhoneInputool from '../addons/input/PhoneInputool'
import Modal from './Modal'
import Modal2 from './Modal2'
import PromoCode from '../promocode/PromoCode'
// import Widget from './Widget'
// const EUR = 655
// const EuroFees=655*0.964
const FEES = 0.0396
// const INTOUCHFEES=250 XAF (0.38 EUR)

// mercuryo fee up to 3.8%

let widgetUrl = 'https://mercuryo.ipercash.fr/'
// let widgetUrl = process.env.REACT_APP_MERCURYO_URL
// console.log("the widget url ", widgetUrl)

var interval = null

function SendMoney({ amount, country, User }) {
    let enable = process.env.REACT_APP_SEND_ENABLE;
    const minValue = process.env.REACT_APP_SEND_MIN;
    const maxValue = process.env.REACT_APP_SEND_MAX;

    const { t } = useTranslation()
    // value of differents field in the form 
    const [state, setState] = useState({
        amount: amount, name: "", phone: "", cPhone: "", fees: amount * FEES, newAmount: amount, EUR: "",
    })
    const [load, setLoad] = useState(false)
    // handling error on different field 
    const [errors, setErrors] = useState({
        amount: false, name: false, phone: false, cPhone: false
    })
    // show waiting modal
    const [modal, setModal] = useState({ open: false, closable: false, operationId: "IPercashid123456", status: 'init' })
    // showing for show or not to taxations
    const [showing, setShowing] = useState(true)
    // promo state
    const [promo, setPromo] = useState({ promotion: false, code: '', show: false })

    const [mode, setMode] = useState(false)
    useEffect(() => {
        amountTaxation()

        fetch(process.env.REACT_APP_API_URL + "currencies")
            .then(resp => resp.json())
            .then(data => {
                // console.log('les data', data.XAF)
                setState({ ...state, EUR: data.XAF })
            })
            .catch(err => 0)

    }, [])

    const cancelForm = () => {
        setState({ amount: amount, name: "", phone: "", cPhone: "", newAmount: amount })
    }

    let history = useHistory()
    // handle change on different field, update mactching field in state
    const handleChange = e => {
        // console.log(`${e.name} and ${e.value}`)
        let newState = state
        newState[e.name] = e.value
        setState({ ...state })
        amountTaxation()
    }
    // handle errors in field, update field in error
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

    // this function send the data operation on api, open the widget and show the modal
    const send = () => {
        setLoad(true)
        let params = {
            "transaction_id": randomId('C'), "phone": state.phone,
            "name": state.name, userId: User.userId,
            "fiat_pay": Math.floor(state.EUR * state.newAmount),
            "initial_amount": Math.floor(parseInt(state.amount)+ 1),
            "promotion": promo.promotion ? true : null,
            "code": promo.promotion ? promo.code : null,
            "provider": process.env.REACT_APP_MOBILE_PROVIDER

        }
        // TODO : make that page open after getting request response ( use await )
        // window.open(widgetUrl + '?d=' + randomChain() + ';' + (Math.ceil(parseFloat(state.amount) + parseFloat(state.fees))) * 0.579 + ';' + params.transaction_id, '_blank')
        sendToApi('send/init', params, User.token)
            .then(data => {
                // console.log("the response ", data)
                if (data.success) {
                    // console.log("we are in the if ")
                    setModal({ ...modal, open: true, closable: false, operationId: params.transaction_id, status: 'pending' })
                    interval = setInterval(async () => {
                        getStatus(params.transaction_id)
                    }, 60 * 1000)
                } else toastify("error", "An error is occured please try again")
                setLoad(false)
            })
            .catch(err => {
                closeModal()
                toastify("error", "An error is occured please try again")
                setLoad(false)
            })

    }
    // this get the staus of operation at mercuryo
    const getStatus = (id) => {
        let message = { id: id, userId: User.userId }
        sendToApi('send/status', message, User.token)
            .then(data => {
                // console.log("les data de get status ", data)
                if (data.status === 'completed') {
                    clearInterval(interval)
                    let params = {
                        ...state,
                        id: id,
                        operation: 'credit',
                        amount: Math.floor(state.EUR * (1 - FEES) * Math.round(state.amount) - 250)
                    }
                    sessionStorage.setItem('data', JSON.stringify(params))
                    history.push('/complete')
                    return data
                } else if (data.status === 'cancelled') {
                    // console.log("c'est cancelled")
                    setModal({ ...modal, open: true, closable: false, operationId: id, status: 'failed' })
                    clearInterval(interval)
                } else if (data.status === 'error') {
                    clearInterval(interval)
                    setModal({ ...modal, open: true, closable: false, operationId: id, status: 'failed' })
                } else {
                    /* may be should do something here */
                }
            })
            .catch(err => {
                // console.log("there is an error", err)
                clearInterval(interval)
                setModal({ ...modal, status: 'failed' })
            })
    }

    // this function handle disabled propertie of button
    const active = () => {
        if ((state.amount >= minValue && state.amount <= maxValue) && state.name && state.phone && isValidPhoneNumber(state.phone || 342) && (state.phone === state.cPhone)) return false
        else return true;
    }
    // this function check phone number
    const validPhone = (value, func) => {
        if (value) {
            return !func(value)
        }
        return false
    }
    // this function check if the two number are same
    const checkConfirm = (value1, value2) => {
        if (value1) {
            return value1 !== value2
        }
        return false
    }
    const closeModal = () => {
        clearInterval(interval)
        setState({ amount: amount, name: "", phone: "", cPhone: "", newAmount: amount })
        setModal({ open: false, closable: false })
        document.location.reload()
    }

    const handleSubmit = (e, enable) => {
        e.preventDefault()

        if (enable == "FALSE") {
            return false
        }
        eclips()
    }
    // la function du submit au boutton pour changer le taux
    const eclips = () => {
        if (showing == true) {
            setShowing(!showing)

            // return false
        } else {

            if (enable == 'FALSE') {
                setMode(!mode)
            } else {
                send()
            }

        }


    }
    // la function qui gere le taxe sur le montant
    const amountTaxation = () => {
        let fees, newAmount
        switch (true) {
            case (state.amount === ''):
                // console.log("the empty case ", state.amount)
                fees = 0
                newAmount = 0
                setState({ ...state, fees: 0, newAmount: 0 })
                break

            case (minValue <= state.amount && state.amount <= maxValue):
                // console.log("the case ", state.amount)
                fees = 0.99
                newAmount = state.amount - fees
                setState({ ...state, fees, newAmount })
                break

            default:
                // console.log("the default case ", state.amount)
                fees = 0
                newAmount = 0
                setState({ ...state, fees: 0, newAmount: 0 })
                break


            // case (state.amount <= 50):
            //     // console.log("the case ", state.amount)
            //     fees = Math.ceil(state.amount * 0.0396 + 0.38)
            //     newAmount = state.amount - fees
            //     setState({ ...state, fees, newAmount })
            //     break

            // case (51 <= state.amount && state.amount < 150):
            //     // console.log("the case ", state.amount)
            //     fees = 1.95
            //     newAmount = state.amount - fees
            //     setState({ ...state, fees, newAmount })
            //     break

            // case (151 <= state.amount && state.amount < minValue0):
            //     // console.log("the case ", state.amount)
            //     fees = 2.95
            //     newAmount = state.amount - fees
            //     setState({ ...state, fees, newAmount })
            //     break

            // case (minValue0 <= state.amount):
            //     // console.log("the last case ", state.amount)
            //     fees = 3.95
            //     newAmount = state.amount - fees
            //     setState({ ...state, fees, newAmount })
            //     break


        }
    }

    const activePromotion = (code, response) => {
        setPromo({ promotion: true, code: code, show: true })
        // console.log('les données de retour activePromotio',code,response)
        setState({ ...state, fees: 0 })
    }

    // console.log("the state ", state)
    return (
        <>
            {enable === "FALSE" ? <h3 className='disjointe'>{t('sendMoneySous16')}</h3> : ""}
            <div className="sendmoney">
                <Modal option={{ ...modal, amount: state.amount }} close={closeModal} />
                <Modal2 mode={mode} close={() => setMode(false)} />
                {!active() && <PromoCode activePromotion={activePromotion} closePromo={() => setPromo({ ...promo, show: false, code: "NO_CODE" })} />}
                <form className="form">
                    <div className="form-head">
                        <div className="form-group">
                            <Input2 val={state.amount} name="amount" label={t('sendMoneySous9')} type='number' help={t('sendMoneySous15')}
                                error={state.amount < minValue || state.amount > maxValue} change={handleChange} handBlur={handleBlur}
                            />
                        </div>
                        <div className="">1,OO EUR <h3 className="sign">&cong;</h3> {state.EUR} XAF</div>
                    </div>
                    <h3> {t('sendMoneyTitle')} </h3>
                    <div className="form-body">
                        <div className="form-group">
                            <Input2 val={state.name} name="name" label={t('sendMoneySous10')} error={errors.name} change={handleChange} handBlur={handleBlur} help={t('sendMoneySous12')} />
                        </div>
                        <div className="form-group">
                            <PhoneInputool val={state.phone} label={t('sendMoneySous11')} name="phone" id="phone" help={t('sendMoneySous17')}
                                change={handleChange} error={validPhone(state.number, isValidPhoneNumber)} cm={true} alert={country !== 'CM'}
                            />
                        </div>
                        <div className="form-group">
                            <PhoneInputool val={state.cPhone} label={t('sendMoneySous13')} name="cPhone" id="cPhone" help={t('sendMoneySous14')}
                                change={handleChange} error={checkConfirm(state.cPhone, state.phone)} cm={true} alert={country !== 'CM'}
                            />
                        </div>
                        <div className="form-group" >
                            <button disabled={active()} onClick={load ? cancelForm : handleSubmit} >
                                {load ? (<center>
                                    <ReactLoading type="spin" color="#ffffff" width="28px" height="28px"
                                    /></center>) : t('sendMoneySous1')}
                            </button>
                        </div>
                    </div>
                </form>

                <div className="summary">
                    <h2>{t('sendMoneySous2')}</h2>
                    <div className="row">
                        <span>{t('sendMoneySous3')}</span>
                        <span> {Intl.NumberFormat('de-DE').format(Math.ceil(state.amount))} EUR </span>
                    </div>
                    <div className="row">
                        <span>{t('sendMoneySous4')}</span>
                        {/* <span> { promo.show ? 0 : Intl.NumberFormat('de-DE').format((state.fees)) }  EUR </span> */}
                        <span> {Intl.NumberFormat('de-DE').format((state.fees))}  EUR </span>
                    </div>
                    <div className="row">
                        <span>{t('sendMoneySous5')} </span>
                        <span> {Intl.NumberFormat('de-DE').format((parseFloat(state.amount) + parseFloat(state.fees)) || 0)} EUR </span>
                    </div>
                    <div className="row">
                        <span>{t('sendMoneySous6')}</span>
                        <span>  {Intl.NumberFormat('de-DE').format(Math.floor(state.EUR * state.newAmount))} XAF </span>
                    </div>

                    <h2>{t('sendText5')}</h2>
                    {showing ? (
                        <div className='warning eclips'>
                            <div className="row row1">
                                <span>{t('sendText1')} </span>
                                <span> {"0.99  "}EUR </span>
                            </div>
                            {/* <div className="row">
                                <span>{t('sendText2')}EUR </span>
                                <span> {"2 "}EUR </span>
                            </div> */}
                            {/*
                            <div className="row">
                                <span>{t('sendText3')}EUR </span>
                                <span> {"3 "}EUR </span>
                            </div>
                            <div className="row">
                                <span>{t('sendText4')} </span>
                                <span> {"4 "}EUR </span>
                            </div> */}
                        </div>
                    )
                        :
                        (
                            <div className="warning delay">
                                <h2>{t('sendMoneySous7')}</h2>
                                <p>
                                    {t('sendMoneySous8')}
                                </p>
                            </div>
                        )
                    }
                </div>

            </div>
        </>
    )
}

const mapStateToProps = state => ({ amount: state.amountReducer.amount, country: state.countryReducer.country, User: state.userReducer.user })


export default connect(mapStateToProps)(SendMoney)   //SendMoney


/* percentage is at 4% */