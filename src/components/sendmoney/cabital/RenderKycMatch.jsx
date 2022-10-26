import React, { useState } from 'react'
import country from 'country-list-js';
import ReactLoading from 'react-loading'
import { useFormik } from 'formik';
import * as yup from 'yup';


import "./cabital.css"

const validationSchema = yup.object({
    name: yup
        .string()
        .min(1, "Please enter name more than 1 character")
        .required("This field is required"),
    id: yup
        .string()
        .min(1, "Please enter id more than 1 character")
        .required("This field is required"),
    id_document: yup
        .array()
        .nullable(),
    dob: yup
        .string()
        .min(1, "Please enter name more than 1 character")
        .required("This field is required"),
    issued_by: yup
        .string()
        .min(1, "Please enter name more than 1 character")
        .required("This field is required"),
});

const RenderKycMatch = ({ match }) => {

    //initialise formik
    const formik = useFormik({
        initialValues: {
            name: '',
            id_document: '',
            id: '',
            dob: "", 
            issued_by: "AFG"
        },
        validationSchema: validationSchema,
        onSubmit: values => {
          alert(JSON.stringify(values, null, 2));
        },
      });

    const [state, setState] = useState({ name: "", id_document: "ID", id: "", dob: "", issued_by: "AFG" })
    const [loading, setLoading] = useState(false)

    const _handleChange = (target) => setState({ ...state, [target.name]: target.value })
    const _handleClick = async () => {
        // console.log("the state ", state)
        setLoading(true)
        await match(formik.values)
        setLoading(false)
    }

    //initialize of country list to alphabetic letters init
    var country_names = country.names().sort();

    // console.log(country_names)

    //  let found = country_code.filter(country => {
    //     country_names === 
    //     country.name === races.Circuit.Location.country;
    //  })

    const handleSelect = (e) => {
        console.log(e.target.value)
        let found = country.findByName(e.target.value);
        // console.log('le pays selectionner', found.code.iso3)
        // setState({ ...state, issued_by: found.code.iso3 })
        formik.setFieldValue('issued_by',found.code.iso3)


    }
    console.log(formik.values)
    // console.log('the state', state)
    return (
        <div className="kycmatch lettercolor">
            <h3 className="lettercolor">Enter your informations</h3>
            <div className="kycformgroup">
                <label className='kyclabel' htmlFor="name">name</label>
                <input className='inpu'  type="text" name="name" value={formik.values.name} id="name" onChange={formik.handleChange} />
                <div className='kycerreur'>{formik.errors.name && formik.touched.name ? (<div>{formik.errors.name}</div>) : null}</div>
            </div>
            <div className="kycformgroup">
                <label className="kyclabel" htmlFor="doc_type">document type</label>
                <select className='inpuselect' name="id_document" value={formik.values.id_document} id="doc_type"  onChange={formik.handleChange} >
                    <option value="ID">ID Card</option>
                    <option value="PASSPORT">Passport</option>
                </select>
                <div className='kycerreur'>{formik.errors.id_document && formik.touched.id_document ? (<div>{formik.errors.id_document}</div>) : null}</div>
            </div>
            <div className="kycformgroup">
                <label className='kyclabel' htmlFor="doc_id">document id</label>
                <input className='inpu' type="text" name="id" value={formik.values.id} id="doc_id"  onChange={formik.handleChange}  />
                <div className='kycerreur'>{formik.errors.id && formik.touched.id ? (<div>{formik.errors.id}</div>) : null}</div>
            </div>
            <div className="kycformgroup">
                <label className='kyclabel' value={formik.values.issued_by} htmlFor="issued_by">issued_by id</label>
                <select className='inpuselect' name="issued_by" id="doc_land" onChange={formik.handleChange}>
                    {country_names.map((land, i) => <option value={land} key={i} >{land}</option>)}

                </select>
                <div className='kycerreur'>{formik.errors.issued_by && formik.touched.issued_by ? (<div>{formik.errors.issued_by}</div>) : null}</div>
                {/* <input className='inpu' type="text" name="issued_by" id="issued_by" onChange={e => _handleChange(e.target)} /> */}
            </div>
            <div className="kycformgroup">
                <label className='kyclabel' htmlFor="dob">date of birth</label>
                {/* <input className='inpu' type="text" name="dob" id="dob" placeholder='yyyy-mm-jj' onChange={e => _handleChange(e.target)} /> */}
                <input className='inpu' type="date" value={formik.values.dob} name="dob" id="dob"  
                        error={formik.touched.dob && Boolean(formik.errors.dob)} helperText={formik.touched.dob && formik.errors.dob}
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


export default RenderKycMatch