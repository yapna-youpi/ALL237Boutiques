import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next' 
import 'react-toastify/dist/ReactToastify.css';

import './contacts.css'
import Form from './Form';
import enseigne from './images/enseigne.png';
import facebook from './images/facebook.svg';
import instagram from './images/instagram.svg';
import linkedin from './images/linkedin.svg';
import twitter from './images/twitter.svg';
import location from './images/location-pin.svg';
import message from './images/ui-message.svg';
import phone from './images/phone.svg';

import { apiUrl } from '../../../utils/utilFunctions';

function Contacts() {
const { t } = useTranslation()
 
    const [email, setEmail]=useState("")
    
    const handleSubmit= async(e)=>{
        e.preventDefault()
        console.log("submit")
        var options = {
            method: 'POST',
            url: apiUrl+"addmail",
            headers: {'Content-Type': 'application/json'},
            data: {email: email}
        }
        setEmail("")
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
    return (
        <div className="contacts" id="contacts">
            <h1> <span></span>{ t('contactsTitle')} </h1>
            <div className="contact-container">
                <div className="details">
                    <div className="info">
                        <img src={enseigne} alt=""/>
                        <p>
                            { t('sousContact1')}
                            {/* our mission is to make cryptocurrencies accessible in all regions of africa and to make them a means of payment. follow us to participate in the achievement of this mission */}
                        </p>
                        <div className="socials">
                            <a href="https://www.linkedin.com/company/ipercash" target="_blank"> <div className="social-icon"> <img src={linkedin} alt="linkedin"/> </div><div className="social-icon-couvre1"></div> </a> 
                            <a href="https://twitter.com/IPERCash?s=09" target="_blank"> <div className="social-icon"> <img src={twitter} alt="twitter"/> </div><div className="social-icon-couvre2"></div> </a> 
                            <a href="https://www.facebook.com/IPERCash-109875781411686/" target="_blank"> <div className="social-icon"> <img src={facebook} alt="facebook"/> </div><div className="social-icon-couvre3"></div> </a> 
                            <a href="https://www.instagram.com/iper.cash/" target="_blank"> <div className="social-icon"> <img src={instagram} alt="instagram"/> </div><div className="social-icon-couvre4"></div> </a>
                        </div>
                    </div>
                    <div className="contact">
                        <div className="">
                            <div className="social-icon"> <img src={location} alt="location"/><div className="social-icon-couvre"></div> </div>
                            <div className="social-text">{t('sousContact2')} <br/> {t('sousContact3')}</div>
                        </div>
                        <div className="">
                            <div className="social-icon"> <img src={message} alt="message"/><div className="social-icon-couvre"></div> </div>
                            <div className="social-text">{t('sousContact4')}</div>
                        </div>
                        <div className="">
                            <div className="social-icon"> <img src={phone} alt="phone"/><div className="social-icon-couvre"></div> </div>
                            <div className="social-text"><a className='link-whatsapp' href="tel:+33 9 70 46 04 46">{t('sousContact5')}</a><br/><a className='link-whatsapp' href="https://api.whatsapp.com/send?phone=33644676176">{t('sousContact6')}</a></div>
                        </div>
                    </div>
                    <div className="newsletter">
                        <h2>{t('sousContact7')}</h2>
                        <p> {t('sousContact8')}  </p>
                        {/* <p> Pour etre informer continuellement de nos avancees et des differentes modifications. </p> */}
                        <form className="address-field " onSubmit={(e)=>handleSubmit(e)}>
                            <button > {t('sousContact9')} </button>
                            <input type="email" value={email} placeholder={t('sousContact10')} required onChange={(e)=>setEmail(e.target.value)} />
                        </form>
                    </div>
                </div>
                <Form />
                {/* <div className="newsletter"></div> */}
            </div>
        </div>
    )
}

export default Contacts