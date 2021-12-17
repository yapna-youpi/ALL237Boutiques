import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Modal } from 'react-responsive-modal'
import QRCode from 'react-qr-code'
import ReactLoading from 'react-loading'
import {FaRegCopy} from 'react-icons/fa';
import { useTranslation } from 'react-i18next'

import { sendToApi, roundPrecision } from '../../utils/utilFunctions'
import { cashIn } from '../../intouch/api'
import { checkServiceId, randomId } from '../../utils/utilFunctions'
import { cryptoChange } from './handleAmount';

import './sellmodal.css'
import Timer from './Timer'

const receiveWallet="13tuVVNDH1PLfUEiTEPkMDRQfTRVHyiYn2"

function SellModal({open, toogle, data, rate }) {
    const { t } = useTranslation()
     const [state, setState]=useState({txid: "", status: "", id:  "", start: false})
    const [step, setStep]=useState('')
    const [checking, setChecking]=useState(false)
    let history=useHistory()
    let ref=React.createRef()
    useEffect(async() => {
        console.log("les data", data)
        checkConflict()
        return () => {
        }
    }, [])

    const checkConflict=async ()=>{
        let result=await sendToApi('conflict', {amount: data.amount})
        setStep(result.response)
        console.log("le resultat ", result.response)
        return result.response
    }
    const checkPayment=async()=>{
        //console.log("le check payment ", state)
        setChecking(true)
        let params={
            address: data.wallet,
            amount: data.amount,
            id: state.id
        }
        // console.log("les params", params)
        let result=await sendToApi('checktransaction', params)
        if(result.response) {
            setState({...state, txid: result.response.id, status: result.response.status})
            if(result.response.status==="confirmed") success()
            else checkConfirmation({txid: result.response.id, id: state.id})
        } else {
            setState({...state, status: result.response})
        }
        console.log("result ", result)
        setChecking(false)
    }
    const setMessage=()=>{
        switch (state.status) {
            case "confirmed":
                //success()
                return <h2>{t('sellModal')}</h2>
            case "unconfirmed yet":
                //if(!state.status==="unconfirmed yet") checkConfirmation()
                return <p><center>{t('sellModal1')}<ReactLoading type="balls" color='#CC1616' height={30} width={30} /></center></p>
            case "conflict":
                return "there are an conflict"
            case "":
                return ""
            default:
                return "no transaction found check sender address or resend it"
        }
    }
    const change=()=>{
        setState({txid: "", status: "", id: "", start: false})
        toogle(!open)
    }
    const checkConfirmation=(data)=>{
        console.log(state)
        if(state.id) {
            console.log("dedans ", data)
            intervalFunction(data)
        }
    }
    const intervalFunction=(data)=>{
        console.log("is confirm ?")
        sendToApi('checkconfirmation', data).then(result=>{
            console.log("le resultat", result)
            if(result.response==="confirmed") {
                console.log("on arrete l'intervalle")
                //setState({...state, status: "confirmed"})
                success()
            }
            else {
                setTimeout(()=>intervalFunction(data), 60*1000)
            }
        })
    }
    const success=async()=>{
        console.log("start succes operation")
        let cashinParams={
            partner_id: state.id,
            service: checkServiceId(data.number.substring(4)),
            amount: 200,   // cryptoChange(data.amount, rate).xaf,
            number: data.number.substring(4)
        }
        let result=await cashIn(cashinParams)
        if(result) {
            console.log("le cashin", result)
            /* on enregistre l'operation */
            let successParams={
                transaction_id: state.id,
                status: 'complete',
                rate: rate,
            }
            let complete=sendToApi('updatesell', successParams)
            console.log("update to complete ", complete)
            sessionStorage.setItem('data', JSON.stringify({operation: 'sell', successParams: data}))
            setTimeout(() => {
                history.push('/complete')
            }, 2000);
        }
    }
    const start=async()=>{
        setState({...state, id: "id"})
        let conflict=await checkConflict()
        if(conflict==="conflict") return ""
        let storeData={
            transaction_id: randomId('S'),
            cryptoCurency: data.crypto,
            amountCrypto: data.amount,
            amountFiat: data.xaf,
            phone: data.number,
            clientWallet: data.wallet,
            status: 'init',
            rate: rate
        }
        console.log("le store data",storeData)
        let storeResult=await sendToApi('setsell', storeData)
        if(storeResult!=='error') {
            console.log("le resultat du store ", storeResult)
            setState({...state, start: true, id: storeData.transaction_id})
        }
    }
    const cancel=async()=>{
        // let operationId
        let storeData={
            transaction_id: state.id,
            status: 'cancel',
        }
        console.log("le store data",storeData)
        let storeResult=await sendToApi('updatesell', storeData)
        console.log("cancel result ", storeResult)
        if(storeResult!=='error') {
            change()
        }
    }
    const testCashin=async()=>{
        let witness=true
        console.log("hello je m'execute")
        if(witness) setTimeout(testCashin, 30*1000);
    }
    const copy=()=>{
        if(ref) {
            console.log(ref.current)
            ref.current.select()
            document.execCommand('copy')
        }
    }

    console.log("le state",state)
    return (
        <Modal open={open} onClose={()=>toogle(!open)} showCloseIcon={false} closeOnOverlayClick={false} center classNames={{overlay: "sell-overlay", modal: 'sell-modal'}}>
           {!step && <div className="sell-loader"><ReactLoading type="spin" color='#CC1616' height={100} width={100} /></div>}
            {step && (
                <div className="modal-container">
                   {step==='conflict' && (<div className="waiter">
                        <h2>{t('sellModal2')} </h2>
                        <Timer stamp={300*1000} action={change} />
                        <div className="modal-controls">
                            <button disabled={state.id} onClick={change} >{t('sellModal3')} </button>
                        </div>
                    </div>)}
                    { step!=="conflict" &&(
                    <>
                        {!state.start && (
                        <>
                            <div className="modal-details">
                                <h3>{t('sellModal4')}</h3>
                                <div className="">
                                    <span>{t('sellModal13')} </span>  <span> {data.amount} BTC</span>
                                </div>
                                <div className="">
                                    <span>{t('sellModal14')}  </span>  <span className="wallet"> { data.wallet.substr(0, 6)+'...'+data.wallet.substr(30) } </span>
                                </div>
                                <div className="">
                                    <span>  </span> {t('sellModal15')} <span> { cryptoChange(data.amount, rate).xaf} XAF </span>
                                </div>
                                <div className="">
                                    <span>{t('sellModal16')} </span>  <span> {data.number} </span>
                                </div>
                                <div className="">
                                    <span>{t('sellModal17')} </span>  <span> {roundPrecision(cryptoChange(data.amount, rate).xaf*0.05, 1)} XAF </span>
                                </div>
                            </div>
                            <h3 className="message"> {setMessage()} </h3>
                            <div className="modal-controls">
                                <button disabled={state.id} onClick={change} >{t('sellModal5')} </button>
                                <button disabled={state.id} onClick={start}>{t('sellModal6')} </button>
                            </div>
                        </>)}
                        {state.start && (
                        <div className="send-bloc">
                            {!state.txid&&<><Timer stamp={300*1000} action={cancel} />
                            <p>
                            {t('sellModal7')} <b>{data.amount}</b>{t('sellModal6')} <b  className="wadd">{receiveWallet}</b> <br/>
                            {t('sellModal8')} <br/>
                            {t('sellModal9')} <br/><br/>
                                <QRCode value={receiveWallet} size={150} fgColor="#0f394c" /> 
                            </p></>}
                            <div className="op-id">
                            {t('sellModal10')}    
                                <span> <input ref={ref} value={state.id} className="iid" onClick={copy} contentEditable={false} /><FaRegCopy size={25} /> </span>
                            </div>
                            <h4 className="message"> {setMessage()} </h4>
                            <div className="modal-controls">
                                <button disabled={state.txid} onClick={cancel} >{t('sellModal11')}   </button>
                                <button className="havesend" disabled={state.txid} onClick={checkPayment}>{t('sellModal12')} 
                                    {checking && <>&ensp;<ReactLoading type="spin" color='#fff' height={30} width={30} /> </>}
                                </button>
                            </div>
                        </div>)}
                    </>
                    )}
                </div>
            )}
        </Modal>
    )
}

export default SellModal