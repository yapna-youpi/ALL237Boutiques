import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { useTranslation } from 'react-i18next'

import { randomId, randomChain, roundPrecision, apiUrl, sendToApi } from '../../utils/utilFunctions'
import crypt from '../../utils/crypt'
import { toastify } from '../addons/toast/Toast'

import './sendcabital.css'
// import Summary from './summary/Summary'
import { Input2 } from '../addons/input/Input'
import PhoneInputool from '../addons/input/PhoneInputool'
import Modal from './Modal'
import Modal2 from './Modal2'

import CabitalModal from './CabitalModal'

const EUR = 655
// const EuroFees=655*0.964
const FEES = 0.0396
// const INTOUCHFEES=250 XAF (0.38 EUR)

// mercuryo fee up to 3.8%

// let widgetUrl = 'https://ipercash-api.herokuapp.com/'
let widgetUrl = process.env.REACT_APP_MERCURYO_URL
// console.log("the widget url ", widgetUrl)

const max = parseInt(process.env.REACT_APP_SEND_MAX)
const min = parseInt(process.env.REACT_APP_SEND_MIN)
const enable = process.env.REACT_APP_SEND_ENABLE

var interval = null

function SendCabital({ amount, country, User }) {

    const { t } = useTranslation()
    //value showwing for sender mercurio or cabital
    const [sender, setSender] = useState({ mer: false, cab: false })
    // value of differents field in the form 
    const [state, setState] = useState({
        amount: amount, name: "", phone: "", cPhone: "", fees: amount * FEES, newAmount: amount
    })
    // handling error on different field 
    const [errors, setErrors] = useState({
        amount: false, name: false, phone: false, cPhone: false
    })
    // show waiting modal
    const [modal, setModal] = useState({ open: false, closable: false, operationId: null, status: null })

    // showing for show or not to taxations
    const [showing, setShowing] = useState(true)

    //actively of button for summary
    const [summer, setSummer] = useState(false)

    const [mode, setMode] = useState(false)
    const [cabital, setCabital] = useState(false)
    useEffect(() => {
        amountTaxation()
    }, [])

    let history = useHistory()
    // handle change on different field, update mactching field in state
    const handleChange = e => {
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
        let params = {
            "transaction_id": randomId('C'), "phone": state.phone,
            "name": state.name, userId: User.userId,
            "fiat_pay": Math.floor(EUR * state.amount),
            "initial_amount": state.amount
        }
        let message = crypt(JSON.stringify(params))
        const requestOption = {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + User.token
            },
            "body": JSON.stringify({ send: message })
        }
        setModal({ ...modal, open: true, closable: false, operationId: params.transaction_id })
        // TODO : make that page open after getting request response ( use await )
        window.open(widgetUrl + 'hello?d=' + randomChain() + ';' + (Math.ceil(parseFloat(state.amount) + parseFloat(state.fees))) * 0.579 + ';' + params.transaction_id, '_blank')
        fetch(apiUrl + 'send/init', requestOption)
            .then(response => response.json()).then(data => {
                if (data.success) {
                    interval = setInterval(async () => {
                        getStatus(params.transaction_id)
                    }, 60000)
                }
            })
            .catch(err => {
                closeModal()
                toastify("error", "An error are occur please try again")
            })
    }

    // this get the staus of operation at mercuryo
    const getStatus = (id) => {
        let message = crypt(JSON.stringify({ id: id, userId: User.userId }))
        const requestOption = {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + User.token
            },
            "body": JSON.stringify({ send: message })
        }
        fetch(apiUrl + 'send/status', requestOption)
            .then(response => response.json()).then(data => {
                if (data.status === 'completed') {
                    clearInterval(interval)
                    let params = {
                        ...state,
                        id: id,
                        operation: 'credit',
                        amount: Math.floor(EUR * (1 - FEES) * Math.round(state.amount) - 250)
                    }
                    sessionStorage.setItem('data', JSON.stringify(params))
                    history.push('/complete')
                    return data
                }
                if (data.status === 'error') {
                    clearInterval(interval)
                }
            })
            .catch(err => {
                clearInterval(interval)
            })

    }

    // this function handle disabled propertie of button
    const active = () => {
        if ((state.amount >= min && state.amount <= max) && state.name && state.phone && isValidPhoneNumber(state.phone || 342) && (state.phone === state.cPhone)) return false
        else return true
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
        setState({ amount: amount, name: "", phone: "", cPhone: "" })
        setModal({ open: false, closable: false })
        document.location.reload()
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

    // la function qui soummet le formulaire en fonction de mercurio ou cabital
    const handleSubmit = (e, enable) => {
        e.preventDefault()

        if (sender.mer) {
            eclips();
        } else setCabital(true)

        // setCabital(true)
        // eclips() @remind this launch mercuryo process
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

            case (state.amount <= 50):
                // console.log("the case ", state.amount)
                fees = Math.ceil(state.amount * 0.0396 + 0.38)
                newAmount = state.amount - fees
                setState({ ...state, fees, newAmount })
                break

            case (51 <= state.amount && state.amount <= 150):
                // console.log("the case ", state.amount)
                fees = 1.95
                newAmount = state.amount - fees
                setState({ ...state, fees, newAmount })
                break

            case (151 <= state.amount && state.amount < 300):
                // console.log("the case ", state.amount)
                fees = 2.95
                newAmount = state.amount - fees
                setState({ ...state, fees, newAmount })
                break

            case (300 <= state.amount):
                // console.log("the last case ", state.amount)
                fees = 3.95
                newAmount = state.amount - fees
                setState({ ...state, fees, newAmount })
                break

            default:
                // console.log("the default case ", state.amount)
                fees = 0
                newAmount = 0
                setState({ ...state, fees: 0, newAmount: 0 })
                break
        }
    }

    // console.log("the new amount ", Math.ceil(parseFloat(state.amount) + parseFloat(state.fees)))
    return (
        <>
            {enable === "FALSE" ? <h3 className='disjointe'>Le service est indisponible</h3> : ""}
            <div className="sendcabital">
                <Modal option={modal} close={closeModal} />
                <Modal2 mode={mode} close={() => setMode(false)} />
                {cabital && <CabitalModal User={User} close={() => setCabital(false)}
                    state={{ ...state, transaction_id: randomId('C'), fiat_pay: Math.floor(EUR * state.amount) }}
                />}
                <form className="form">
                    <div className="form-head">
                        <div className="form-group">
                            <Input2 val={state.amount} name="amount" id="amount" label={t('sendMoneySous9') + " TO TRANSFERT"} type='text' help={t('sendMoneySous15')}
                                error={state.amount < min || state.amount > max} change={handleChange} handBlur={handleBlur}
                            />
                        </div>
                        <div className="">1.OO EUR <h3 className="sign">&cong;</h3> 655.957 XAF</div>
                    </div>
                    <h3> {t('sendMoneyTitle')} </h3>
                    <div className="form-body">
                        <div className="form-group">
                            <Input2 val={state.name} name="name" id="name" type="text" label={t('sendMoneySous10')} error={errors.name} change={handleChange} handBlur={handleBlur} help={t('sendMoneySous12')} />
                        </div>
                        <div className="form-group">
                            <PhoneInputool val={state.phone} label={t('sendMoneySous11')} name="phone" id="phone" help="invalid number"
                                change={handleChange} error={validPhone(state.number, isValidPhoneNumber)} cm={true} alert={country !== 'CM'}
                            />
                        </div>
                        <div className="form-group">
                            <PhoneInputool val={state.cPhone} label={t('sendMoneySous13')} name="cPhone" id="cPhone" help={t('sendMoneySous14')}
                                change={handleChange} error={checkConfirm(state.cPhone, state.phone)} cm={true} alert={country !== 'CM'}
                            />
                        </div>
                        <div className="form-group" >
                            <button disabled={active()} onClick={handleSubmit} > Continue </button>
                        </div>
                    </div>
                </form>
                {/* <Summary showing={showing} state={state} EUR={EUR} setSummer={setSummer} setSender={setSender} /> */}
            </div>
        </>
    )
}

const mapStateToProps = state => ({ amount: state.amountReducer.amount, country: state.countryReducer.country, User: state.userReducer.user })


export default connect(mapStateToProps)(SendCabital)   //SendMoney


/* percentage is at 4% */