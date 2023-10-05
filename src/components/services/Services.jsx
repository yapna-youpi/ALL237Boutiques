import React from 'react'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import './services.css'
import Countries from './Countries';

function Services() {
    let hisoty=useHistory()

    const { t } = useTranslation();
    return (
        <div className="services" id="services">
            <h1> {t('servicesTitle')} <span></span> </h1>
            {/* <h3>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur suscipit tenetur officiis saepe eligendi, dolor quidem.</h3> */}
            <div className="services-container">
                <div className="service" onClick={()=>hisoty.push('/buycrypto')}>
                    <h3> {t('servicesTitle1')} </h3>
                    <p>{t('sousService1')}</p>
                    <div className="icone"> <img src="" alt="ico1"/> </div>
                </div>
                <div className="service" onClick={()=>hisoty.push('/sellcrypto')}>
                    <h3>{t('servicesTitle2')} </h3>
                    {/* <p> Withdraw your cryptocurrencies by transferring it instantaneously to a Mobile Money account </p> */}
                    <p>{t('sousService2')} </p>
                    <div className="icone"> <img src="" alt="ico2"/> </div>
                </div>
                <div className="service">
                    <h3> {t('servicesTitle3')} </h3>
                    <p> {t('sousService3')} </p>
                    <Countries />
                    <div className="icone"> <img src="" alt="ico3"/> </div>
                </div>
            </div>
        </div>
    )
}


export default Services