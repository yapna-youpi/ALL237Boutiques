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
        lang=JSON.parse(localStorage.getItem("lang")).lang
    } catch (error) {
    }
    const hideVideo=()=>setState({...state, open: false})
    return (
        <div className="steps">
            <h1> <span></span> {t('stepsTitle')}</h1>
            <div className="steps-container">
                <div className="step">
                    <div className="img-container" onClick={()=>showVideo(0)}>
                        <img src={user} alt="" />
                    </div>
                    <p>{ t('sousSteps1')}</p>
                    <a href="/help/description" target="_blank"><u>{t('sousSteps5')}</u></a>
                </div>
                <div className="step-line"></div>
                <div className="step">
                    <div className="img-container" onClick={()=>showVideo(1)}>
                        <img src={phone} alt="" />
                    </div>
                    <p>{t('sousSteps2')}</p>
                    <a href="/help/description" target="_blank"><u>{t('sousSteps5')}</u></a>
                    
                
                </div>
                <div className="step-line"></div>
                <div className="step">
                    <div className="img-container" onClick={()=>showVideo(3)}>
                        <img src={bitcoin} alt="" />
                    </div>
                    <p>{t('sousSteps3')}</p>
                    <a href="/help/description" target="_blank"><u>{t('sousSteps5')}</u></a>
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
