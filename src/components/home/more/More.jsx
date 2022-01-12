import React from 'react'
import ReactPlayer from 'react-player'
import { useTranslation } from 'react-i18next'

import phone from './imojies/emoji_u1f44b.svg'
import applaude from './imojies/1f44f.svg'
import femme from './imojies/femme.png'
import note from './imojies/270d.svg'
import './more.css' 


function More() {
    const { t } = useTranslation();
    return (
        <>
        <div className='more' id="more" >
           
            <section className="more-section" >
                <h1 className="more-title">{t('moreTitle1')}</h1>
                <h3 className="more-mot"><span >{t('moreSous1')}IPER</span>Cash </h3>
                <p>{t('moreSous2')}
                </p>
                <div className='player'><img style={{width:'100%'}} src={femme} /></div>
                <p>{t('moreSous3')}
                    <div className='img-phone'><img  src={phone} alt='emojie phone' /></div>
                </p>
                <p>{t('moreSous4')}
                    <div className='img-phone'><img  src={applaude} alt='emojie applaudissements' /></div><br/>
                    {t('moreSous5')}</p>
                <p style={{paddingBottom:'10px'}}>
                {t('moreSous6')}
                    <ol>
                        <li>{t('moreSous7')}</li>
                        <li>{t('moreSous8')}</li>
                        <li>{t('moreSous9')}</li>
                        <li>{t('moreSous10')}</li>
                    </ol>{t('moreSous11')} 
                    <div className='img-phone'><img  src={note} alt='emojie notes' /></div><br/>
                     <p>{t('moreSous12')}</p><br/>
                    <hr width='90%' height="2px" color="#ee5253"/>
                </p>
            </section>
        </div>
        
        
        </>
    )
}

export default More
