import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Modal } from 'react-responsive-modal'
import QRCode from 'react-qr-code'
import ReactLoading from 'react-loading'
import { FaRegCopy } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

import { sendToApi, roundPrecision, randomId } from '../../utils/utilFunctions'
import { toastify } from '../addons/toast/Toast'

import './sellmodal.css'
import Timer from './Timer'

const fees = process.env.REACT_APP_SELL_FEES;
const intouchFees = process.env.REACT_APP_INTOUCH_CI_FEES;

function SellModal({ open, toogle, data, rate, User, promotion }) {
    const { t } = useTranslation()
    const [state, setState] = useState({ txid: "", status: "", id: "", start: false })
    const [step, setStep] = useState('')
    const [checking, setChecking] = useState(false)
    const [error, setError] = useState(false)
    let history = useHistory()
    let ref1 = React.createRef()
    let ref2 = React.createRef()
    let ref3 = React.createRef()
    useEffect(async () => {
        checkConflict()
        return () => {
        }
    }, [])
    // function that check if there is a conflict with the amount
    const checkConflict = async () => {
        let result = await sendToApi('sellcrypto/conflict', {
            amount: data.amount, xaf: data.xaf, number: data.phone,
            userId: User.userId, provider: process.env.REACT_APP_MOBILE_PROVIDER
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
        let params = {
            address: data.wallet,
            amount: data.amount,
            id: state.id,
            userId: User.userId,
            crypto: data.crypto
        }
        let result = await sendToApi('sellcrypto/gettx', params, User.token)
        if (result.response) {
            setState({ ...state, txid: result.response.id, status: result.response.status })
            if (result.response.status === "confirmed") setTimeout(() => success(), 20 * 1000)
            else checkConfirmation({ txid: result.response.id, id: state.id })
            return true
        } else {
            setState({ ...state, status: result.response })
            return false
        }
    }
    const startChecking = async () => {
        setChecking(true)
        let result = await checkPayment()
        if (!result) {
            let time = 0
            let left = ((+new Date) - state.time) / 1000
            let interval = setInterval(async () => {
                result = await checkPayment()
                time++
                if (result || time === (10 - Math.ceil(left / 60))) {
                    clearInterval(interval)
                }
            }, 60 * 1000)
        }
    }
    // function that haandle message about status of transaction
    const setMessage = () => {
        switch (state.status) {
            case "confirmed":
                //success()
                return <h2>{t('sellModal')}</h2>
            case "unconfirmed":
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
        if (time === 11) { // when time reach 11 transaction have 10 min
            setTimeout(() => success(), 20 * 1000) // waiting for api make payment and change status of operation in database
            return
        }
        sendToApi('sellcrypto/confirm', data).then(result => {
            if (result.response === "confirmed") {
                //setState({...state, status: "confirmed"})
                setTimeout(() => success(), 20 * 1000)
            }
            else {
                setTimeout(() => intervalFunction(data, time), 60 * 1 * 1000)
            }
        }).catch((error => {
            setTimeout(() => intervalFunction(data, time), 60 * 1 * 1000)
        }))
    }
    const success = async (time = 0) => {
        // if time is greater than 2 we show an error
        if (time > 1) {
            let p = {
                operation: 'Sell Crypto',
                id: state.id,
                amount: data.xaf,
                phone: data.phone
            }
            sessionStorage.setItem('data', JSON.stringify(p))
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
            .then(res => {
                if (res) {
                    if (res.status !== "failed") {  // payment success
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
                        if (res.errorStep) {
                            setError(true)
                        }
                    }
                } else { // retry verification
                    time++  // increment number of times that the operation has been performed
                    setTimeout(() => {
                        success(time)
                    }, 5000)
                }
            }).catch(error => {
                setTimeout(() => {
                    success(time)
                }, 5000)
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
            provider: process.env.REACT_APP_MOBILE_PROVIDER,
            userId: User.userId,
            parrain: User.parrain_id
        }
        if (data.promotion) storeData = { ...storeData, promotion: data.promotion, code: data.code }
        let storeResult = await sendToApi('sellcrypto/create', storeData, User.token)
        if (storeResult !== 'error') {
            setState({ ...state, start: true, id: storeData.transaction_id, time: +new Date })
        }
    }
    const cancel = async () => {
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
    const copy = (text) => {
        navigator.clipboard.writeText(text)
        toastify('info', "text copied", 3 * 1000)
    }
    const setReceiveWallet = () => {
        switch (data.crypto) {
            case "BTC":
                return process.env.REACT_APP_RECEPT_WALLET;
            case "ETH":
                return process.env.REACT_APP_ETH_RECEPT_WALLET;
            case "USDT":
                return process.env.REACT_APP_ETH_RECEPT_WALLET;
            default:
                return process.env.REACT_APP_RECEPT_WALLET;
        }
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
                    {step === 'conflict' && (
                        <div className="waiter">
                            <div className='titlewaiter'>{t('sellModal2')} </div>
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
                                        <h3 className='titleh3'>{t('sellModal4')}</h3>
                                        <div className="">
                                            <span>{t('sellModal13')} </span>  <span> {Intl.NumberFormat('fr-FR', { maximumSignificantDigits: 8 }).format(data.amount)} {data.crypto} </span>
                                        </div>
                                        <div className="">
                                            <span>{t('sellModal14')}  </span>  <span className="wallet"> {data.wallet.substr(0, 6) + '...' + data.wallet.substr(30)} </span>
                                        </div>
                                        <div className="">
                                            <span>  {t('sellModal15')}</span> <span> {Intl.NumberFormat('de-DE').format(data.xaf)} XAF </span>
                                        </div>
                                        <div className="">
                                            <span>{t('sellModal16')} </span>  <span> {data.phone} </span>
                                        </div>
                                        <div className="">
                                            <span>{t('sellModal17')} </span>  <span> {!promotion ? Intl.NumberFormat('de-DE').format(roundPrecision(data.xaf * fees + 250, 0)) : 0} XAF </span>
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
                                            {t('sellModal7')} <span className="icopy" onClick={() => copy(data.amount)} >{data.amount + " " + data.crypto +" "}</span>
                                            {t('sellModal6')} <b className="wadd" onClick={() => copy(setReceiveWallet())} ref={ref3} >{setReceiveWallet()} </b> <br />
                                            {t('sellModal8')} <br />
                                            {t('sellModal9')} <br /><br />
                                            <QRCode value={setReceiveWallet()} size={150} fgColor="#0f394c" />
                                        </p></>}
                                    <div className="op-id">
                                        {t('sellModal10')}
                                        <span onClick={() => copy(state.id)}>{state.id} <FaRegCopy size={25} /> </span>
                                    </div>
                                    {!error && (<>
                                        <h4 className="message"> {setMessage()} </h4>
                                        <div className="modal-controls">
                                            <button disabled={state.txid} onClick={cancel} >{t('sellModal11')}   </button>
                                            <button className="havesend" disabled={checking} onClick={startChecking}>{t('sellModal12')}
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