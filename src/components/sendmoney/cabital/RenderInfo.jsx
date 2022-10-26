import React, { useState } from "react"
import { MdKeyboardBackspace } from "react-icons/md"
import ReactLoading from 'react-loading'
import { useTranslation } from "react-i18next"

import { roundPrecision, sendToApi } from "../../../utils/utilFunctions"
import { toastify } from '../../addons/toast/Toast'

import "./cabital.css"
import { FaRegCopy } from 'react-icons/fa'
import { AiFillWarning } from "react-icons/ai"

const RenderInfo = ({ state, cabital, method, User, EUR, setCabital, change }) => {
    const { t } = useTranslation()

    const [load, setLoader] = useState(false)

    const getDepositStatus = async () => {
        setLoader(true)
        let params = { ...state, userId: User.userId }
        let response = await sendToApi('cabital/getdepositstatus', params, User.token)
        // let response={success: true, conversion: true, amount: 24.7854}
        setLoader(false)
        // console.log("the response ", response)
        if (response.success && response.conversion) {
            toastify('success', `${state.amount} EUR have been converted to ${roundPrecision(response.amount, 3)} USDT`, 8000)
            // window.alert(`transfert effectue : ${response.deposit}`)
            // setCabital({ ...cabital, info: {}, otp: true })
            change({ info: false, otp: true, amount: roundPrecision(response.amount, 2) })
            // setLinking({ ...linkink, info: {} })
        } else toastify("error", "Convertion fail please try again")  // window.alert(`aucun transfert detecte `)
    }
    //sript for copy value
    const copy = (text) => {
        navigator.clipboard.writeText(text)
        toastify('info', 'copied', 2000)
    }
    // const copy = (e) => {
    //     navigator.clipboard.writeText(e.target.innerHTML)
    // console.log('la valeur du paragraph',e.target.innerHTML)
    // }

    const checkCardBuy = async () => {
        setLoader(true)
        let params = { ...state, userId: User.userId }
        let { balance } = await sendToApi('cabital/getbalance', params, User.token)
        setLoader(false)
        if (!balance) return toastify('error', 'there is an error please try again')
        if (balance.USDT >= state.amount) return change({ info: false, otp: true })
        else toastify('error', "Your USDT balance doesn't not have enough funds")
    }

    const Bank = () => {
        return (
            <>
                {
                    cabital.info.account_name ?
                        <div className="mt-info">
                            <h3 className="lettercolor">{t('renderInfo1')} </h3>
                            <div className="textinfo">
                                <p className="p-left">{t('renderInfo2')}</p>
                                <span className="ligCopy" onClick={() => copy(cabital.info.account_name)}><p className="p-right">{cabital.info.account_name}</p>&ensp;<FaRegCopy size={25} /></span>
                            </div><hr />
                            <div className="textinfo">
                                <p className="p-left">{t('renderInfo3')}</p>
                                <span className="ligCopy" onClick={() => copy(cabital.info.iban)}> <p className="p-right">{cabital.info.iban}</p>&ensp;<FaRegCopy size={25} /></span>
                            </div><hr />
                            <div className="textinfo">
                                <p className="p-left">{t('renderInfo4')}</p>
                                <span className="ligCopy" onClick={() => copy(cabital.info.bank_address)}> <p className="p-right">{cabital.info.bank_address}</p>&ensp;<FaRegCopy size={25} /></span>
                            </div><hr />
                            <div className="textinfo">
                                <p className="p-left">{t('renderInfo5')}</p>
                                <span className="ligCopy" onClick={() => copy(cabital.info.bank_country)}> <p className="p-right">{cabital.info.bank_country}</p>&ensp;<FaRegCopy size={25} /></span>
                            </div><hr />
                            <div className="textinfo">
                                <p className="p-left">{t('renderInfo6')} </p>
                                <span className="ligCopy" onClick={() => copy(cabital.info.bank_name)}><div className="p-right">{cabital.info.bank_name}</div>&ensp;<FaRegCopy size={25} /></span>
                            </div><hr />
                            <div className="textinfo">
                                <p className="p-left">{t('renderInfo7')} </p>
                                <span className="ligCopy" onClick={() => copy(cabital.info.bic)}> <p className="p-right">{cabital.info.bic}</p>&ensp;<FaRegCopy size={25} /></span>
                            </div><hr />
                            <div className="textinfo">
                                <p className="p-left">{t('renderInfo8')}</p>
                                <span className="ligCopy" onClick={() => copy(cabital.info.ref_code)}> <p className="p-right">{cabital.info.ref_code}</p>&ensp;<FaRegCopy size={25} /></span>
                            </div><hr />
                            <div className="textinfo">
                                <p className="p-left">Amount :</p>
                                <span className="ligCopy"> <p className="p-right">{parseInt(state.amount) + parseInt(state.fees)} EUR</p></span>
                            </div><hr />
                            <div className="info-warning">
                                <AiFillWarning size={40} />
                                {t('renderInfo9')}
                            </div>
                            <button className="btnkyc" onClick={getDepositStatus}>
                                {load ? <ReactLoading type="spin" color="#fff" width="25px" height="25px" /> : "Deposit made"}
                            </button>
                        </div>
                        :
                        <>
                            <h3 className="lettercolor">{t('renderInfo10')}</h3>
                            <button className="btnkyc">
                                {load ? <ReactLoading type="spin" color="#fff" width="25px" height="25px" /> : "Retry"}
                            </button>
                        </>
                }
            </>
        )
    }

    const Credit = () => {
        return (
            <div>
                <h2 className="letteruncolor">Proccess purchase on the widget </h2>
                <hr />
                <button className="btnkyc" onClick={checkCardBuy}>
                    {load ? <ReactLoading type="spin" color="#fff" width="25px" height="25px" /> : "Deposit made"}
                </button>
            </div>
        )
    }
    // console.log("the method ", method)   
    return (
        <div className="RenderInfo lettercolor">
            <div className='backyc' onClick={() => change({ payment: true, info: false })}><MdKeyboardBackspace size={25} /></div>
            {method === "sepa" ? <Bank /> : <Credit />}
        </div>
    )
}

export default RenderInfo