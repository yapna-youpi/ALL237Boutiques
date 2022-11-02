import React, { useState, useEffect } from 'react'
import { Modal } from 'react-responsive-modal'
import ReactLoading from 'react-loading'
import { toastify } from '../addons/toast/Toast'

import RenderInfo from './cabital/RenderInfo'
import RenderLinking from './cabital/RenderLinking'
import RenderOtp from './cabital/RenderOtp'
import RenderKycMatch from './cabital/RenderKycMatch'

// import Slide from "../addons/slider/Slider" 


import { randomId, randomChain, roundPrecision, apiUrl, sendToApi } from '../../utils/utilFunctions'
import Depart from './cabital/Depart'
import Solde from './cabital/Solde'
import Ready from './cabital/Ready'


const fakeId = "811e0405e5f2"

const EUR = 655


const CabitalModal = ({ User, state, close, type }) => {
    const [cabital, setCabital] = useState({ start: true, info: {}, kyc: true, match: false, opt: false, card: false })
    const [linkink, setLinking] = useState({ link: "", step: 0 })
    const [method, setMethod] = React.useState("")

    // console.log("User ", User)
    // cabital process
    const startCabital = async () => {
        let params = {
            "transaction_id": randomId('C'),
            "userId": User.userId,
            "phone": state.phone, "name": state.name, "email": User.userEmail,
            "fiat_pay": Math.floor(EUR * state.amount),
            "initial_amount": state.amount
        }
        let init = await sendToApi('cabital/init', params, User.token)
        // console.log("the init response ", init)
        if (!init.success) {
            // setCabital({ ...cabital, start: false })
            close()
            return toastify("error", "there is an error")
        }
        if (init.ready) {
            setCabital({
                ...cabital, ready: init.ready, start: false, match: init.match,
                kyc: init.kyc, info: { info: true, ...init.info.meta }, balance: init.balance
            })
            // if (method === "credit") cardPayment(state)
            // if(method==="sepa") setCabital({ ...cabital, start: false, kyc: init.kyc, match: init.match, info: { info: true, ...init.info.meta } })
            // cardPayment(state)
            // alert('user is ready')
        }
        else {
            setCabital({ ...cabital, start: false, kyc: init.kyc, match: init.match })
            setLinking({ ...linkink, firstLink: init.firstLink })
            // alert('user is not ready')
        }
        return
    }
    const getLinkStatus = async (userId) => {
        // console.log("the User ", User)
        let params = {
            userId: userId,
        }
        return await sendToApi('cabital/linkstatus', params, User.token)
    }
    const startRegistering = async () => {
        window.open(linkink.firstLink, '_blank')
        setLinking({ ...linkink, step: 1 })
        let interval = setInterval(async () => {
            let status = await getLinkStatus(User.userId)
            // console.log("the status ", status)
            if (!status.success) {
                // console.log("status at false ", status)
                return
            }
            if (status.otp_ready) {
                setCabital({ ...cabital, kyc: true })
                startCabital()
                clearInterval(interval)
                return
            }
            if (status.kyc_status === 3) return setLinking({ ...linkink, step: 3 })
            if (status.link_status === "LINKED") return setLinking({ ...linkink, step: 2 })
            // console.log("we reach the end of this function")
        }, 30 * 1000)
    }
    const matchAccount = async (data) => {
        // console.log("the data", data)
        let response = await sendToApi('cabital/kycmatch', { ...data, userId: User.userId }, User.token)
        // console.log("the response of matching ", response)
        response.response ? startCabital() : toastify("account not matched")
    }
    // console.log("the state ", state)
    return (
        <div className='cabitalmodal'>
            <Modal open={true} onClose={close} closeOnOverlayClick={false}>
                <center>
                    {cabital.start ?
                        <Depart startCabital={startCabital} />
                        :
                        <div className="cabitalcontent">
                            {/* <h3 className='titlecolor'>SIMULATE CABITAL PROCESS</h3> */}
                            {!cabital.kyc && <RenderLinking linkink={linkink} startRegistering={startRegistering} />}
                            {!cabital.match && cabital.kyc && <RenderKycMatch match={matchAccount} />}
                            {cabital.ready && <Ready data={state} cabital={cabital} type={type} close={close} />}
                            {/* {cabital.info.info && <RenderInfo state={state} cabital={cabital} method={method}
                                setCabital={setCabital} sentToApi={sendToApi} User={User} EUR={EUR}
                            />}
                            {cabital.otp && <RenderOtp state={state} User={User} sentToApi={sendToApi} />} */}
                        </div>
                    }
                </center>
            </Modal>
        </div>
    )
}



export default CabitalModal