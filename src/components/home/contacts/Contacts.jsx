import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next'
import { MdLocationPin } from 'react-icons/md' 
import { BsTelephoneFill } from 'react-icons/bs' 
import { HiMail } from 'react-icons/hi' 
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'
import ReactLoading from 'react-loading';
import 'react-toastify/dist/ReactToastify.css';

import './contacts.css'
import Form from './Form';
import enseigne from './images/enseigne.png';
// import facebook from './images/facebook.svg';
// import instagram from './images/instagram.svg';
import linkedin from './images/linkedin.svg';
// import twitter from './images/twitter.svg';
// import location from './images/location-pin.svg';
// import message from './images/ui-message.svg';
// import phone from './images/phone.svg';

import { apiUrl } from '../../../utils/utilFunctions';

function Contacts() {
const { t } = useTranslation()
 
    const [email, setEmail]=useState("")
    const [ load, setLoad] = useState(false)
    
    const handleSubmit= async(e)=>{
        e.preventDefault()
        setLoad(true);
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
            setLoad(false);
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
            setLoad(false);
            toast.error("can't add this e-mail", {
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
                            <a href="https://www.linkedin.com/company/ipercash" target="_blank" > <div className="social-icon linkedin "><FaLinkedin size={28} /> </div></a> 
                            <a href="https://twitter.com/IPERCash?s=09" target=" " > <div className="social-icon twitter "> <FaTwitter size={28} /> </div></a> 
                            <a href="https://www.facebook.com/IPERCash-109875781411686/" target="_blank" > <div className="social-icon facebook"> <FaFacebookF size={28} /> </div></a> 
                            <a href="https://www.instagram.com/iper.cash/" target="_blank" > <div className="social-icon instagram"> <FaInstagram size={32} /> </div></a>
                        </div>
                    </div>
                    <div className="contact">
                        <div className="">
                            <div className="social-icon">< MdLocationPin size={32} /><div className="social-icon-couvre"></div> </div>
                            <div className="social-text">{t('sousContact2')} <br/> {t('sousContact3')}</div>
                        </div>
                        <div className="">
                        <a href='mailto:info@ipercash.fr'><div className="social-icon"><HiMail size={32} /><div className="social-icon-couvre"></div> </div></a>
                            <div className="social-text"><a href='mailto:info@ipercash.fr'>{t('sousContact4')}</a></div>
                        </div>
                        <div className="">
                            <a className='link-whatsapp' href="https://api.whatsapp.com/send?phone=33644676176"><div className="social-icon"><BsTelephoneFill size={24} /><div className="social-icon-couvre"></div> </div></a>
                            <div className="social-text"><a className='link-whatsapp' href="tel:+33 9 70 46 04 46">{t('sousContact5')}</a><br/><a className='link-whatsapp' href="https://api.whatsapp.com/send?phone=33644676176">{t('sousContact6')}</a></div>
                        </div>
                    </div>
                    <div className="newsletter">
                        <h2>{t('sousContact7')}</h2>
                        <p> {t('sousContact8')}  </p>
                        {/* <p> Pour etre informer continuellement de nos avancees et des differentes modifications. </p> */}
                        <form className="address-field " onSubmit={(e)=>handleSubmit(e)}>
                            <button className='btn-newsletter'
                                    type='submit'
                            >  
                            <div className='btn-loader'>
                                { load? (<ReactLoading  type="spin"  color="#ffffff" width="28px" height="28px" 
                                />) : t('sousContact9') } 
                            </div>
                                
                            </button>
                    
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