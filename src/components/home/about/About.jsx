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
            <h1> {t('aboutTitle')} <span></span></h1>
            <div className="about-container">
                <img data-aos="fade-up-right" data-aos-once="true" src={image}  alt="" className="picture"/>
                <div className="">
                    <p>
                    <Trans>aboutText</Trans>
                    </p>
                    <button><a className='btn-flip' style={{fontSize:"22px",padding:"12px"}} href="/more">{t('aboutButton')}</a> </button>
                    <b>{t('aboutSummary')}</b>
                    <div data-aos="fade-left" data-aos-delay="100" data-aos-once="true"  className="sentence"> <img src={chevron} alt="" /> <span> {t('aboutListe1')} </span> </div>
                    <div data-aos="fade-right" data-aos-delay="150" data-aos-once="true" className="sentence"><img src={chevron} alt="" /> <span> {t('aboutListe2')} </span> </div>
                    <div data-aos="fade-left" data-aos-delay="200" data-aos-once="true" className="sentence"> <img src={chevron} alt="" /> <span> {t('aboutListe3')} </span> </div>
                </div>
            </div>
        </div>
    )
}

export default About
