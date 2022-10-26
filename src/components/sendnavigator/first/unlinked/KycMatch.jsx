import React, { useState } from 'react'
import country from 'country-list-js';
import ReactLoading from 'react-loading'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { sendToApi } from '../../../../utils/utilFunctions';
import { useTranslation } from 'react-i18next'

// import "./cabital.css"



const KycMatch = ({ matched, User }) => {
    const { t } = useTranslation()
    const [loading, setLoading] = useState(false)

    const validationSchema = yup.object({
        name: yup
            .string()
            .required(`${t('kycMatch1')}`),
        id: yup
            .string()
            .required(`${t('kycMatch2')}`),
        id_document: yup
            .string()
            .required(`${t('kycMatch3')}`),
        dob: yup
            .string()
            .min(1, `${t('kycMatch4')}` )
            .required( `${t('kycMatch5')}`),
        issued_by: yup
            .string()
            .required( `${t('kycMatch6')}`),
    });
    const formik = useFormik({
        initialValues: {
            name: '',
            id_document: 'ID',
            id: '',
            dob: "",
            issued_by: "AFG"
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            setLoading(true)
            await matchAccount(values)
            setLoading(false)
        },
    });

    const changeCountry = (name) => {
        // console.log("the name ", name)
        let countryCode = country.findByName(name).code.iso3
        formik.setFieldValue('issued_by', countryCode)
    }
    const matchAccount = async (data) => {
        let { response } = await sendToApi('cabital/kycmatch', { ...data, userId: User.userId }, User.token)
        // console.log("the response ", response)
        if (response.match) return matched()
        else {
            return formik.setErrors(mismatchField(response.mismatch))
        }
    }
    const mismatchField = (list) => {
        let errorText = "The value of this field is not correct"
        return {
            name: list.indexOf("name") + 1 ? errorText : "",
            id_document: list.indexOf("id_document") + 1 ? errorText : "",
            id: list.indexOf("id_no") + 1 ? errorText : "",
            dob: list.indexOf("dob") + 1 ? errorText : "",
            issued_by: list.indexOf("issued_by") + 1 ? errorText : "",
        }
    }

    return (
        <div className="kycmatch lettercolor">
            <h3 className="lettercolor">${t('kycMatch7')} </h3>
            <div className="kycformgroup">
                <label className='kyclabel' htmlFor="name">${t('kycMatch8')}</label>
                <input className='inpu' type="text" name="name" value={formik.values.name} id="name" onChange={formik.handleChange} />
                <div className='kycerreur'>{formik.errors.name && formik.touched.name ? (<div>{formik.errors.name}</div>) : null}</div>
            </div>
            <div className="kycformgroup">
                <label className="kyclabel" htmlFor="doc_type">${t('kycMatch9')}</label>
                <select className='inpuselect' name="id_document" value={formik.values.id_document} id="doc_type" onChange={formik.handleChange} >
                    <option value="ID">${t('kycMatch10')}</option>
                    <option value="PASSPORT">${t('kycMatch11')}</option>
                </select>
                <div className='kycerreur'>{formik.errors.id_document}</div>
            </div>
            <div className="kycformgroup">
                <label className='kyclabel' htmlFor="doc_id">${t('kycMatch12')}</label>
                <input className='inpu' type="text" name="id" value={formik.values.id} id="doc_id" onChange={formik.handleChange} />
                <div className='kycerreur'>{formik.errors.id && formik.touched.id ? (<div>{formik.errors.id}</div>) : null}</div>
            </div>
            <div className="kycformgroup">
                <label className='kyclabel' value={formik.values.issued_by} htmlFor="issued_by">${t('kycMatch13')}</label>
                <select className='inpuselect' name="issued_by" id="doc_land" onChange={(e) => changeCountry(e.target.value)}>
                    {country.names().sort().map((land, i) => <option value={land} key={i} >{land}</option>)}
                </select>
                <div className='kycerreur'>{formik.errors.issued_by && formik.touched.issued_by ? (<div>{formik.errors.issued_by}</div>) : null}</div>
                {/* <input className='inpu' type="text" name="issued_by" id="issued_by" onChange={e => _handleChange(e.target)} /> */}
            </div>
            <div className="kycformgroup">
                <label className='kyclabel' htmlFor="dob">${t('kycMatch14')}</label>
                {/* <input className='inpu' type="text" name="dob" id="dob" placeholder='yyyy-mm-jj' onChange={e => _handleChange(e.target)} /> */}
                <input className='inpu' type="date" value={formik.values.dob} name="dob" id="dob"
                    onChange={formik.handleChange} />
                <div className='kycerreur'>{formik.errors.dob && formik.touched.dob ? (<div>{formik.errors.dob}</div>) : null}</div>
            </div>
            <button className="btnkyc" onClick={formik.handleSubmit} id="btnkyc">
                {
                    loading ? <ReactLoading type="spin" color="#fff" width="20px" height="20px" /> : "Match"
                }
            </button> <br />
        </div>
    )
}


export default KycMatch