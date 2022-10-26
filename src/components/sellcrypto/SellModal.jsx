import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Modal } from 'react-responsive-modal'
import QRCode from 'react-qr-code'
import ReactLoading from 'react-loading'
import { FaRegCopy } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

import { sendToApi, roundPrecision, randomId } from '../../utils/utilFunctions'
import { cryptoChange } from './handleAmount'
import { toastify } from '../addons/toast/Toast'

import './sellmodal.css'
import Timer from './Timer'

const receiveWallet = "13tuVVNDH1PLfUEiTEPkMDRQfTRVHyiYn2"
const FEES = 0.0395

function SellModal({ open, toogle, data, rate, User }) {
    const { t } = useTranslation()
    const [state, setState] = useState({ txid: "", status: "", id: "", start: false })
    const [step, setStep] = useState('')
    const [checking, setChecking] = useState(false)
    const [error, setError] = useState(false)
    let history = useHistory()
    let ref1 = React.createRef()
    let ref2 = React.createRef()
    useEffect(async () => {
        checkConflict()
        return () => {
        }
    }, [])
    // function that check if there is a conflict with the amount
    const checkConflict = async () => {
        let result = await sendToApi('sellcrypto/conflict', {
            amount: data.amount, xaf: data.xaf, number: data.phone,
            userId: User.userId
        }, User.token)
        if (!result.response || result === 'error') {
            toogle()
            toastify("error", `An error are occur please try again`)
            return
        }
        setStep(result.response)
        return result.response
    }
    // function that check if the payment has been done
    const checkPayment = async () => {
        setChecking(true)
        let params = {
            address: data.wallet,
            amount: data.amount,
            id: state.id,
            userId: User.userId
        }
        let result = await sendToApi('sellcrypto/gettx', params, User.token)
        if (result.response) {
            setState({ ...state, txid: result.response.id, status: result.response.status })
            if (result.response.status === "confirmed") setTimeout(() => success(), 20 * 1000)
            else checkConfirmation({ txid: result.response.id, id: state.id })
        } else {
            setState({ ...state, status: result.response })
        }
        setChecking(false)
    }
    // function that haandle message about status of transaction
    const setMessage = () => {
        switch (state.status) {
            case "confirmed":
                //success()
                return <h2>{t('sellModal')}</h2>
            case "unconfirmed yet":
                //if(!state.status==="unconfirmed yet") checkConfirmation()
                return <p><center>
                    {t('sellModal1')}<ReactLoading type="balls" color='#CC1616' height={30} width={30} />
                </center></p>
            case "conflict":
                return t('sellModal20')
            case "":
                return ""
            default:
                return t('sellModal21')
        }
    }
    // function that handle state changes and the appearance of modal 
    const change = () => {
        setState({ txid: "", status: "", id: "", start: false })
        toogle(!open)
    }
    // function that checks confirmation of transaction
    const checkConfirmation = (data) => {
        let time = 0
        if (state.id) {
            intervalFunction(data, time)
        }
    }
    // function that check confirmation of transaction
    const intervalFunction = (data, time) => {
        time++
        if (time === 12) { // when time reach 11 transaction have 10 min
            setTimeout(() => success(), 20 * 1000) // waiting for api make payment and change status of operation in database
            return
        }
        sendToApi('sellcrypto/confirm', data).then(result => {
            if (result.response === "confirmed") {
                //setState({...state, status: "confirmed"})
                setTimeout(() => success(), 20 * 1000)
            }
            else {
                setTimeout(() => intervalFunction(data, time), 60 * 1000)
            }
        })
    }
    const success = async (time = 0) => {
        // if time is greater than 2 we show an error
        if (time > 1) {
            history.push('/complete')
            return
        }
        // check the state of the payment 
        let successParams = {
            transaction_id: state.id,
            userId: User.userId
            // status: 'complete',
            // rate: rate,
        }
        // show the result to client
        sendToApi('sellcrypto/status', successParams, User.token)
            .then(data => {
                if (data) {
                    if (data.status === "complete") {  // payment success
                        let p = {
                            operation: 'Sell Crypto',
                            id: state.id,
                            amount: data.xaf,
                            phone: data.phone
                        }
                        sessionStorage.setItem('data', JSON.stringify(p))
                        setTimeout(() => {
                            history.push('/complete')
                        }, 2000)
                    } else {    // payment fail
                        if (data.errorStep) {
                            setError(true)
                        }
                    }
                } else { // retry verification
                    time++  // increment number of times that the operation has been performed
                    setTimeout(() => {
                        success(time)
                    }, 5000)
                }
            })

    }
    const start = async () => {
        setState({ ...state, id: "id" })
        let conflict = await checkConflict()
        if (conflict !== "free") return ""
        let storeData = {
            transaction_id: randomId('S'),
            cryptoCurency: data.crypto,
            amountCrypto: data.amount,
            amountFiat: data.xaf,
            phone: data.phone,
            clientWallet: data.wallet,
            status: 'init',
            rate: rate,
            userId: User.userId
        }
        if (data.promotion) storeData = { ...storeData, promotion: data.promotion, code: data.code }
        let storeResult = await sendToApi('sellcrypto/create', storeData, User.token)
        if (storeResult !== 'error') {
            setState({ ...state, start: true, id: storeData.transaction_id })
        }
    }
    const cancel = async () => {
        // let operationId
        let storeData = {
            transaction_id: state.id,
            status: 'cancel',
            userId: User.userId
        }
        let storeResult = await sendToApi('sellcrypto/update', storeData, User.token)
        if (storeResult !== 'error') {
            change()
        }
    }
    const copy = (n) => {
        if (n === 1 && ref1) {
            ref1.current.select()
            document.execCommand('copy')
        }
        else if (ref2) {
            ref2.current.select()
            document.execCommand('copy')
        }
        toastify('info', "text copied", 3000)
    }

    return (
        <Modal open={open} onClose={() => toogle(!open)} showCloseIcon={false} closeOnOverlayClick={false}
            center classNames={{ overlay: "sell-overlay", modal: 'sell-modal' }}
        >
            {!step &&
                // loader before check conflict
                <div className="sell-loader">
                    <ReactLoading type="spin" color='#CC1616' height={100} width={100} />
                </div>
            }
            {step && (
                // result of check conflict
                <div className="modal-container">
                    {step === 'conflict' && (<div className="waiter">
                        <h2>{t('sellModal2')} </h2>
                        <Timer stamp={600 * 1000} action={change} />
                        <div className="modal-controls">
                            <button disabled={state.id} onClick={change} >{t('sellModal3')} </button>
                        </div>
                    </div>)}
                    {step !== "conflict" && (
                        <>
                            {!state.start && (
                                // summary of transaction 
                                <>
                                    <div className="modal-details">
                                        <h3>{t('sellModal4')}</h3>
                                        <div className="">
                                            <span>{t('sellModal13')} </span>  <span> {Intl.NumberFormat('fr-FR', { maximumSignificantDigits: 8 }).format(data.amount)} BTC</span>
                                        </div>
                                        <div className="">
                                            <span>{t('sellModal14')}  </span>  <span className="wallet"> {data.wallet.substr(0, 6) + '...' + data.wallet.substr(30)} </span>
                                        </div>
                                        <div className="">
                                            <span>  {t('sellModal15')}</span> <span> {Intl.NumberFormat('de-DE').format(cryptoChange(data.amount, rate).xaf)} XAF </span>
                                        </div>
                                        <div className="">
                                            <span>{t('sellModal16')} </span>  <span> {data.phone} </span>
                                        </div>
                                        <div className="">
                                            <span>{t('sellModal17')} </span>  <span> {Intl.NumberFormat('de-DE').format(roundPrecision(cryptoChange(data.amount, rate).xaf * FEES, 0))} XAF </span>
                                        </div>
                                    </div>
                                    <h3 className="message"> {setMessage()} </h3>
                                    <div className="modal-controls">
                                        <button disabled={state.id} onClick={change} >{t('sellModal5')} </button>
                                        <button disabled={state.id} onClick={start}>{t('sellModal18')} </button>
                                    </div>
                                </>)
                            }
                            {state.start && (
                                // transaction bloc
                                <div className="send-bloc">
                                    {!state.txid && <><Timer stamp={600 * 1000} action={cancel} />
                                        <p>
                                            {t('sellModal7')} <input ref={ref1} value={data.amount} className="icopy" onClick={() => copy(1)} contentEditable={false} />{/* <FaRegCopy size={25} /> */}
                                            {t('sellModal6')} <b className="wadd">{receiveWallet}</b> <br />
                                            {t('sellModal8')} <br />
                                            {t('sellModal9')} <br /><br />
                                            <QRCode value={receiveWallet} size={150} fgColor="#0f394c" />
                                        </p></>}
                                    <div className="op-id">
                                        {t('sellModal10')}
                                        <span> <input ref={ref2} value={state.id} className="iid" onClick={() => copy(2)} contentEditable={false} /><FaRegCopy size={25} /> </span>
                                    </div>
                                    {!error && (<>
                                        <h4 className="message"> {setMessage()} </h4>
                                        <div className="modal-controls">
                                            <button disabled={state.txid} onClick={cancel} >{t('sellModal11')}   </button>
                                            <button className="havesend" disabled={state.txid} onClick={checkPayment}>{t('sellModal12')}
                                                {checking && <>&ensp;<ReactLoading type="spin" color='#fff' height={30} width={30} /> </>}
                                            </button>
                                        </div>
                                    </>)
                                    }
                                    {   // error block
                                        error && <div className="error-bloc">
                                            <h4 className="message"> {t('sellModal19')} </h4>
                                            <div className="modal-controls">
                                                <button onClick={() => toogle(false)} > {t('sellModal22')} </button>
                                            </div>
                                        </div>
                                    }
                                </div>)
                            }
                        </>
                    )}
                </div>
            )}
        </Modal>
    )
}

export default SellModal