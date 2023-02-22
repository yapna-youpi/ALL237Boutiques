import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import ReactLoading from 'react-loading'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import StepContent from '@material-ui/core/StepContent'
import { FaCheck, FaRegCopy } from 'react-icons/fa'
import { MdError } from 'react-icons/md'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next';

import './pay.css'
import Cinet from '../cinet/Cinet'

import buyCinet from './buyCinet'
import { cashIn } from '../../intouch/api';
import { randomId, checkServiceId, sendToApi, cutChain } from '../../utils/utilFunctions';

import mobile from './assets/acheter_bitcoin_usdt_ethereum_moin_cher.svg'

function Pay({ User }) {
    const { t } = useTranslation();
    const [step, setStep] = useState({ step: 0, url: "" })
    const [trace, setTrace] = useState({ status: false, error: null, traceStep: 0, backFund: false, mobilePaid: false })
    const [params, setParams] = useState(JSON.parse(sessionStorage.getItem('data')))
    const [cinet, setCinet] = useState(false)
    let history = useHistory()
    let ref = React.createRef()
    useEffect(() => {
        let data = JSON.parse(sessionStorage.getItem('data'))
        data ? start(data) : history.push("/buycrypto/mobile")
        sessionStorage.removeItem("data")
        return ()=>{
            closeCinet()
        }
    }, [])

    const storeData = async (data) => {
        let params = {
            transaction_id: data.id,
            cryptoCurency: data.crypto,
            amountCrypto: data.amount,
            amountFiat: data.xaf,
            rate: data.rate,
            phone: data.number,
            wallet: data.wallet,
            status: 'init',
            provider: 'cinetpay',
            userId: User.userId,
        }
        let result = await sendToApi('buymobile/settransaction', params, User.token)
    }
    const success = async (data) => {
        // success function 
        let params = {
            transaction_id: data.id,
            txid: data.txid,
            status: 'complete',
            userId: User.userId,
        }
        sendToApi('buymobile/updatetransaction', params, User.token)
            .then(data => {
                if (!data.success) createAgain(params)
            })
        let pm = {
            operation: 'Buy Crypto',
            id: data.id,
            amount: data.xaf,
            phone: data.number,
            hash: data.txid
        }
        sessionStorage.setItem('data', JSON.stringify(pm))
        history.push('/complete')
    }
    const start = (data) => {
        storeData(data)
        buyCinet(data, User, changeStep, cashout, closeCinet, cancel, (txid) => success({ ...data, txid: txid }))
    }
    const cancel = (data, i) => {
        i===1 && closeCinet()
        let witness = i > 1
        setTrace({ status: true, error: data, traceStep: i, backFund: witness, mobilePaid: false })
        
        if (false) backFunds(data, i, witness) // here: set witness to condition
        else {
            sendToApi('buymobile/updatetransaction', { transaction_id: params.id, status: 'fail', errorStep: 1, userId: User.userId }, User.token)
                .then(data => {
                    if (!data.success) createAgain({ transaction_id: params.id, status: 'fail', errorStep: 1, userId: User.userId })
                })
        }
    }
    const changeStep = (i, text) => {
        text ? setStep({ step: i, url: text }) : setStep({ ...step, step: i })
    }
    const setIcon = (i, num) => {
        if (i < num) return null
        else if (i == num) return <ReactLoading type="spinningBubbles" color='#CC1616' height={50} width={50} />
        else return <FaCheck size={50} color="#CC1616" />
    }
    const backFunds = (err, i, witness) => {
        alert("should send back funds")
        return // here: set this process
        let data = {
            partner_id: randomId(),
            amount: params.xaf,
            number: params.number,
            service: checkServiceId(params.number)
        }
        cashIn(data, User.token).then(result => {
            let payload = {
                transaction_id: params.id,
                status: 'fail',
                errorStep: 4,
                backFundsId: data.partner_id
            }
            if (result) {
                setTrace({ status: true, error: err, traceStep: i, backFund: witness, mobilePaid: true })
                sendToApi('buymobile/updatetransaction', { ...payload, backFunds: true, userId: User.userId }, User.token)
                    .then(data => {
                        if (!data.success)
                            createAgain({ ...payload, backFunds: true, userId: User.userId })
                    })
            }
            else {
                sendToApi('buymobile/updatetransaction', { ...payload, backFunds: false, userId: User.userId }, User.token)
                    .then(data => {
                        if (!data.success)
                            createAgain({ ...payload, backFunds: false, userId: User.userId })
                    })
            }
        })
        return
    }
    const createAgain = async (data) => {
        let params2 = {
            ...data,
            cryptoCurency: params.crypto,
            amountCrypto: params.amount,
            amountFiat: params.xaf,
            rate: params.rate,
            phone: params.number,
            wallet: params.wallet,
        }
        sendToApi('buymobile/settransaction', params2, User.token)
    }
    const copy = () => {
        if (ref) {
            ref.current.select()
            document.execCommand('copy')
        }
    }
    const cashout = () => {
        setCinet(true)
    }
    const closeCinet = () => {
        let cinetModal, page, scpt
        cinetModal = document.querySelector('.cp-modal')
        page = document.querySelector('#page')
        scpt = document.querySelector('#cinet-script')
        if (cinetModal) {
            scpt.parentNode.removeChild(scpt)
            cinetModal.parentNode.removeChild(cinetModal)
        }
        setCinet(false)
        // cancel({ status: 'fail', cause: "payment demand has fail", cn: 8 }, 1)
    }

    return trace.status ? (
        <div className="pay" >
            <div className="error">
                <div className="">
                    <MdError size={150} color="#CC1616" />
                </div>
                <div className="">
                    <h2> {t('buyCryptoError' + trace.error.cn)} </h2>
                    <h3>  </h3>
                    <p>{t('payTitle')}</p>
                </div>
                <p>
                    {/* {trace.backFund ? backFunds() : (null)} */}
                    {trace.backFund && <h3 className="backfunds" >{t('paySous1')}  &ensp; &ensp; {
                        trace.mobilePaid ? <FaCheck size={20} color="#CC1616" />
                            : <ReactLoading type="spinningBubbles" color='#CC1616' height={20} width={20} />
                    } </h3>}
                </p>
            </div>
        </div>
    ) : (
        <div className="pay">
            {params && <div className="operation-id">
                {t('paySous2')}
                <h3>
                    <span className="deco"></span>
                    <input ref={ref} value={params.id} className="iid" onClick={copy} contentEditable={false} /><FaRegCopy onClick={copy} size={25} />
                    <span className="deco"></span>
                </h3>
                {t('paySous3')}
            </div>}
            <div className="transaction">
                <div className="modal-head">
                    {t('paySous4')}
                </div>
                <div className="content-modal">
                    <Stepper orientation='vertical' activeStep={step.step}>
                        <Step>
                            <StepLabel icon={<span className="icon-step" >1</span>}>
                                <h2>{t('paySous5')}{setIcon(step.step, 0)} </h2>
                            </StepLabel>
                            <StepContent>
                                <div className="">
                                    &raquo;{t('paySous6')}
                                </div> <br />
                                <div className="">
                                    &raquo;{t('paySous7')}
                                </div>
                            </StepContent>
                        </Step>
                        <Step>
                            <StepLabel icon={<span className="icon-step" >2</span>}>
                                <h2>{t('paySous8')} {setIcon(step.step, 1)} </h2>
                            </StepLabel>
                            <StepContent>
                                <h3>{t('paySous9')}  </h3>
                                {/* <div className="phone-step">
                                    <img src={mobile} alt="mobile" />
                                </div> */}
                                <h4>{t('paySous10')} </h4>
                                {step.url && <h4>{t('paySous11')} <a href={step.url} target="_blank" >{cutChain(step.url, 10, 111)}</a>{t('paySous12')} </h4>}
                            </StepContent>
                        </Step>
                        <Step>
                            <StepLabel icon={<span className="icon-step" >3</span>}>
                                <h2>{t('paySous13')} {setIcon(step.step, 2)} </h2>
                            </StepLabel>
                        </Step>
                        <Step>
                            <StepLabel icon={<span className="icon-step" >4</span>}>
                                <h2>{t('paySous14')} {setIcon(step.step, 3)} </h2>
                            </StepLabel>
                        </Step>
                    </Stepper>
                </div>
            </div>
            {cinet ? <Cinet data={params} close={closeCinet} cancel={cancel} /> : ""}
        </div>
    )
}

const mapStateToProps = state => ({ User: state.userReducer.user })

export default connect(mapStateToProps)(Pay)
