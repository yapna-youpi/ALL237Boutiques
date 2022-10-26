import React, { useState, useContext } from 'react'
import ReactInputVerificationCode from 'react-input-verification-code'
import ReactLoading from 'react-loading'
import Lottie from 'react-lottie'
import { useTranslation } from 'react-i18next'

import { sendToApi } from '../../../utils/utilFunctions'
import { toastify } from '../../addons/toast/Toast'
import animation from '../../../assets/lottie/success.json'
import { BalanceContext } from '../Cabital'

const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
}

const RenderOtp = ({ state, User, change, done }) => {
    const { t } = useTranslation();

    const [otp, setOpt] = useState("")
    const [lottie, setLottie] = useState(false)
    const [loading, setLoading] = useState(false)
    const { balance, setBalance } = useContext(BalanceContext)

    const transfert = async () => {
        setLoading(true)
        let data = { userId: User.userId, otp: otp, ...state}
        let response = await sendToApi('cabital/tranfert', data, User.token)
        setLoading(false)
        if (response.success) {
            toastify('success', `${t('renderOtp1')}`)
            setLottie(true)
            let newBalance = { ...balance, usdt: balance.usdt - state.amount }
            setBalance(newBalance)
            // done()
        } else {
            toastify("error", `${t('renderOtp2')}` )
            setOpt('')
        }

        return
    }

    console.log("the state ", state)
    return (
        <div className="otp">
            {!lottie ?
                (<>
                    <h2 className='fa2-title'>{t('renderOtp3')} </h2>
                    <p>{t('renderOtp8')}  {state.amount} {t('renderOtp4')}  </p>
                    <h3 htmlFor="otptitle lettercolor">{t('renderOtp5')}</h3>
                    <div className="otp-group ">
                        <div className='otpselect'>
                            < ReactInputVerificationCode
                                length={6}
                                value={otp}
                                onChange={(text) => setOpt(text)}
                            />
                        </div>
                        {/* <input className='otpselect' type="text" name="otp" id="otp" onChange={(e) => setOpt(e.target.value)} /> */}
                    </div>
                    <button className="btnotp" onClick={transfert}>
                        {loading ? <ReactLoading type="spin" color="#fff" width="25px" height="25px" /> : "Transfert"}
                    </button>
                </>) :
                (<div className="lottie">
                    <h3 htmlFor="otptitle lettercolor">{t('renderOtp6')} </h3>
                    <Lottie
                        options={defaultOptions}
                        height={200}
                        width={200}
                        speed={0.5}
                    />
                    <button className="btnotp" onClick={done}>
                    {t('renderOtp7')}
                    </button>
                </div>)
            }
        </div>
    )
}

export default RenderOtp