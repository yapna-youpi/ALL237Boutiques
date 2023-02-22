import React, { useState, useEffect } from 'react'
import SumsubWebSdk from '@sumsub/websdk-react'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { sendToApi } from '../../utils/utilFunctions'
import { setUser } from '../../store/actions'

import './sumsub.css'
import kyc from './vendre_ses_cryptomonnaies_en_devises_euro_dollards.png'

// customise the widget
const widgetOptions = {
    "desc": "first customization",
    "target": "websdk",
    "type": "standalone",
    "uiConf": {
        "steps": {
            "STATUS": {},
            "APPLICANT_REQUEST": {},
            "REVIEW": {},
            "CREATE_APPLICANT": {}
        },
        "customCss": "custo1 css",
        "customCssStr": ".sumsub-logo {\ndisplay: none;\n}",
        "allowUploadAllFileFormats": false
    },
    "navConf": {
        "showWarningScreen": false,
        "skipWelcomeScreen": false,
        "showWelcomeScreen": false,
        "skipAgreementsScreen": true,
        "skipReviewScreen": true,
        "forceMobile": false,
        "disableContinuingOnMobile": false
    },
    "createdBy": "fezeu@ipercash.fr",
    "respectApplicantLevel": false
}

function Sumsub({ User, dispatch, call, close }) {
    const { t } = useTranslation()
    const [token, setToken] = useState("")
    useEffect(async () => {
        let tok = await updateToken()
        setToken(tok)
        return () => {

        }
    }, [])

    const [show, setShow] = useState(true);

    const messageHandler = (message, data) => {
        switch (message) {
            case "idCheck.onStepInitiated": // commence une etape
                break;
            case "idCheck.stepCompleted":
                break;
            case "idCheck.onResize":    // le composant a ete redimmensione
                break;
            case "idCheck.livenessCompleted":
                break;
            case "idCheck.onApplicantSubmitted":
                break;
            case "idCheck.applicantStatus":
                sendToApi('sumsub/status', User, User.token)
                    .then(data => {
                        if (data !== 'error')
                            data.applicantStatus ? handleKyc() : console.log("not pass")
                        else console.log("error")
                    })
                break;

            default:

                break;
        }
    }
    const errorHandler = () => "";
    // get a new token when current is exprired
    const updateToken = async () => {
        let data, witness = true, i = 0
        do {
            data = await sendToApi('sumsub/token', User, User.token).then(data => data)
            // console.log("the token",data)
            if (data.userId !== "undefined") witness = false
            i++
            
        } while (witness && i <= 2)
        if (witness || data.status === false) close()
        else return data.token
    }
    const handleKyc = () => {
        dispatch(setUser({ ...User, kyc: true }))
        call()
    }
    return (
        <div id="sumsub" className="sumsub">
            {show ? (<div className='sub-text'>
                <img src={kyc} className="img-sumsub" alt="faire vente des devises en cryptomonnaies" />
                <div className='sub-div1'>{t('sumsub1')}</div>
                <div className='sub-div2'>{t('sumsub2')}</div>
                <button className='btn-sub' onClick={() => setShow(!show)} style={{ color: '#cc1616' }}>{t('sumsub3')}</button>
            </div>)
                : ((token && !show) ? (<SumsubWebSdk
                    accessToken={token}
                    expirationHandler={() => token}
                    config={widgetOptions}
                    // options={widgetOptions}
                    onMessage={message => messageHandler(message)}
                    onError={errorHandler}
                    onInitialized={(data =>{} )}
                    // onActionSubmitted={submit}
                />) : '')
            }
        </div>
    )
}

const mapStateToProps = state => ({ User: state.userReducer.user })

export default connect(mapStateToProps)(Sumsub)
