import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { isValidPhoneNumber, parsePhoneNumber } from 'react-phone-number-input'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import ReactLoading from 'react-loading'

import { sendToApi, checkEmail } from '../../utils/utilFunctions'
import { toastify } from '../addons/toast/Toast'

import './signup.css'
import './resend.css'
import logoIpercash from './assets/logo-ipercash.png'
import iperFot from './assets/undraw_Mobile_login_re_9ntv.svg'
import { Input } from '../addons/input/Input'
import InputPhone from '../addons/input/PhoneInput'

function Signup({Country}) {
    const { t } = useTranslation()
    const [state, setState]=useState({name: "", email: "", phone: "", password: "", cPassword: ""})
    const [errors, setErrors]=useState({
        name: false, email: false, phone: false, password: false, cPassword: false 
    })
    const [lode, setLode] = useState(false)
    const [show, setShow] = useState(false);

    let history=useHistory()

    const signup=async(userdata)=>{
        setLode(true)
        sendToApi('user/signup', userdata)
        .then((data)=>{
            setLode(false)
            if(data.user) {
                toastify("info", `Sign up successful. \n check ${state.email} to complete inscription`)
                // history.push('/login')
                    if(data.mail){
                        setShow(!show)
                    }
            } else if(data.error.errors) {
                toastify("info", `User ${state.email} has been found. Resend email to comple the inscription`)
                setShow(!show)
            }
             else {
                toastify("error", "Sign up failed")
            }
        })
        
    }
    const resend=()=>{
        console.log("user data ", state)
        setLode(true)
        sendToApi('user/resend', {email: state.email, type: "signup"})
        .then((data)=>{
            setLode(false)
            if(data.mail)
                toastify("info", `Mail has been send to ${state.email}. Check it to complete inscription`)
            else if(data.error) 
                toastify("error", `User ${state.email} not found.`)
            else
                toastify("error", `Mail can't be send to ${state.email}. try again or reset your account`)
        })
    }
    
    const handleChange=(e)=>{
        console.log(" c'est le ",e.name)
        let newState=state
        newState[e.name]=e.value
        setState({...state})
    }

    const active=()=>(state.name&&state.email&&state.phone&&state.password&&state.email)&&(state.password.length>3)&&(state.password===state.cPassword)&&checkEmail(state.email)&&isValidPhoneNumber(state.phone || 342)
    console.log(state, Country)
    return (
        <>
        <div className="signup">
            <div className="signup-content">
                { show? (<div className="resend-content">
                            <div className="resend-title">
                                <h1>{t('SignUpSous11')}</h1>
                                <hr/>
                                {/* <h3>{t('SignUpSous12')}</h3> */}
                                <p>{t('SignUpSous13')}</p>
                                <p>{t('SignUpSous14')}</p>
                                <hr/><br/>
                                <Button fullwidth sx={{mx:2}} onClick={resend}>
                                    { lode ? (<ReactLoading type="spin" color="#ffffff" width="28px" height="28px" />) : t('SignUpSous15')}
                                </Button>
                                <span onClick={()=>history.push('/Login')} className="btn-resend">{t('signUpLink')}</span>

                            </div>
                        </div>):
                        (<div className="signup-title">
                            <h1 style={{color:'#0F394C',fontFamilly:'Segoe UI'}}>{t('SignUpTitle')}</h1>
                            <p className="signup-paragrap">{t('SignUpSous1')}</p>
                            <form onSubmit={signup}>
                                <Input val={state.name} label={t('SignUpSous5')} name="name" id="signup-name" help="this field is required"
                                    error={errors.name&&!state.name} 
                                    change={handleChange} handBlur={()=>setErrors({...errors, name: !state.name})}
                                />
                                <Input val={state.email} type="email" label={t('SignUpSous6')} name="email" id="signup-email" help="should be a valid email"
                                    error={errors.email&&!checkEmail(state.email)}
                                    change={handleChange} handBlur={()=>setErrors({...errors, email: true})}
                                />
                                <InputPhone val={state.phone} name="phone" label={t('SignUpSous7')} country={Country} all={true} help="should be a valid phone number of the selected country"
                                    error={errors.phone&&!isValidPhoneNumber(state.phone || "342")}
                                    change={handleChange} handBlur={()=>setErrors({...errors, phone: true})}
                                />
                                <Input val={state.password} type="password" label={t('SignUpSous8')} name="password" id="Password" help="should have 4 caracters"
                                    error={errors.password&&(state.password.length<4)}
                                    change={handleChange} handBlur={()=>setErrors({...errors, password: true})}
                                />
                                <Input val={state.cPassword} type="password" label={t('SignUpSous9')} name="cPassword" id="confirPassword" error={errors.cPassword&&(state.password!==state.cPassword)} help="should match to password"
                                    error={errors.cPassword&&(state.password!==state.cPassword)}
                                    change={handleChange} handBlur={()=>setErrors({...errors, cPassword: true})}
                                /><br/><br/>
                                <Button  fullWidth className="sign-btnt"
                                    disabled={!active()} 
                                    onClick={()=>signup({...state, country: parsePhoneNumber(state.phone).country})}
                                >
                                    { lode? (<ReactLoading type="spin" color="#ffffff" width="28px" height="28px" />) : t('SignUpSous4') }   
                                </Button>
                            </form>
                            <p className='signup-check' onClick={()=>history.push('/login')}><u>{t('SignUpSous10')}</u></p>
                        </div>) }
            </div>
            <div className="signup-image">
                <span className="signup-block-logo"><img className={'signup-logo'} src={logoIpercash} /></span>
                <p>{<img src={iperFot} className="signup-img"/>}</p>
            </div>
        </div>
    </>
    )
}

const mapStateToProps=state=>({Country: state.countryReducer.country})

export default connect(mapStateToProps)(Signup)
