import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import ReactLoading from 'react-loading';
import { useHistory } from 'react-router-dom'

import { Input } from '../addons/input/Input'
import { checkEmail, sendToApi } from '../../utils/utilFunctions'
import Button from '@material-ui/core/Button'
import { toastify } from '../addons/toast/Toast'
import { useFormik } from 'formik';
import * as yup from 'yup';

import styled from  './forget.css'
// import toast from "react-hot-toast"
// import { CgOculus } from "react-icons/cg"

const Forget =({type, color}) => {
    const { t } = useTranslation();
    let history = useHistory();

    const [loader, setLoader] = useState(false);
    const [show, setShow] = useState(false);

    const validationSchema = yup.object({
        email: yup.string().email(`${t('formikLogin1')}`).required(`${t('formikLogin2')}`),
    })

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema,
        onSubmit: async () => {
             reset(formik.values.email);
        }
    })

    const reset = (userData) => {
        setLoader(true); 
        sendToApi('user/lost',{email: userData})
            .then(data => {
                setLoader(false);
                if(data.error) {
                    toastify('error',`${t('forgetSous11')}`)
                    return
                }
                if(data.mail){
                    toastify('success', `${t('forgetSous10') + ' ' + userData}`)
                    // return history.push('/Reset')
                    if(data.mail){
                        setShow(!show)
                    }
                } else {
                    toastify('info', `${t('forgetSous9')}` )
                }
                if(!data.user){
                }
            }) 
    }
    const resend=()=>{
        setLoader(true)
        sendToApi('user/resend', {email: formik.email.values, type: "lost"})
        .then((data)=>{
            setLoader(false)
            if(data.mail) {
                toastify("info", `${t('forgetSous12') + ' ' + formik.email.values + ' ' + t('forgetSous13')}`)
            } else if(data.error) toastify("error", `${t('forgetSous14') + ' ' + formik.email.values + ' ' + t('forgetSous15')}`)
            else {
                toastify("error", `${('forgetSous16')+ ' ' + formik.email.values }.`)
            }
        }).catch(error=> toastify("error", `${('forgetSous16')+ ' ' + formik.email.values }.`))
    }
    const setTouched = (field) => {
        if (!formik.touched[field])
            formik.setFieldTouched(field, true)
    }

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
                    <> 
                        <div className="forget-form">
                            <h2 className="forget-title">{t('forgetTitle')}</h2>
                            <p className="forget-paragraph">{t('forgetSous1')}</p>
                            <form className="login-form" onSubmit={formik.handleSubmit} >
                                <div className="form-inp">
                                    <Input val={formik.values.email} type="email" label={t('SignUpSous6')} name="email" id="email"
                                        help={formik.errors.email} error={formik.errors.email && formik.touched.email}
                                        change={formik.handleChange} handBlur={() => setTouched('email')}
                                    />
                                </div>
                                <Button   className="forget-btn" 
                                          type="submit"
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