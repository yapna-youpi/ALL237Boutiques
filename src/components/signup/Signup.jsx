import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { isValidPhoneNumber } from 'react-phone-number-input'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import ReactLoading from 'react-loading'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Helmet } from "react-helmet";

import { sendToApi, regPassword } from '../../utils/utilFunctions'
import { toastify } from '../addons/toast/Toast'

import './signup.css'
import './resend.css'
import iperFot from './assets/vendre_bitcoin_usdt_ethereum_mobile_money_orange_money.svg'
import { Input, Input2 } from '../addons/input/Input'
import InputPhone from '../addons/input/PhoneInput'
import { parsePhoneNumber } from 'react-phone-number-input'
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi'




function Signup({ Country, match }) {
    const { t } = useTranslation()

    const validationSchema = yup.object({
        name: yup.string().min(4, `${t('formiksignup1')}`).required(`${t('formiksignup2')}`),
        email: yup.string().email(`${t('formiksignup3')}`).required(`${t('formiksignup4')}`),
        phone: yup.string().required(`${t('formiksignup5')}`),
        password: yup.string().required(`${t('formiksignup6')}`).matches(regPassword, `${t('formiksignup7')}`),
        cPassword: yup.string().required(`${t('formiksignup8')}`).oneOf([yup.ref('password')], `${t('formiksignup9')}`),
        check: yup.boolean()
    })

    // const [state, setState] = useState({ name: "", email: "", phone: "", password: "", cPassword: "", check: false })
    const [lode, setLode] = useState(false)
    const [show, setShow] = useState(false)
    const [ showPassword , setshowPassword] = useState(false)
    const [ showCFpassword , setshowCFpassword] = useState(false)
    //initialisation of formik validation
    const formik = useFormik({
        initialValues: {
            name: "", email: "", phone: "",
            password: "", cPassword: "", check: false
        },
        validationSchema,
        onSubmit: async () => {
            let { phone, cPassword } = { ...formik.errors }
            if (phone || cPassword) return
            // alert('can submit')
            signup({ ...formik.values, country: parsePhoneNumber(formik.values.phone).country })
        }
    })
    const ParrainRef = useRef(null)
    useEffect(() => {
        setParrain()

        if ( show ) {
            replacer();
        }else{
            replacer();
        }
    }, [])
    let history = useHistory()

    const signup = async (userData) => {
        let params = ParrainRef.current ? { ...userData, parrain_id: ParrainRef.current.id } : userData
        setLode(true)
        sendToApi('user/signup', params)
            .then((data) => {
                setLode(false)
                if (data.user) {
                    toastify("info", `${t('SignUpSous19') + " \n " + t('SignUpSous20') + formik.values.email + t('SignUpSous21')}`)
                    if (data.mail) {
                        setShow(!show)
                    }
                } else if (data.error.errors) {
                    toastify("info", `${t('SignUpSous22') + " " + formik.values.email + " " + t('SignUpSous23')}`)
                    setShow(!show)
                }
                else {
                    toastify('error', `${t('SignUpSous24')}`)
                }
            }).catch(error => {
                // console.warn("big error ", error)
                toastify('error', `${t('SignUpSous24')}`)
            })
    }

    const resend = () => {
        setLode(true)
        sendToApi('user/resend', { email: formik.values.email, type: "signup" })
            .then((data) => {
                setLode(false)
                if (data.mail)
                    toastify("info", `${t('SignUpSous25') + formik.values.email + t('SignUpSous26')}`)
                else if (data.error)
                    toastify("error", `User ${formik.values.email} not found.`)
                else
                    toastify("error", `${t('SignUpSous27') + formik.values.email + t('SignUpSous28')}`)
            }).catch(error => toastify(error, "Sign up failed"))
    }

    const setParrain = async () => {
        let parrain_id = match.params.id
        if (!parrain_id) parrain_id = localStorage.getItem('pr') // look at line 118
        if (parrain_id) {
            // let res = await sendToApi('parrain/getone/', { parrain_id })
            let res=await fetch(process.env.REACT_APP_API_URL+'parrain/getone/:'+parrain_id)
                .then(res=>res.json())
                .catch(error=>{})
            if (res.parrain) {
                ParrainRef.current = { id: res.parrain.parrain_id, percent: res.parrain.percent }
                localStorage.setItem('pr', res.parrain.parrain_id)
            }
            // else console.log("Bad identifier")
        }
    }

    const setPhone = (name, value) => {
        formik.setFieldValue(name, value)
    }

    (() => {
        if (formik.values.phone && !formik.errors.phone) {
            !isValidPhoneNumber(formik.values.phone) && formik.setFieldError('phone', `${t('formikSell9')}`)
        }
    })()

    const setTouched = (field) => {
        if (!formik.touched[field])
            formik.setFieldTouched(field, true)
    }
    const active = () => !formik.values.check || (!isValidPhoneNumber(formik.values.phone) || (formik.values.cPassword !== formik.values.password))

    let AmList = {
        en: ["http://ipercash.fr/politiques/terms_en.pdf"],
        fr: ["http://ipercash.fr/politiques/terms_fr.pdf"]
    }
    let lang = JSON.parse(localStorage.getItem("lang") || '{"lang":"fr"}').lang

    const replacer = () =>{
        setTimeout(()=>{
            document.querySelector('.signup-img').classList.toggle('replacer');
        },150)
    }

    const handleShowPassword = () => {
        setshowPassword(!showPassword);
    }
    const handleShowCFpassword = () => {
        setshowCFpassword(!showCFpassword)
    }
    return (
        <>
            <div className="signup">
                <Helmet>
                    <title>Investir dans la cryptomonnaie au Cameroun Sénégal Mali Burkina Cote d’Ivoire Guinée</title>
                </Helmet>
                <div className="signup-content">
                    {show ? (<div className="resend-content">
                        <div className="resend-title">
                            <h1>{t('SignUpSous11')}</h1>
                            <hr />
                            {/* <h3>{t('SignUpSous12')}</h3> */}
                            <p>{t('SignUpSous13')}</p>
                            <p>{t('SignUpSous14')}</p>
                            <hr /><br />
                            <Button fullwidth sx={{ mx: 2 }} onClick={resend}>
                                {lode ? (<ReactLoading type="spin" color="#ffffff" width="28px" height="28px" />) : t('SignUpSous15')}
                            </Button>
                            <span onClick={() => history.push('/Login')} className="btn-resend">{t('signUpLink')}</span>

                        </div>
                    </div>) :
                        (<div className="signup-title">
                            <h1 style={{ color: '#0F394C', fontFamilly: 'Segoe UI' }}>{t('SignUpTitle')}</h1>
                            <p className="signup-paragrap">{t('SignUpSous1')}</p>
                            <form onSubmit={formik.handleSubmit}>
                                <Input val={formik.values.name} label={t('SignUpSous5')} name="name" id="signup-name"
                                    help={formik.errors.name} error={formik.errors.name && formik.touched.name}
                                    change={formik.handleChange} handBlur={() => setTouched('name')}
                                />
                                <Input val={formik.values.email} type="email" label={t('SignUpSous6')} name="email" id="signup-email"
                                    help={formik.errors.email} error={formik.errors.email && formik.touched.email}
                                    change={formik.handleChange} handBlur={() => setTouched('email')}
                                />
                                <InputPhone val={formik.values.phone} name="phone" label={t('SignUpSous7')}
                                    country={Country} all={true}
                                    help={formik.errors.phone} error={formik.errors.phone && formik.touched.phone}
                                    change={(name, value) => setPhone(name, value)}
                                    handBlur={() => setTouched('phone')}
                                />
                                <div className='form-groupe-box'>
                                    <Input val={formik.values.password} type={ showPassword ? "text" : "password" } label={t('SignUpSous8')} name="password" id="Password"
                                        help={formik.errors.password} error={formik.errors.password && formik.touched.password}
                                        change={formik.handleChange} handBlur={() => setTouched('password')}
                                    />
                                     <span className='signup-show-password' onClick={handleShowPassword} > { showPassword ? <HiOutlineEye /> : <HiOutlineEyeOff /> } </span>
                                </div>
                                <div className='form-groupe-box'>
                                    <Input val={formik.values.cPassword} type={ showCFpassword ? "text" : "password" }  label={t('SignUpSous9')} name="cPassword" id="confirPassword"
                                        help={formik.errors.cPassword} error={formik.errors.cPassword && formik.touched.cPassword}
                                        change={formik.handleChange} handBlur={() => setTouched('cPassword')}
                                    />
                                    <span className='signup-show-password' onClick={handleShowCFpassword} > { showCFpassword ? <HiOutlineEye /> : <HiOutlineEyeOff /> } </span>
                                </div>
                                <div className="checkbox">
                                    <input className='check' type="checkbox" id="check" onChange={() => formik.setFieldValue('check', !formik.values.check)} />
                                    <label htmlFor="check"><a className='lie' href={AmList[lang][0]} target="_blank"> {t('SignUpSous17')} {t('SignUpSous18')}</a></label>
                                </div>
                                <Button fullWidth className="sign-btnt"
                                    type="submit"
                                    disabled={active()}
                                    onClick={formik.handleSubmit}
                                >
                                    {lode ? (<ReactLoading type="spin" color="#ffffff" width="28px" height="28px" />) : t('SignUpSous4')}
                                </Button>
                            </form>
                            <p className='signup-check' onClick={() => history.push('/login')}><u>{t('SignUpSous10')}</u></p>
                        </div>)}
                </div>
                <div className="signup-image">
                    <p>{<img src={iperFot} className="signup-img" width="650px" qlt="signup" />}</p>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => ({ Country: state.countryReducer.country })

export default connect(mapStateToProps)(Signup)
