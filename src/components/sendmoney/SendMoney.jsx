import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { useTranslation } from 'react-i18next'

import { randomId, randomChain, roundPrecision } from '../../utils/utilFunctions';
import crypt from '../../utils/crypt';

import './sendmoney.css'
import { Input, Phone } from '../addons/input/Input';
import PhoneInputool from '../addons/input/PhoneInputool'
import Modal from './Modal';


let widgetUrl='https://ipercash-api.herokuapp.com/'
// const apiUrl='https://ipercash-node-api.herokuapp.com/api/'
const apiUrl='http://127.0.0.1:4001/api/'

var interval=null

function SendMoney({amount, country, User,alert}) {
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
    // const [inter, setInter]=useState(null)
    let history=useHistory()
    // handle change on different field, update mactching field in state
    const handleChange=e=>{
        console.log(e.name);
        let newState=state
        newState[e.name]=e.value
        setState({...state})
    }
    // handle errors in field, update field in error
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

    // this function send the data operation on api, open the widget and show the modal
    const send=()=>{
        console.log(state)
        let params={"transaction_id":randomId('C'), "phone": state.phone, "name": state.name, userId: User.userId}
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
        window.open(widgetUrl+'hello?d='+randomChain()+';'+state.amount*1.04*0.579+';'+params.transaction_id, '_blank')
        fetch(apiUrl+'init', requestOption)
        .then(response=>response.json()).then(data=>{
            console.log(data)
            if(data.success==="payload initiate") {
                interval=setInterval(async() => {
                    console.log("fonction d'intervale")
                    // console.log("l'interval ", inter)
                    getStatus(params.transaction_id)
                }, 3000)
            }
        })
        .catch(err=>console.log(" une erreur est survenu "))

    }
    // this get the staus of operation at mercuryo
    const getStatus=(id)=>{
        console.log("get status")
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
        fetch(apiUrl+'getcreditstatus', requestOption)
        .then(response=>response.json()).then(data=>{
            if(data.status==='completed') {
                clearInterval(interval)
                console.log("un bon statut est arrive ", data)
                sessionStorage.setItem('data', JSON.stringify({operation: 'credit', params: state}))
                history.push('/complete')
                return data
            }
            if(data.status==='error') {
                console.log("une erreur prevue")
                clearInterval(interval)
            }
        })
        .catch(err=>{
            clearInterval(interval)
            console.log(" une erreur est survenu ", err)
        })

    }

    // this function handle disabled propertie of button
    const active=()=>{
        if(state.amount >= 25 && state.name &&  state.phone &&isValidPhoneNumber(state.phone || 342) && (state.phone===state.cPhone)) return false
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
            // console.log(value1===value2)
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
                        <Input val={state.amount} name="amount" label={ t('sendMoneySous9') } type='number' error={state.amount<25} change={handleChange} handBlur={handleBlur} help="the minimun is 25 EUR" />
                    </div>
                    <div className="">1.OO EUR==655.957 XAF</div>
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
                    <span> { state.amount } EUR </span>
                </div>
                <div className="row">
                    <span>{ t('sendMoneySous4')}</span>
                    <span> { state.amount*0.04 } EUR </span>
                </div>
                <div className="row">
                    <span>{ t('sendMoneySous5')} </span>
                    <span> { state.amount*1.04 } EUR </span>
                </div>
                <div className="row">
                    <span>{ t('sendMoneySous6')}</span>
                    <span>  { Math.floor(655*0.96*state.amount) } XAF </span>
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