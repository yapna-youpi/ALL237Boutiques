import React from 'react'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
// import { BsCurrencyBitcoin, BsCartPlusFill, BsCapslockFill } from 'react-icons/bs'
import buy from '../../../assets/buy.svg'
import sell from '../../../assets/blockchain.svg'
import send from '../../../assets/send.svg'
import './services.css'


function Services() {
    let hisoty=useHistory()

    const { t } = useTranslation();
    return (
        <div className="services" id="services">
            <h1> {t('servicesTitle')} <span></span> </h1>
            {/* <h3>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur suscipit tenetur officiis saepe eligendi, dolor quidem.</h3> */}
            <div className="services-container">
                <div className="servic"  onClick={()=>hisoty.push('/buycrypto')} data-aos="flip-left" data-aos-duration="2000" data-aos-once="true">
                    <h3> {t('servicesTitle1')} </h3>
                    <p>{t('sousService1')}</p>
                    <div className="icone" ><img src={buy} alt='buy' width='45px' /> </div>
                </div>
                <div className="service" onClick={()=>hisoty.push('/sellcrypto')} data-aos="flip-left" data-aos-duration="2000" data-aos-once="true" >
                    <h3>{t('servicesTitle2')} </h3>
                    {/* <p> Withdraw your cryptocurrencies by transferring it instantaneously to a Mobile Money account </p> */}
                    <p>{t('sousService2')} </p>
                    <div className="icone" ><img src={sell} alt='sell' width='40px' /> </div>
                </div>
                <div className="service" onClick={()=>hisoty.push('/sendmoney')} data-aos="flip-left" data-aos-duration="2000" data-aos-once="true" >
                    <h3> {t('servicesTitle3')} </h3>
                    <p> {t('sousService3')} </p>
                    
                    <div className="icone"><img src={send} alt='send' width='70px' /></div>
                </div>
            </div>
        </div>
    )
}


export default Services