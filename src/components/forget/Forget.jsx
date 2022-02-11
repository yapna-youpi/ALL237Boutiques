import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import ReactLoading from 'react-loading';
import { useHistory } from 'react-router-dom'

import { Input } from '../addons/input/Input'
import { checkEmail, sendToApi } from '../../utils/utilFunctions'
import Button from '@material-ui/core/Button'
import { toastify } from '../addons/toast/Toast'

import styled from  './forget.css'
// import toast from "react-hot-toast"
// import { CgOculus } from "react-icons/cg"

const Forget =({type, color}) => {
    const { t } = useTranslation();
    let history = useHistory();

    const [state,setState] = useState('');
    const [ring, setRing] = useState(false);
    const [loader, setLoader] = useState(false);
    const [show, setShow] = useState(false);

    const onChange =  target =>{
        setState(target.value)
        setRing(!checkEmail(state))
    }

    const handleSubmit = e => {
        e.preventDefault();
        setLoader(true); 
        sendToApi('user/lost',{email:state})
            .then(data => {
                setLoader(false);
                if(data.error) {
                    toastify('error','user not found')
                    return
                }
                if(data.mail){
                    toastify('success',`reset email has sent to ${state}`)
                    // return history.push('/Reset')
                    if(data.mail){
                        setShow(!show)
                    }
                } else {
                    toastify('info', `user found but mail can't be send retry`)
                }
                if(!data.user){
                }
            }) 
    }
    const resend=()=>{
        console.log("user data ", state)
        setLoader(true)
        sendToApi('user/resend', {email: state, type: "lost"})
        .then((data)=>{
            setLoader(false)
            if(data.mail) {
                toastify("info", `Mail has been send to ${state}. Check it to complete inscription`)
            } else if(data.error) toastify("error", `User ${state} not found.`)
            else {
                toastify("error", `Mail can't be send to ${state}.`)
            }
        })
    }
    const active = () => !checkEmail(state)

    return(
        <div className="forget" id="forget">
            { show ?
                    <div className="forget-resend">
                        <div className="resend-content">
                            <div className="resend-title">
                                <h1>{t('forgetSous4')}</h1>
                                <hr/>
                                <p>{t('forgetSous6')}</p>
                                <p>{t('forgetSous7')}</p>
                                <hr/><br/>
                                <Button fullwidth sx={{mx:2,py:3}} onClick={resend}>
                                    { loader? (<ReactLoading type="spin" color="#ffffff" width="35px" height="35px"/>) : t('forgetSous8') }
                                </Button>
                                <span onClick={()=>history.push('/Login')} className="btn-resend">{t('forgetLink')}</span>
                            </div>
                        </div>
                    </div> 
                :
                    <> <span className="forget-title">{t('forgetTitle')}</span>
                        <div className="forget-form">
                            <p className="forget-paragraph">{t('forgetSous1')}</p>
                            <form class="login-form" onSubmit={e => handleSubmit(e)} >
                                <div className="form-groupe">
                                    <Input name="Email" label='Email' help={t('forgetSous2')} val={state}
                                            change={e => onChange(e)} 
                                            error={!checkEmail(state)&& ring } 

                                    />  
                                </div>
                                <Button   className="forget-btn" 
                                        disabled={active()}  onClick={e=>handleSubmit(e)}
                                >  
                                    { loader? (<ReactLoading type="spin" color="#ffffff" width="35px" height="35px" 
                                                />) 
                                        : t('forgetSous3') }
                                </Button>
                            </form>
                        </div>
                    </> 
            }
        </div>
    )
}

export default Forget;