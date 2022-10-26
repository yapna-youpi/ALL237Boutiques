import React, { useEffect, useState, useContext, createRef } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import Modal from 'react-responsive-modal'
import { useTranslation } from 'react-i18next'

import { Input2 } from '../../addons/input/Input'
import PhoneInputool from '../../addons/input/PhoneInputool'
import RenderOtp from './RenderOtp'

import './form.css'
import { connect } from 'react-redux'
import { randomId } from '../../../utils/utilFunctions'
import { BalanceContext } from '../Cabital'
import { getCurrenciesRate } from '../../../utils/currencies'



function Form({ User }) {
    const { t } = useTranslation()
    const [state, setState] = useState({ modal: false, otp: false, success: false })
    const [rates, setRates] = useState({})
    const { balance } = useContext(BalanceContext)

    const validationSchema = yup.object({
        amount: yup.number().min(20, `${t('form1')}`).required(`${t('form7')}`),
        name: yup.string().required( `${t('form2')}`),
        phone: yup.string().required(`${t('form3')}` ),
        cPhone: yup.string().required(`${t('form4')}`)
    })
    const formik = useFormik({
        initialValues: {
            amount: 0,
            name: '',
            phone: '',
            cPhone: ''
        },
        validationSchema,
        onSubmit: (values) => transfert()
    })
    useEffect(() => {
        getCurrenciesRate().then(data => setRates(data))
    }, [])


    const _handleChange = (target) => formik.setFieldValue(target.name, target.value)
    const _handleBlur = (target) => formik.setFieldTouched(target.name, true)
    const transfert = () => setState({ ...state, modal: true, otp: true })
    const closeModal = () => setState({ modal: false, otp: false, success: false })
    const done = () => {
        closeModal()
        formik.resetForm()
    }

    // console.log("the currencies ", rates)
    return (
        <div className="cabital-form">
            <fieldset>
                <legend><h2><span className='iper'>Iperc</span>ash Section</h2></legend>
                <form className="form" onSubmit={formik.handleSubmit}>
                    <div className="form-head">
                        <div className="form-rig ">
                            <Input2 val={formik.values.amount} name="amount" label={t('form11') } type='number'
                                error={formik.errors.amount && formik.touched.amount} help={formik.errors.amount}
                                change={(target) => _handleChange(target)} handBlur={(target) => _handleBlur(target)}
                            />
                        </div>
                        <div className="">1,OO USDT <h3 className="sign">&cong;</h3> {(656 * rates.USD || 0)} XAF</div>
                    </div>
                    <h3>{t('form5')}  </h3>
                    <div className="form-body">
                        <div className="form-group">
                            <Input2 val={formik.values.name} name="name" label={t('form8') }
                                error={formik.errors.name && formik.touched.name} help={formik.errors.name}
                                change={(target) => _handleChange(target)} handBlur={(target) => _handleBlur(target)} />
                        </div>
                        <div className="form-group">
                            <PhoneInputool val={formik.values.phone} label={t('form9')} name="phone" id="phone"
                                error={formik.errors.phone && formik.touched.phone} help={formik.errors.phone}
                                change={(target) => _handleChange(target)} handBlur={(target) => _handleBlur(target)} cm={true}
                            />
                        </div>
                        <div className="form-group">
                            <PhoneInputool val={formik.values.cPhone} label={t('form10')} name="cPhone" id="cPhone"
                                error={formik.errors.cPhone && formik.touched.cPhone} help={formik.errors.cPhone}
                                change={(target) => _handleChange(target)} handBlur={(target) => _handleBlur(target)} cm={true}
                            />
                        </div>
                        <div className="form-group" >
                            <button disabled={!(balance.ready && rates.USD)} >{t('form6')} </button>
                        </div>
                    </div>
                </form>
            </fieldset>
            {state.modal && <Modal open={true} onClose={closeModal} closeOnOverlayClick={false}>
                <RenderOtp User={User} done={done}
                    state={{ ...formik.values, transaction_id: randomId('C'), fiatPay: formik.values.amount * rates.USD }}
                />
            </Modal>}
        </div>
    )
}

const mapStateToProps = state => ({ User: state.userReducer.user, Currencies: state.currenciesReducer.currencies })

export default connect(mapStateToProps)(Form)
