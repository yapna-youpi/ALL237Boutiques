import React, {useState, useEffect} from 'react'
import SumsubWebSdk from '@sumsub/websdk-react'
import { connect } from 'react-redux'
import ReactLoading from 'react-loading'

import { sendToApi } from '../../utils/utilFunctions'
import { setUser } from '../../store/actions'

import './sumsub.css'

// customise the widget
const widgetOptions={
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

function Sumsub({User, dispatch, call, close}) {
    const [token, setToken]=useState("")
    useEffect(async () => {
        let tok=await updateToken()
        setToken(tok)
        return () => {
            
        }
    }, [])

    const [show, setShow] = useState(false);

    const messageHandler=(message, data)=>{
        switch (message) {
            case "idCheck.onStepInitiated": // commence une etape
                console.log("l'utilisateur a commence")
                break;
            case "idCheck.stepCompleted":
                console.log("l'utilisateur a termine une etape ", data)
                break;
            case "idCheck.onResize":    // le composant a ete redimmensione
                console.log("le widget a ete redimensione")
                break;
            case "idCheck.livenessCompleted":
                console.log("l'utilisateur a termine avec le selfie")
                break;
            case "idCheck.onApplicantSubmitted":
                console.log("l'utilisateur a soumis les documents")
                // call()
                break;
            case "idCheck.applicantStatus":
                console.log("le status de l'utilisateur a change", data)
                sendToApi('sumsub/status', User, User.token)
                    .then(data=>{
                        if(data!=='error')
                            data.applicantStatus ? handleKyc() : console.log("not pass")
                        else console.log("error")
                    })
                // call()
                break;
            
            default:
                console.log("cas non gere ", message)
                break;
        }
    }
    const errorHandler=()=>console.log("an error is occur")
    // get a new token when current is exprired
    const updateToken=async()=>{
        let data, witness=true, i=0
        do {
            data=await sendToApi('sumsub/token', User, User.token).then(data=>data)
            // console.log("the token",data)
            if(data.userId!=="undefined") witness=false
            i++
            console.log(i)
        } while (witness && i<=2)
        if(witness || data.status===false) close()
        else return data.token
    }
    const handleKyc=()=>{
        dispatch(setUser({...User, kyc: true}))
        call()
    }
    return (
        <div id="sumsub" className="sumsub">
            {/* <div id="sumsub-websdk-container"></div> */}
            <div className='sub-text'>
                <div className='sub-div1'>Pour la sécurité de vos transactions, uniquement lors de votre première opération vous serez identifié par votre carte d’identité ou votre passeport et effectuerez une reconnaissance faciale.</div>
                <div  className='sub-div2'> Cette procédure est imposée par la politique internationale contre le terrorisme et le blanchiment d’argent.</div>
                {/* <p>For the security of your transactions, only at the time of your first transaction you will be identified by your identity card or passport and will perform a facial recognition. This procedure is imposed by the international policy against terrorism and money laundering.</p> */}
            </div>
            { token  ? (<SumsubWebSdk
                accessToken={token}
                expirationHandler={()=>token}
                config={widgetOptions}
                // options={widgetOptions}
                onMessage={message=>messageHandler(message)}
                onError={errorHandler}
                onInitialized={(data=>console.log("onInitialized ", data))}
                // onActionSubmitted={submit}
            />): ''
            // ( <div className="loader"><ReactLoading type="spin" color='#CC1616' height={100} width={100} /></div> )
            }
        </div>
    )
}

const mapStateToProps=state=>({User: state.userReducer.user})

export default connect(mapStateToProps)(Sumsub)
