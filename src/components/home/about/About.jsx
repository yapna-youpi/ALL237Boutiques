import React from 'react'
import { useTranslation, Trans } from 'react-i18next'
import { useHistory } from 'react-router-dom'

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
                <img src={image} alt="" className="picture"/>
                <div className="">
                <p>
                <Trans>aboutText</Trans>
                </p>
                <button onClick={()=>window.location.href="/more"}> {t('aboutButton')} </button>
                <b>{t('aboutSummary')}</b>
                <a href="https://soon.ipercash.fr/help/2" target="_blank"><div className="sentence"> <img src={chevron} alt="" /> <span> {t('aboutListe1')} </span> </div></a>
                <a href="https://soon.ipercash.fr/help/3" target="_blank"><div className="sentence"> <img src={chevron} alt="" /> <span> {t('aboutListe2')} </span> </div></a>
                <a href="https://soon.ipercash.fr/help/1" target="_blank"><div className="sentence"> <img src={chevron} alt="" /> <span> {t('aboutListe3')} </span> </div></a>
                </div>
            </div>
        </div>
    )
}

export default About
