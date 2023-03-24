import React, { useState } from "react"
import { Input } from '../addons/input/Input'
import { useTranslation } from "react-i18next"
import ReactLoading from 'react-loading';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { toastify } from '../addons/toast/Toast'
import { sendToApi, checkPassword, regPassword } from '../../utils/utilFunctions'
import Button from '@material-ui/core/Button'


import styled from './reset.css'

const Forget =({history, match, type, color}) => {
    const { t } = useTranslation();

    // const [state, setState] = useState({
    //     password: '',
    //     cfPassword: ''
    // });

    // const [errors, setErrors] = useState({
    //     password:false,
    //     cfPassword:false
    // })  
    const [waiting, setWaiting]=useState(false)
    const [lode, setLode] = useState(false)

    const validationSchema = yup.object({
        password: yup.string().required(`${t('formikLogin3')}`).matches(regPassword, `${t('formikLogin4')}`),
        cPassword: yup.string().required(`${t('formiksignup8')}`).oneOf([yup.ref('password')], `${t('formiksignup9')}`),
    })

    const formik = useFormik({
        initialValues: {
            password: "", 
            cPassword: ""
        },
        validationSchema,
        onSubmit: async () => {
            handleSubmit(formik.values.password)
        }
    })

    const setTouched = (field) => {
        if (!formik.touched[field])
            formik.setFieldTouched(field, true)
    }

    const handleSubmit=(valeur)=>{
        setWaiting(true)
        setLode(true)
        sendToApi(`user/reset/${match.params.id}`, valeur)
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
    
    const active=() => !(formik.values.cPassword === formik.values.password) ? true : false
    // console.log(formik.values.password)
    // console.log(formik.values.cPassword)
    // console.log(match.params.id)

    return(
        <div className="reset">
            <h1 className="reset-title">{t('resetTitle')}</h1>
            <div className="reset-form">
                <p className="reset-paragraph">{t('resetSous1')}</p>
                <form className="login-form" onSubmit={formik.handleSubmit} >
                    <div className="form-groupe">
                        {/* <Input type="password" name="password" label={t('resetSous5')} help={t('resetSous2')} val={state.password}
                            error={state.password&&(!checkPassword(state.password))}
                            change={e => onChange(e)}
                        />   */}
                        <Input val={formik.values.password} type="password" label={t('SignUpSous8')} name="password" id="Password"
                            help={formik.errors.password} error={formik.errors.password && formik.touched.password}
                            change={formik.handleChange} handBlur={() => setTouched('password')}
                        />
                    </div>
                    <div className="form-groupe">
                        {/* <Input type="password" name="cfPassword" label={t('resetSous6')} help={t('resetSous3')} val={state.cfPassword}
                            error={state.cfPassword&&(state.cfPassword !== state.password)}
                            change={e => onChange(e)}
                       />  */}
                       <Input val={formik.values.cPassword} type="password" label={t('SignUpSous9')} name="cPassword" id="cPassword"
                            help={formik.errors.cPassword} error={formik.errors.cPassword && formik.touched.cPassword}
                            change={formik.handleChange} handBlur={() => setTouched('cPassword')}
                        /> 
                    </div>
                    <Button  className="reset-btn"   fullWidth
                        disabled={active()} type="submit"
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