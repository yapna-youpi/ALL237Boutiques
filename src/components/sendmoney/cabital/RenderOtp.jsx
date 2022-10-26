import React, { useState } from 'react';
import { MdKeyboardBackspace } from 'react-icons/md';
import ReactInputVerificationCode from 'react-input-verification-code'
import ReactLoading from 'react-loading'
import { sendToApi } from '../../../utils/utilFunctions'
import { toastify } from '../../addons/toast/Toast'
import Lottie from 'react-lottie'
import animation from '../../../assets/lottie/success.json'
import { useTranslation } from 'react-i18next';

const RenderOtp = ({ state, amount, User, change, done }) => {
    const { t } = useTranslation()

    const [otp, setOpt] = useState("")
    const [lottie, setLottie] = useState(false)
    const [loading, setLoading] = useState(false)

    const transfert = async () => {
        setLoading(true)
        // console.log("the otp code ", otp)
        // console.log("operation data ", state)
        let data = {
            userId: User.userId, amount: amount, otp: otp, fiat_pay: state.fiat_pay,
            transaction_id: state.transaction_id, phone: state.phone
        }
        let response = await sendToApi('cabital/tranfert', data, User.token)
        setLoading(false)
        if (response.success) {
            setLottie(!lottie)
            toastify('success', 'transfert made')
        } else toastify("error", "transfert fail \n please retry", 8000)
        return
    }

    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: animation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }

    // console.log("the state ", state)
    return (
        <div className="otp">

            {!lottie ?
                (<>
                    <h2 className='fa2-title'>{t('renderOtp3')} </h2>
                    <p>{t('renderOtp8')}  {state.amount} {t('renderOtp4')}  </p>
                    <h3 htmlFor="otptitle lettercolor">{t('renderOtp5')}</h3>
                    <div className="otp-group ">
                        < ReactInputVerificationCode
                            length={6}
                            value={otp}
                            onChange={(text) => setOpt(text)}
                        />
                        {/* <input className='otpselect' type="text" name="otp" id="otp" onChange={(e) => setOpt(e.target.value)} /> */}
                    </div>
                    <button className="btnotp" onClick={transfert}>
                        {loading ? <ReactLoading type="spin" color="#fff" width="25px" height="25px" /> : "Transfert"}
                    </button>
                </>)
                :

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