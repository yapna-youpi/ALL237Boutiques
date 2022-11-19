import React from 'react'
import { useTranslation, Trans } from 'react-i18next'
import { useHistory, Link} from 'react-router-dom'

import './about.css'
import image from './undraw_startup_life_2du2.svg';
import chevron from './stylish-right.svg';

function About() {
    const { t }=useTranslation()
    let history=useHistory()

    return (
        <div className="about" id="about" >
            <h2 > {t('aboutTitle')} <span></span></h2>
            <div className="about-container">
                <img data-aos="fade-up-right" data-aos-once="true" src={image}  alt="demande de cryptomonnaie en afrique" className="picture"/>
                <div className="">
                    <p>
                    <Trans>aboutText</Trans>
                    </p>
                    <button><a className='btn-flip' style={{fontSize:"22px",padding:"12px"}} href="/more">{t('aboutButton')}</a> </button>
                    <b>{t('aboutSummary')}</b>
                    <div data-aos="fade-left" data-aos-delay="100" data-aos-once="true"  className="sentence"> <img src={chevron} alt="fade-left" /> <h3 className="about-descrit"> {t('aboutListe1')} </h3> </div>
                    <div data-aos="fade-right" data-aos-delay="150" data-aos-once="true" className="sentence"><img src={chevron} alt="fade-right" /> <h3 className="about-descrit"> {t('aboutListe2')} </h3> </div>
                    <div data-aos="fade-left" data-aos-delay="200" data-aos-once="true" className="sentence"> <img src={chevron} alt="fade-left" /> <h3 className="about-descrit"> {t('aboutListe3')} </h3> </div>
                </div>
            </div>
        </div>
    )
}

export default About
