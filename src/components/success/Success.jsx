import React, { useState ,useEffect} from 'react'
import {useHistory} from 'react-router-dom';
import { useTranslation } from 'react-i18next'

import './success.css'
import complete from './complete.png';
import trusty from './trusty.png'
import google from './googleform.png'

function Success() {
    const { t } = useTranslation();
    const [state, setState]=useState({})
    let history=useHistory()
    useEffect(() => {
        let data=JSON.parse(sessionStorage.getItem('data'))
        console.log(data)
        if(!data) history.push('/')
        else {
            setState(data)
            sessionStorage.clear()
        }
    }, [])
    console.log(state)
    return (
        <div id="complete" className="complete" >
            <img src={complete} alt=""/>
            <div className="">
                <h1>{t('sucessTitle1')}</h1>
                {state.operation==='credit' && <h3>{t('sucessTitle2')}  </h3>}
                {state.operation==='buy' && <h3>{t('sucessTitle3')}  </h3>}
                {state.operation==='sell' && <h3>{t('sucessTitle4')}  </h3>}
                
                <div >
                    <h3>{t('completeTitle')}</h3>
                    <div className="rates">
                        <div className="rate">
                        <a href="https://uk.trustpilot.com/evaluate/ipercash.fr?utm_medium=trustbox&utm_source=TrustBoxReviewCollector" target='_blank'>
                            <h5>{t('completeSous1')}</h5>
                            <img style={{width:"85px",height:"50px"}} src={trusty} alt=""/>
                        </a>
                        </div>
                        {/* <h1>Or</h1> */}
                        <div className="rate">
                            <a href="https://docs.google.com/forms/d/e/1FAIpQLSdO5v8JpRHOKlRkLKse0eK6flW3vyDY2spf7EAa-uzcpPJebg/viewform" target="_blank" >
                            <h5>{t('completeSous1')}</h5>
                            <img style={{width:"85px",height:"50px"}} src={google} alt=""/>
                            </a>
                        </div>
                    </div>
                </div>
                <span  onClick={()=>history.push('/')} >{t('sucessTitle6')}  </span>
            </div>
        </div>
    )
}

export default Success
