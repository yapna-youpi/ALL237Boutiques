import React, { useState, createRef } from 'react'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import ReactLoading from 'react-loading';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Helmet } from "react-helmet";

import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next';
import { IoMailOutline } from 'react-icons/io5'
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi'

import { Input } from '../addons/input/Input'
import { toastify } from '../addons/toast/Toast'
import { sendToApi, regPassword } from '../../utils/utilFunctions'
import { setUser } from '../../store/actions'

import './login.css'
import iperFot from './assets/envoyer_argent_en_afrique_europe_moin_cher.svg'

let deferredPrompt = null

window.addEventListener('beforeinstallprompt', function (e) {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault()
    // Stash the event so it can be triggered later.
    deferredPrompt = e
})


function Login({ dispatch }) {
    const [load, setLoad] = useState(false)
    const [showPassword, setshowPassword] = useState(false)
    let history = useHistory()

    const { t } = useTranslation()

    const validationSchema = yup.object({
        email: yup.string().email(`${t('formikLogin1')}`).required(`${t('formikLogin2')}`),
        password: yup.string().required(`${t('formikLogin3')}`).matches(regPassword, `${t('formikLogin4')}`),
    })

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema,
        onSubmit: async () => {
            login(formik.values)
        }
    })

    const setTouched = (field) => {
        if (!formik.touched[field]) {
            formik.setFieldTouched(field, true)
        }
    }
    const login = (userdata) => {
        let percent = 0
        setLoad(true)
        sendToApi('user/login', userdata)
            .then(async (data) => {
                setLoad(false)
                if (data.userId) {
                    if (data.parrain_id) percent = await getParrain(data.parrain_id)
                    toastify("greeting", `${t('LoginSous12')} ${data.userName}`)  
                    dispatch(setUser({ ...data, percent, timestamp: +new Date }))
                    install()
                    history.push('/')
                } else toastify("error", `${t('LoginSous11')}`)
            }).catch(error => {
                // console.log("there is an error ", error)
                toastify("error", `${t('LoginSous11')}`)
            })
    }

    const install = () => {
        try {
            if (!localStorage.getItem("install")) {
                deferredPrompt.prompt()
                deferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                    } else {
                    }
                    deferredPrompt = null;
                    localStorage.setItem("install", JSON.stringify({ ask: true, date: +new Date }))
                });
            }
        } catch (error) {

        }
    }

    const getParrain = async (parrain_id) => {
        let res = await sendToApi('parrain/get', { parrain_id })
        if (res.parrain) return res.parrain.percent
        else return 0
    }

    const active = () => (!formik.values.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
        || !formik.values.password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$@%*+-_]{8,}$/))

    const handleShowPassword = () => {
        console.log("clicked ");
        setshowPassword(!showPassword);
    }
    return (
        <div className="login">
            <Helmet>
                <title>Site d’échange de crypto-monnaie en Afrique</title>
            </Helmet>
            <div className="login-content">
                <div className="login-title">
                    <h1 style={{ color: '#0F394C', fontFamilly: 'Segoe UI' }}>{t('LoginTitle')}</h1>
                    <p className="login-paragrap">{t('LoginSous10')}</p>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="form-groupe">
                            <div className='form-groupe-box'>
                                <Input val={formik.values.email} type="email" label={t('SignUpSous6')} name="email" id="email"
                                    help={formik.errors.email} error={formik.errors.email && formik.touched.email}
                                    change={formik.handleChange} handBlur={() => setTouched('email')}
                                />
                                <span className='login-show-mail'> <IoMailOutline /> </span>
                            </div>
                        </div>
                        <div className="form-groupe">
                            <div className='form-groupe-box'>
                                <Input val={formik.values.password} type={showPassword ? 'text' : 'password'} label={t('SignUpSous8')} name="password" id="Password"
                                    change={formik.handleChange}
                                    help={formik.errors.password} error={formik.errors.password && formik.touched.password}
                                    handBlur={() => setTouched('password')}
                                />
                                <span className='login-show-password' onClick={handleShowPassword} > {showPassword ? <HiOutlineEye /> : <HiOutlineEyeOff />} </span>
                            </div>
                            <div className="login-checkbox">
                                <span className="login-forget-password" onClick={() => history.push('/forget')} style={{ textDecoration: 'underline', lineHeight: '15px' }}>{t('LoginSous9')}</span>
                            </div>
                        </div>

                        <Button style={{ backgroundColor: '#cc1616' }} fullWidth
                            type="submit"
                            disabled={active()}
                        >
                            {load ? (<ReactLoading type="spin" color="#ffffff" width="28px" height="28px"
                            />) : t('LoginSous6')}
                        </Button>
                    </form>
                </div>
                <span className='login-creat' onClick={() => history.push('/signup')}><u>{t('LoginSous7')}</u></span>
            </div>
            <div className="login-image">
                <span className="login-block-logo">
                    {/* <img className={'login-logo'} src={logoIpercash} alt="login-logo" /> */}
                </span>
                {<img src={iperFot} className="bitlogo" width="100%" alt="bit-logo" />}
            </div>

        </div>
    )
}

const mapStateToProps = state => ({ User: state.userReducer.user })

export default connect(mapStateToProps)(Login)
