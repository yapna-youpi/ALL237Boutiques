import React, { useState } from "react"
import { Input } from '../addons/input/Input'
import { useTranslation } from "react-i18next"
import ReactLoading from 'react-loading';

import { toastify } from '../addons/toast/Toast'
import { sendToApi, checkPassword } from '../../utils/utilFunctions'
import Button from '@material-ui/core/Button'


import styled from './reset.css'

const Forget =({history, match, type, color}) => {
    const { t } = useTranslation();

    const [state, setState] = useState({
        password: '',
        cfPassword: ''
    });

    const [errors, setErrors] = useState({
        password:false,
        cfPassword:false
    })  
    const [waiting, setWaiting]=useState(false)
    const [lode, setLode] = useState(false)

    const onChange= target =>{
        let newState=state
        newState[target.name]=target.value
        setState({...state})
    }

    const handleBlur=target=>{
        switch (target.name) {
            case "password":
                setErrors({...errors, password: !checkPassword(state.password)})
                break
        
            case "cfPassword":
                setErrors({...errors, cfPassword: state.password !== state.cfPassword})
                break
            default:
                break
        }
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        setWaiting(true)
        setLode(true)
        sendToApi(`user/reset/${match.params.id}`, state.password)
            .then(data=>{
                setLode(false)

                if(data.update) {
                    toastify('success',`password reseted`)
                    setTimeout(() => {
                        history.push('/login')
                    }, 2000);
                } else  toastify('error','password not reset')
                setWaiting(false)
            })
        return false
    }
    
    const active=()=>(state.cfPassword&&(state.cfPassword !== state.password)) || (!state.cfPassword || !state.password)

    return(
        <div className="reset">
            <span className="reset-title">{t('resetTitle')}</span>
            <div className="reset-form">
                <p className="reset-paragraph">{t('resetSous1')}
                </p>
                <form class="login-form" onSubmit={e=>handleSubmit(e)} >
                    <div className="form-groupe">
                        <Input type="password" name="password" label={t('resetSous5')} help={t('resetSous2')} val={state.password}
                            error={state.password&&(!checkPassword(state.password))}
                            change={target => onChange(target)}
                        />  
                    </div>
                    <div className="form-groupe">
                        <Input type="password" name="cfPassword" label={t('resetSous6')} help={t('resetSous3')} val={state.cfPassword}
                            error={state.cfPassword&&(state.cfPassword !== state.password)}
                            change={target => onChange(target)}
                       />  
                    </div>
                    <Button  className="reset-btn"   fullWidth
                        disabled={active()} onClick={e=>handleSubmit(e)}
                    >
                        { lode? (<ReactLoading type="spin" color="#ffffff" width="35px" height="35px" 
                                    />) : t('resetSous4') }    
                    </Button>
                </form>
            </div>
        </div>
    )
}
export default Forget;