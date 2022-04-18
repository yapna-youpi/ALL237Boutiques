import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { useTranslation } from 'react-i18next'

import { randomId, randomChain, roundPrecision, apiUrl } from '../../utils/utilFunctions';
import crypt from '../../utils/crypt';
import { toastify } from '../addons/toast/Toast'

import './sendmoney.css'
import { Input } from '../addons/input/Input';
import PhoneInputool from '../addons/input/PhoneInputool'
import Modal from './Modal';

const EUR=655
// const EuroFees=655*0.964
const FEES=0.0396
// const INTOUCHFEES=250

// mercuryo fee up to 3.8%

let widgetUrl='https://ipercash-api.herokuapp.com/'

var interval=null

function SendMoney({amount, country, User, alert}) {
    const { t }=useTranslation()
    // value of differents field in the form 
    const [state, setState] = useState({
        amount: amount, name: "", phone: "", cPhone: ""
    })
    // handling error on different field 
    const [errors, setErrors]= useState({
        amount: false, name: false, phone: false, cPhone: false
    })
    // show waiting modal
    const [modal, setModal] = useState({open: false, closable: false, operationId: null, status: null})

    let history=useHistory()
    // handle change on different field, update mactching field in state
    const handleChange=e=>{
        let newState=state
        newState[e.name]=e.value
        setState({...state})
    }
    // handle errors in field, update field in error
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

    // this function send the data operation on api, open the widget and show the modal
    const send=()=>{
        // console.log(state)
        let params={
            "transaction_id":randomId('C'), "phone": state.phone,
            "name": state.name, userId: User.userId,
            "fiat_pay": Math.floor(EUR*(1-FEES)*Math.round(state.amount)-250),
            "initial_amount": state.amount
        }
        // console.log("the params ", params)
        // return
        let message=crypt(JSON.stringify(params))
        const requestOption={
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer "+User.token
            },
            "body": JSON.stringify({send: message})
        }
        setModal({...modal, open: true, closable: false, operationId: params.transaction_id})
        // TODO : make that page open after getting request response ( use await )
        window.open(widgetUrl+'hello?d='+randomChain()+';'+(state.amount)*0.579+';'+params.transaction_id, '_blank')
        fetch(apiUrl+'send/init', requestOption)
        .then(response=>response.json()).then(data=>{
            if(data.success) {
                console.log("start get status ")
                interval=setInterval(async() => {
                    getStatus(params.transaction_id)
                }, 60000)
            }
        })
        .catch(err=>{
            console.log(" une erreur est survenu ")
            closeModal()
            toastify("error", "An error are occur please try again")
        })

    }
    // this get the staus of operation at mercuryo
    const getStatus=(id)=>{
        // console.log("get status")
        let message=crypt(JSON.stringify({id: id, userId: User.userId}))
        const requestOption={
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer "+User.token
            },
            "body": JSON.stringify({send: message})
        }
        fetch(apiUrl+'send/status', requestOption)
        .then(response=>response.json()).then(data=>{
            if(data.status==='completed') {
                clearInterval(interval)
                let params={
                    ...state,
                    id: id,
                    operation: 'credit',
                    amount: Math.floor(EUR*(1-FEES)*Math.round(state.amount)-250)
                }
                sessionStorage.setItem('data', JSON.stringify(params))
                history.push('/complete')
                return data
            }
            if(data.status==='error') {
                // console.log("une erreur prevue")
                clearInterval(interval)
            }
        })
        .catch(err=>{
            clearInterval(interval)
            // console.log(" une erreur est survenu ", err)
        })

    }

    // this function handle disabled propertie of button
    const active=()=>{
        if((state.amount >= 25 && state.amount <=50) && state.name &&  state.phone &&isValidPhoneNumber(state.phone || 342) && (state.phone===state.cPhone)) return false
        else return true
    }
    // this fuction check phone number
    const validPhone=(value, func)=>{
        if(value) {
            // console.log("value ", value)
            return !func(value)
        }
        return false
    }
    // this function check if the two number are same
    const checkConfirm=(value1, value2)=>{
        if(value1) {
            return value1!==value2
        }
        return false
    }
    const closeModal=()=>{
        clearInterval(interval)
        setState({amount: amount, name: "", phone: "", cPhone: ""})
        setModal({open: false, closable: false})
    }

    // console.log("le state", state)
    return (
        <>
        <Modal option={modal} close={closeModal} />
        <div className="sendmoney">
            <div className="form">
                <div className="form-head">
                    <div className="form-group">
                        <Input val={state.amount} name="amount" label={ t('sendMoneySous9') } type='number' help={ t('sendMoneySous15')}
                            error={state.amount<25 || state.amount>50} change={handleChange} handBlur={handleBlur}
                        />
                    </div>
                    <div className="">1,OO EUR <h3 className="sign">&cong;</h3> 655,957 XAF</div>
                </div>
                <h3> { t('sendMoneyTitle')} </h3>
                <div className="form-body">
                    <div className="form-group">
                        <Input val={state.name} name="name" label={ t('sendMoneySous10')} error={errors.name} change={handleChange} handBlur={handleBlur}  help={t('sendMoneySous12') } />
                    </div>
                    <div className="form-group">
                        <PhoneInputool val={state.phone} label={ t('sendMoneySous11') } name="phone" id="phone" help="invalid number" 
                            change={handleChange} error={validPhone(state.number, isValidPhoneNumber)}  cm={true} alert={ country !=='CM'}
                        />
                    </div>
                    <div className="form-group">
                        <PhoneInputool val={state.cPhone}  label={t('sendMoneySous13') } name="cPhone" id="cPhone" help={t('sendMoneySous14') } 
                            change={handleChange} error={checkConfirm(state.cPhone, state.phone)}  cm={true} alert={ country !=='CM'}
                        />
                    </div>
                    <div className="form-group">
                        <button disabled={active()} onClick={send}> Continue </button>
                    </div>
                </div>
            </div>
            <div className="summary">
                <h2>{ t('sendMoneySous2') }</h2>
                <div className="row">
                    <span>{ t('sendMoneySous3') }</span>
                    <span> { Intl.NumberFormat('de-DE').format(Math.round(state.amount)) } EUR </span>
                </div>
                <div className="row">
                    <span>{ t('sendMoneySous4')}</span>
                    <span> { Intl.NumberFormat('de-DE').format(roundPrecision(state.amount*FEES, 2)+0.38) }  EUR </span>
                </div>
                <div className="row">
                    <span>{ t('sendMoneySous5')} </span>
                    <span> { Intl.NumberFormat('de-DE').format(Math.round(state.amount)) } EUR </span>
                </div>
                <div className="row">
                    <span>{t('sendMoneySous6')}</span>
                    <span>  { Intl.NumberFormat('de-DE').format(Math.floor(EUR*(1-FEES)*Math.round(state.amount)-250)) } XAF </span>
                </div>
                <div className="warning">
                    <h2>{ t('sendMoneySous7')}</h2>
                    <p>
                    { t('sendMoneySous8')} 
                    </p>
                </div>
            </div>
        </div>
        </>
    )
}

const mapStateToProps=state=>({amount: state.amountReducer.amount, country: state.countryReducer.country, User: state.userReducer.user})


export default connect(mapStateToProps)(SendMoney)   //SendMoney


/* percentage is at 4% */