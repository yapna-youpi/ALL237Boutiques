import React, { useState } from 'react'
import { Modal } from 'react-responsive-modal'
import ReactPlayer from 'react-player'
import { useTranslation } from 'react-i18next'

import './steps.css'
import user from './user-alt-7.svg';
import phone from './stock-mobile.svg';
import bitcoin from './bitcoin-true.svg';

let videoList=["", "https://www.youtube.com/embed/PSyUcb3fFtY", "https://www.youtube.com/embed/sSiCc7uC1MA", "https://www.youtube.com/embed/QX0Su9GHwK0"]

function Steps() {
const { t } = useTranslation();

    const [state, setState]=useState({open: false, video: 0})
    const showVideo=(number)=>{
        setState({open: true, video: number})
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
                    <p>{ t('sousSteps1')}
                    </p>
                    
                </div>
                <div className="step-line"></div>
                <div className="step">
                    <div className="img-container" onClick={()=>showVideo(1)}>
                        <img src={phone} alt="" />
                    </div>
                    <p>{t('sousSteps2')}</p>
                    <a href="https://soon.ipercash.fr/help/1" target="_blank"><u>{t('sousSteps5')}</u></a>
                </div>
                <div className="step-line"></div>
                <div className="step">
                    <div className="img-container" onClick={()=>showVideo(3)}>
                        <img src={bitcoin} alt="" />
                    </div>
                    <p>{t('sousSteps3')}</p>
                    <a href="https://soon.ipercash.fr/help/2" target="_blank"><u>{t('sousSteps5')}</u></a>
                    
                </div>
                <Modal open={state.open} onClose={hideVideo} showCloseIcon={false} closeOnOverlayClick={true} center classNames={{overlay: "step-overlay", modal: 'step-modal'}} >
                    <ReactPlayer  url={videoList[state.video]} controls  />
                    {/* 
                    <iframe className="video"  src={videoList[state.video]} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
                </Modal>
            </div>
            <h5>{ t('sousSteps4')}</h5>
        </div>
    )
}

export default Steps
