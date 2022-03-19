import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next'
import Modal from 'react-responsive-modal';

import './success.css'
import Bilan from './Bilan';
import complete from './complete.png';
import trusty from './trusty.png'
import google from './googleform.png'

function Success() {
    const { t } = useTranslation();
    const [state, setState] = useState({})
    const [show, setShow] = useState(false)
    let history = useHistory()
    useEffect(() => {
        let data = JSON.parse(sessionStorage.getItem('data'))
        // console.log("the data ", data)
        if(!data) history.push('/')
        else {
            setState(data)
            sessionStorage.removeItem('data')
        }
    }, [])

    const closeModal=()=>setShow(false)

    console.log("the state ", state)

    return (
        <div id="complete" className="complete" >
            <Modal open={show} center onClose={closeModal} onEscKeyDown={true} closeOnOverlayClick={true} >
                <Bilan data={state} />
            </Modal>
            <h1 style={{ textAlign: "center" }}>{t('sucessTitle1')}</h1>
            <div className="c-content">
                <img src={complete} alt="" />
                <div style={{ textAlign: "center" }}>
                    {state.operation === 'credit' && <h5>{t('sucessTitle2')}  </h5>}
                    {state.operation === 'buy' && <h5>{t('sucessTitle3')}  </h5>}
                    {state.operation === 'sell' && <h5>{t('sucessTitle4')}  </h5>}

                    <div >
                        <h3>{t('completeTitle')}</h3>
                        <div className="rates">
                            <div className="rate">
                                <a href="https://uk.trustpilot.com/evaluate/ipercash.fr?utm_medium=trustbox&utm_source=TrustBoxReviewCollector" target='_blank'>
                                    <h6 style={{ marginBottom: '20px' }}>{t('completeSous1')}</h6>
                                    <img style={{ width: "125px", padding: '10px' }} src={trusty} alt="" />
                                </a>
                            </div>
                            {/* <h1>Or</h1> */}
                            <div className="rate">
                                <a href="https://docs.google.com/forms/d/e/1FAIpQLSdO5v8JpRHOKlRkLKse0eK6flW3vyDY2spf7EAa-uzcpPJebg/viewform" target="_blank" >
                                    <h6 style={{ marginBottom: '20px' }}>{t('completeSous1')}</h6>
                                    <img style={{ width: "125px", padding: '10px' }} src={google} alt="" />
                                </a>
                            </div>
                        </div>
                        <div className="bilan-button" onClick={()=>setShow(true)}>
                            Show Details
                        </div>
                    </div>
                    <span style={{ textAlign: "center" }} onClick={() => history.push('/')} >{t('sucessTitle6')}</span>
                </div>
            </div>
        </div>
    )
}

export default Success
