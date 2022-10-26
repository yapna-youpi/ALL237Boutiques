import React from 'react'
import ReactLoading from 'react-loading'
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';


import './promocode.css'
import { IoMdClose } from 'react-icons/io'
import { useTranslation } from 'react-i18next'
import { sendToApi } from '../../utils/utilFunctions'

function PromoCode({ User, openPromo, closePromo, activePromotion }) {

	const { t } = useTranslation();
	const [loading, setLoading] = React.useState(false)

	const validationSchema = yup.object({
		code: yup.string().required('this field is required'),
	})

	const formik = useFormik({
		initialValues: {
			code: "",
		},
		validationSchema,
		onSubmit: ({ code }) => {
			setLoading(true);
			validate(code)
		}
	})

	const setTouched = (field) => {
		if (!formik.touched[field])
			formik.setFieldTouched(field, true)
	}

	const validate = async (code) => {
		// console.log("the code ", code)
		let usable=await checkCode(code)
		setLoading(false);
		if (usable) {
			// close()
			document.getElementById('promocode').classList.toggle('hide')
			return activePromotion(code)
		}
		else formik.setFieldError('code', "this code is not available try one another")
	}

	const checkCode = async (code) => {
		let response = await sendToApi('promo/testcode', { userId: User.userId, code })
		console.log("the response ", response)
		return response.usable
	}
	const close = () => {
		document.getElementById('promocode').classList.toggle('hide')
		setTimeout(() => closePromo(), 1000);
	}

	return (
		<div className='promocode' id='promocode' >
			<form onSubmit={formik.handleSubmit}>
				<div><i className='icopromo' onClick={close}><IoMdClose /></i></div>
				<h5 style={{ paddingLeft: "8px" }}>We are on promotion</h5>
				<h3 style={{ paddingTop: "25px" }}>{t('promotitle1')}</h3>
				<span className='frais'> <span style={{ fontSize: 40 }}>0</span> % des frais</span>
				<div className="poli">
					{/* <label className='til'>{t('promotitle2')}</label> */}
					<input className='inp' value={formik.values.code} type="text" id="code" name="code" placeholder={t('promotitle3')}
						onChange={formik.handleChange} onBlur={() => setTouched('code')} autoComplete="off"
					/>
					<div className='promoerreur'>{formik.errors.code && formik.touched.code ? (<div>{formik.errors.code}</div>) : null}</div>
				</div>
				<button type='submit' className='btncodesuccess' onClick={formik.handleSubmit} id="btnkyc">
					{
						loading ? <ReactLoading type="spin" color="#fff" width="20px" height="20px" /> : t('promotitle4')
					}
				</button>
				{/* <button type='submit' onClick={formik.handleSubmit} className='btncodesuccess'>{t('promotitle4')}</button> */}
			</form>
			<button onClick={close} className='btncodelost'>{t('promotitle5')}</button>



		</div>
	)
}


const mapStateToProps = state => ({
	User: state.userReducer.user
})


export default connect(mapStateToProps)(PromoCode)