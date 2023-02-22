import React, { useEffect } from 'react'
import { GoChevronUp } from 'react-icons/go'
import { useTranslation } from 'react-i18next'

import './hero.css'
import image from './images/transfert_argent_international_moin_cher.svg';
// import video from './images/hero.mp4';
import camer from './images/camer.png';
import sene from './images/sene.png';
import ivc from './images/ivc.png';
import mali from './images/mali.png';
import burki from './images/burki.png';
import guine from './images/guine.png';


function Hero() {
    const { t }=useTranslation()
    
   useEffect(() => {
        let rootElement=document.querySelector('.approot')
        let toUp=document.querySelector('.to-up')
        if(rootElement) rootElement.addEventListener('scroll', ()=>{
            let [total, current]=[ rootElement.scrollHeight, rootElement.scrollTop ]
            if(current/total >= 0.25) {
                toUp.classList.add('appear')
            }
            else {
                toUp.classList.remove('appear')
            }
        }, false)
        return () => {
        }
    }, [])

    const loaded=()=>{
    }

    return (
        <div className="hero" id="hero">
                <img src={image} alt="bitcoin usdt ethereum"/>
            {/* <video src={video} alt="video" muted={true} autoPlay={true} loop={true} onLoadedData={(e)=>loaded(e)} /> */}
            <div className="presentation"   >
                <div className="present">
                    {/* {navigator.appVersion} */}
                    <h1 data-aos="fade-right" data-aos-duration="1300" data-aos-once="true"> {t('heroTitle')} </h1>
                    <p className='herotext' data-aos="fade-right" data-aos-delay="500" data-aos-duration="1300" data-aos-once="true" > {t('heroText')}  </p>
                    <a className='btn-flip' href="/#operations"> {t("heroButton")}</a>
                </div>
                <div  className="countries" data-aos="fade-right" data-aos-delay="800" data-aos-duration="1300" data-aos-once="true">
                    <h3 > {t("available")} {t('available2')} </h3>
                    <div className="country">
                        <img src={camer} alt="achat bitcoin cameroun"/>
                        <img src={sene} alt="achat bitcoin senegal"/>
                        <img src={ivc} alt="achat bitcoin cote d'ivoire"/>
                        {/* <img src={mali} alt="mali"/>
                        <img src={burki} alt="burkina"/>
                        <img src={guine} alt="guinée"/> */}
                    </div>
                </div>
                <div className="to-up"> <a href="/#header"><GoChevronUp size={40} /> </a> </div>
            </div>
        </div>
    )
}

export default Hero
