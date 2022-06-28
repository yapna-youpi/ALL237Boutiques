import React, { useState } from 'react'
import { Modal } from 'react-responsive-modal'
import ReactPlayer from 'react-player'
import { useTranslation } from 'react-i18next'

import './steps.css'
import user from './user-alt-7.svg';
import phone from './stock-mobile.svg';
import bitcoin from './bitcoin-true.svg';


let videoList={
    en: ["https://www.youtube.com/watch?v=kMVa9Pl7xkk", "https://www.youtube.com/watch?v=KybgI7d2Raw", "https://www.youtube.com/watch?v=SoOCZrCLYKA", "https://www.youtube.com/watch?v=_a8bA7GTJ98" ],
    fr: ["https://www.youtube.com/watch?v=IBqu-9rsPqU", "https://www.youtube.com/watch?v=gX9UIaq8Nyo", "https://www.youtube.com/watch?v=XjiPtxU9rVk", "https://www.youtube.com/watch?v=39KyJBsKrLU" ]
}

function Steps() {
    const { t } = useTranslation()
    const [state, setState]=useState({open: false, video: 0})

    const showVideo=(number)=>{
        setState({open: true, video: number})
    }
    let lang='en'
    try {
        let lang=JSON.parse(localStorage.getItem("lang")).lang
    } catch (error) {
    }
    const hideVideo=()=>setState({...state, open: false})
    return (
        <div className="steps">
            <h1> <span></span> {t('stepsTitle')}</h1>
            <div className="steps-container">
                <div className="step" data-aos="zoom-in" data-aos-delay="300" data-aos-once="true">
                    <div className="img-container" onClick={()=>showVideo(0)}>
                        <img src={user} alt="" />
                    </div>
                    <p data-aos="fade-right" data-aos-delay="350" data-aos-once="true">{ t('sousSteps1')}</p>
                    <a data-aos="fade-right" data-aos-delay="400" data-aos-once="true" href="/help/description" target="_blank"><span className='coli'>{t('sousSteps5')}</span></a>
                </div>
                <div className="step-line"></div>
                <div className="step" data-aos="zoom-in" data-aos-delay="500" data-aos-once="true" >
                    <div className="img-container" onClick={()=>showVideo(1)}>
                        <img src={phone} alt="" />
                    </div>
                    <p data-aos="fade-up" data-aos-delay="550" data-aos-once="true">{t('sousSteps2')}</p>
                    <a data-aos="fade-up" data-aos-delay="600" data-aos-once="true" href="/help/description" target="_blank"><span className='coli'>{t('sousSteps5')}</span></a>
                </div>
                <div className="step-line"></div>
                <div className="step" data-aos="zoom-in" data-aos-delay="700" data-aos-once="true">
                    <div className="img-container" onClick={()=>showVideo(3)}>
                        <img src={bitcoin} alt="" />
                    </div>
                    <p data-aos="fade-left" data-aos-delay="750" data-aos-once="true">{t('sousSteps3')}</p>
                    <a data-aos="fade-left" data-aos-delay="800" data-aos-once="true" href="/help/description" target="_blank"><span className='coli'>{t('sousSteps5')}</span></a>
                </div>
                <Modal open={state.open} onClose={hideVideo} showCloseIcon={false} closeOnOverlayClick={true} center classNames={{overlay: "step-overlay", modal: 'step-modal'}} >
                    <ReactPlayer url={videoList[lang][state.video]} controls />
                </Modal>
            </div>
            <h5>{ t('sousSteps4')}</h5>
        </div>
    )
}

export default Steps
