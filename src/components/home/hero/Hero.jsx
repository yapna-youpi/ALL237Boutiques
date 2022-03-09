import React, { useEffect } from 'react'
import { GoChevronUp } from 'react-icons/go'
import { useTranslation } from 'react-i18next'

import './hero.css'
import image from './images/hero.svg';
import camer from './images/camer.png';
import sene from './images/sene.png';
import ivc from './images/ivc.png';
// import mali from './images/mali.png';
// import burki from './images/burki.png';
// import guine from './images/guine.png';


function Hero() {
    const { t }=useTranslation()
    
   useEffect(() => {
        let rootElement=document.querySelector('.approot')
        // console.log(rootElement)
        let toUp=document.querySelector('.to-up')
        if(rootElement) rootElement.addEventListener('scroll', ()=>{
            // console.log(rootElement.scrollTop, rootElement.scrollHeight)
            let [total, current]=[ rootElement.scrollHeight, rootElement.scrollTop ]
            // console.log("cap ", current/total)
            if(current/total >= 0.25) {
                // console.log("cap")
                toUp.classList.add('appear')
            }
            else {
                toUp.classList.remove('appear')
            }
        }, false)
        return () => {
        }
    }, [])

    // useEffect(() => {

    // }, [])

    return (
        <div className="hero" id="hero">
            <img src={image} alt=""/>
            <div className="presentation">
                <div className="">
                    {/* {navigator.appVersion} */}
                    <h1> {t('heroTitle')} </h1>
                    <p> {t('heroText')}  </p>
                    <a href="/#operations"><button> {t("heroButton")} </button></a>
                </div>
                <div className="countries">
                    <h3> {t("available")} </h3>
                    <div className="country">
                        <img src={camer} alt=""/>
                        <img src={sene} alt=""/>
                        <img src={ivc} alt=""/>
                        {/* <img src={mali} alt=""/>
                        <img src={burki} alt=""/>
                        <img src={guine} alt=""/> */}
                    </div>
                </div>
                <div className="to-up"> <a href="/#header"><GoChevronUp size={40} /> </a> </div>
            </div>
        </div>
    )
}

export default Hero
