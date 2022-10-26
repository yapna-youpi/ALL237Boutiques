import React, { useState } from 'react'
import { AiFillWarning } from 'react-icons/ai'
import { MdOutlineHelpCenter } from 'react-icons/md'
import ReactLoading from 'react-loading'
import Modal from 'react-responsive-modal'
import Tooltip, { tooltipClasses } from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next'

import { sendToApi } from '../../../../utils/utilFunctions'
import { toastify } from '../../../addons/toast/Toast'
import KycMatch from './KycMatch'
import Slider from '../../slider/Slider'

let interval = null

function Unlinked({ data, User, setReady }) {
    const { t } = useTranslation();
    const [steps, setSteps] = useState(data)
    // const [matched, setMatched] = useState({ modal: true, button: false })
    const [started, setStarted] = useState(false)
    const [loading, setLoading] = useState('')
    const [module, setModule] = useState(false)

    // const classes = useStyles();
    const longText = `${t("helpCabital")} `

    const startProcess = async () => {
        setLoading('button')
        setStarted(true)
        window.open(steps.firstLink)
        interval = setInterval(async () => {
            let status = await getLinkStatus()
            if (!status.success) return
            // console.log("the status ", status)
            status = {
                linked: status.link_status === "LINKED",
                otp: status.otp_ready,
                kyc: status.kyc_status === 3,
                // ready: status.account_status === "MATCHED" || "CREATED"
            }
            let ready = status.linked && status.otp && status.kyc
            if (ready) {
                setSteps({ ...steps, ...status })
                setLoading('')
                clearInterval(interval)
                setReady()
                return
            } else setSteps({ ...steps, ...status })
        }, 10*1000)
    }
    const getLinkStatus = async () => {
        return await sendToApi('cabital/linkstatus', { userId: User.userId }, User.token)
    }
    const putLoader = (position) => loading === position
    // const closeModal = () => {
    //     clearInterval(interval)
    //     setMatched({ modal: false, button: true })
    //     setLoading('')
    // }
    // const startKycMatch = () => setMatched({ ...matched, modal: true })
    const start = () => {
        setModule(!module)
        startProcess()
    }

    return (
        <div className="unlinked">
            <div className="connecter">
                <div className="alert">
                    <AiFillWarning size={25} /> &ensp;
                    <p>
                        {t('unlinked1')} 
                    </p>
                </div>
                {/* <Box >
                    <Tooltip title={longText} placement="top" arrow>
                        <span onClick={() => setModule(!module)} ><MdOutlineHelpCenter size={35} /></span>
                    </Tooltip>
                </Box> */}

            </div>
            <div className="cabital-controls">
                <button className='btnconn' onClick={() => setModule(!module)}>
                    {putLoader('button') ? <ReactLoading type="spin" color="#fff" width="30px" height="30px" />
                        : "Connect with Cabital"}
                </button>
                <div className="cabital-info">
                    <div className="cabital-step">
                        <span>1. {t('unlinked2')} </span>
                        {started && <span>{steps.linked ? t('unlinked5') : t('unlinked6')}</span>}
                    </div>
                    <div className="cabital-step">
                        <span>2. {t('unlinked3')}</span>
                        {started && <span>{steps.kyc ? t('unlinked5') : t('unlinked6') }</span>}
                    </div>
                    <div className="cabital-step">
                        <span>3. {t('unlinked4')}</span>
                        {started && <span>{steps.otp ? t('unlinked5') : t('unlinked6') }</span>}
                    </div>
                    {/* <div className="cabital-step">
                        <span>4. You need to confirm information for KYC match</span>
                        {started && <span>{steps.ready ? "completed" :
                            steps.kyc ? <button onClick={startKycMatch}>process kyc match</button> : "waiting ..."}
                        </span>}
                    </div> */}
                </div>
            </div>
            {/* {steps.kyc && matched.modal && <Modal open={true} onClose={closeModal} closeOnOverlayClick={false}>
                <KycMatch matched={setReady} User={User} />
            </Modal>} */}
            {module && <Modal open={true} onClose={() => setModule(!module)} closeOnOverlayClick={false}>
                <Slider start={start} />
            </Modal>}
        </div>
    )
}

export default Unlinked