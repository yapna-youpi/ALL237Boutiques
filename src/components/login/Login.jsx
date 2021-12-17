import React,{ useState} from 'react'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import ReactLoading from 'react-loading';

import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next';

import { Input } from '../addons/input/Input'
import { toastify } from '../addons/toast/Toast'
import { sendToApi, checkEmail } from '../../utils/utilFunctions'
import { setUser } from '../../store/actions'

import './login.css'
import iperFot from './assets/undraw_Mobile_login_re_9ntv.svg'
import logoIpercash from './assets/logo-ipercash.png'





function Login({User, dispatch}) {
    const { t } = useTranslation()
    // console.log("le user ", User, dispatch)
    let history=useHistory()

    const [state,setState] = useState({
        email: "",
        password: "",
    })
    const [ errors, setErrors ] = useState({
        email: false,
        password: false
    })
    const [ load, setLoad] = useState(false)

   // la fonction qui gere les changement des inputs
    const handleChange=e=>{
        let newState=state
        newState[e.name]=e.value
        setState({...state})
    }
    // la fonction qui gere l'evenement onBlur des inputs
    const handleBlur=target=>{
        switch (target.name) {
            case "email":
                setErrors({...errors, email: !checkEmail(target.value)})
                break
        
            case "password":
                setErrors({...errors, password: state.password.length < 4})
                break
            default:
                break
        }
    }

    const login=(userdata)=>{
        setLoad(true)
        sendToApi('user/login', userdata)
        .then(data=>{
            setLoad(false)
            if(data.userId) {
                toastify("success", `Hello ${data.userName}`)
                console.log("good")
                dispatch(setUser({...data, timestamp: +new Date}))
                // history.push('/')
                window.location.href="/"
            } else toastify("error", "failed to login")
        })
    }

    const handleSubmit= e => {
        e.preventDefault();
        console.log("start login")
        if(!active()) login()
        return false
    }

    const active=()=>(errors.email && errors.password) || (!state.email || !state.password)
    return (
        <div className="login">
            <div className="login-content">
                <div className="login-title">
                    <h1 style={{color:'#0F394C',fontFamilly:'Segoe UI'}}>{t('LoginTitle')}</h1>
                    <p className="login-paragrap">{t('LoginSous11')}</p>
                    <form onSubmit={e => handleSubmit(e)}>
                        <div className="form-groupe">
                            <Input val={state.email} name="email" label={t('LoginSous3')} help={t('LoginSous2')} 
                                error={state.email&&!checkEmail(state.email)}
                                change={handleChange} 
                            />  
                        </div>
                      
                        <div className="form-groupe">
                                <Input val={state.password} name="password" type="password" label={t('LoginSous4')} help={t('LoginSous10')}
                                    error={state.password&&(state.password.length < 4)}
                                    change={handleChange} 
                                />

                            <div  className="login-checkbox">
                                <span className="login-forget-password" onClick={()=>history.push('/forget') } style={{textDecoration: 'underline',lineHeight:'15px'}}>{t('LoginSous9')}</span>
                            </div>
                        </div>
                       
                        <Button style={{backgroundColor:'#cc1616'}} fullWidth 
                            disabled={active()} 
                            onClick={()=>login(state)}
                        >
                            { load? (<ReactLoading type="spin" color="#ffffff" width="28px" height="28px" 
                                        />) : t('LoginSous6') }    
                        </Button>
                    </form>
                </div>
                <span className='login-creat' onClick={()=>history.push('/signup')}><u>{t('LoginSous7')}</u></span>
            </div>
            <div className="login-image">
                <span className="login-block-logo"><img className={'login-logo'} src={logoIpercash} /></span>
                    {<img src={iperFot} style={{position:'relative'}} width="400px"  />}
            </div>
        </div>
    )
}

const mapStateToProps=state=>({User: state.userReducer.user})

export default  connect(mapStateToProps)(Login)
