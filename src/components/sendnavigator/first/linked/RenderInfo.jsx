import React, { useState, useEffect } from "react"
// import { MdKeyboardBackspace } from "react-icons/md"
import ReactLoading from 'react-loading'
import { useTranslation } from 'react-i18next'

import { roundPrecision, sendToApi } from "../../../../utils/utilFunctions"
import { toastify } from '../../../addons/toast/Toast'

import { FaRegCopy } from 'react-icons/fa'
import { AiFillWarning } from "react-icons/ai"


const RenderInfo = ({ state, info, method, User, end }) => {
    const { t } = useTranslation()

    const [load, setLoader] = useState(false)
    useEffect(() => {
        method === "card" && cardPayment(state)

    }, [])

    const cardPayment = async (data) => {
        setLoader(true)
        let response = await sendToApi('cabital/cardpayment', { ...data, userId: User.userId }, User.token)
        setLoader(false)
        if (response.success) {
            window.open(response.link)
            return true
        }
        else {
            toastify('error', 'failded to open widget for mayment')
            return false
        }
    }
    const getDepositStatus = async () => {
        setLoader(true)
        let params = { ...state, userId: User.userId }
        let response = await sendToApi('cabital/getdepositstatus', params, User.token)
        // let response = { success: true, conversion: true, amount: 24.7854 }
        if (response.success && response.conversion) {
            let { balance } = await sendToApi('cabital/getbalance', params, User.token)
            toastify('success', `${state.amount} EUR have been converted to ${roundPrecision(response.amount, 3)} USDT successfully`, 8000)
            setLoader(false)
            end(balance)
            // console.log("la precision",roundPrecision(response.amount, 3))
        } else {
            setLoader(false)
            toastify("error", "Convertion fail please try again")
        }
    }
   

    const checkCardBuy = async () => {
        setLoader(true)
        let params = { ...state, userId: User.userId }
        let { balance } = await sendToApi('cabital/getbalance', params, User.token)
        setLoader(false)
        if (!balance) return toastify('error', 'there is an error please try again')
        if (balance.USDT >= 0) {
            end(balance)
            // toastify('success', "purchase success")
        }
        else toastify('error', "Your USDT balance doesn't not have enough funds")
    }

    const copy = (text) => {
        navigator.clipboard.writeText(text)
        toastify('info', 'copied', 2000)
    }


    const Bank = () => {
        return (
            <>
                {
                    info.account_name ?
                        <div className="mt-info">
                            <h3 className="lettercolor">{t('renderInfo1')} </h3>
                            <div className="textinfo">
                                <p className="p-left">{t('renderInfo2')}</p>
                                <span className="ligCopy" onClick={() => copy(info.account_name)}><p className="p-right">{info.account_name}</p>&ensp;<FaRegCopy size={25} /></span>
                            </div><hr />
                            <div className="textinfo">
                                <p className="p-left">{t('renderInfo3')}</p>
                                <span className="ligCopy" onClick={() => copy(info.iban)}> <p className="p-right">{info.iban}</p>&ensp;<FaRegCopy size={25} /></span>
                            </div><hr />
                            <div className="textinfo">
                                <p className="p-left">{t('renderInfo4')}</p>
                                <span className="ligCopy" onClick={() => copy(info.bank_address)}> <p className="p-right">{info.bank_address}</p>&ensp;<FaRegCopy size={25} /></span>
                            </div><hr />
                            <div className="textinfo">
                                <p className="p-left">{t('renderInfo5')}</p>
                                <span className="ligCopy" onClick={() => copy(info.bank_country)}> <p className="p-right">{info.bank_country}</p>&ensp;<FaRegCopy size={25} /></span>
                            </div><hr />
                            <div className="textinfo">
                                <p className="p-left">{t('renderInfo6')} </p>
                                <span className="ligCopy" onClick={() => copy(info.bank_name)}><div className="p-right">{info.bank_name}</div>&ensp;<FaRegCopy size={25} /></span>
                            </div><hr />
                            <div className="textinfo">
                                <p className="p-left">{t('renderInfo7')} </p>
                                <span className="ligCopy" onClick={() => copy(info.bic)}> <p className="p-right">{info.bic}</p>&ensp;<FaRegCopy size={25} /></span>
                            </div><hr />
                            <div className="textinfo">
                                <p className="p-left">{t('renderInfo8')}</p>
                                <span className="ligCopy" onClick={() => copy(info.ref_code)}> <p className="p-right">{info.ref_code}</p>&ensp;<FaRegCopy size={25} /></span>
                            </div><hr />
                            <div className="info-warning">
                                <AiFillWarning size={40} />
                                {t('renderInfo9')}
                            </div>
                            <button className="btnkyc" onClick={getDepositStatus}>
                                {load ? <ReactLoading type="spin" color="#fff" width="25px" height="25px" /> : "Deposit made"}
                            </button>
                        </div> :
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
                <h2 className="letteruncolor">{t('renderInfo11')}  </h2>
                <hr />
                <button className="btnkyc" onClick={checkCardBuy}>
                    {load ? <ReactLoading type="spin" color="#fff" width="25px" height="25px" /> : "Purchase done"}
                </button>
            </div>
        )
    }
    return (
        <div className="RenderInfo lettercolor">
            {method === "sepa" ? <Bank /> : <Credit />}
        </div>
    )
}

export default RenderInfo