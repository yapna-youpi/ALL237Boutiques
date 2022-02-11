import React, { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';

import { apiUrl } from '../../../utils/utilFunctions';


function Form() {
    const { t } = useTranslation();
    const [state, setState]=useState({name: "", email: "", message: ""})
    const handleChange=(target)=>{
        setState({...state, [target.name]: target.value})
    }
    const handleSubmit= async(e)=>{
        e.preventDefault()
        console.log("submit")
        var options = {
            method: 'POST',
            url: apiUrl+"sendmail",
            headers: {'Content-Type': 'application/json'},
            data: state
        }
        setState({name: "", email: "", message: ""})
        let data=await axios.request(options).then(response=>response.data).catch(err=>({response: null}))
        console.log("la reponse", data)
        if(data.response) {
            toast.success('thank you \n have a nice day', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        } else {
            toast.error('message not send !', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        return false
    }
    // console.log(state)
    return (
        <>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
        <div className="form">
            <form onSubmit={e=>handleSubmit(e)}>
                <div className="form-group">
                    <label htmlFor="name">{t('formSous1')}</label>
                    <input type="text" value={state.name} placeholder={t('formSous5')} name="name" required id="name" className="ipp" onChange={e=>handleChange(e.target)} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">{t('formSous2')}</label>
                    <input type="email" value={state.email} placeholder={t('formSous2')} name="email" required id="email" className="ipp" onChange={e=>handleChange(e.target)} />
                </div>
                <div className="form-group">
                    <label htmlFor="">{t('formSous3')}</label>
                    <textarea  value={state.message} name="message" required id="" cols="30" rows="3" onChange={e=>handleChange(e.target)} />
                </div>
                <div className="form-group">
                    <button type="submit">{t('formSous4')}</button>
                </div>
            </form>
                {/* <button onClick={toasty}>show toast</button> */}
        </div>
        </>
    )
}

export default Form
