import React from 'react'

import './partner.css'
import mercuryo from './images/mercuryo.svg';
import mtn from './images/mtn.svg';
import orange from './images/orange.svg';
import sepa from './images/sepa.svg';
import free from './images/free.svg';
import mobiBurki from './images/mobi-burki.svg';
import mobi from './images/mobi.svg'
import moov from './images/moov.svg';
import wizall from './images/master2.svg';
import yup from './images/yup.svg';

function Partner() {
    return (
        <div className="partners">
            <div className="partners-container">
                <img src={mercuryo} alt=""/>
                <img src={orange} alt=""/>
                <img src={mobi} alt="mobimali"/>
                <img src={wizall} alt=""/>
                <img src={mobiBurki} alt=""/>
                <img src={free} alt=""/>
                <img src={mtn} style={{marginRight:"60px"}} alt=""/>
                <img src={sepa} alt=""/>
                <img src={moov} style={{marginRight:"120px"}} alt=""/>
                <img src={yup} style={{marginRight:"120px"}} alt=""/>
                <img src={mercuryo} alt=""/>
                <img src={orange} style={{marginRight:"50px"}} alt=""/>
                <img src={mobi} alt="mobimali"/>
                <img src={wizall} alt=""/>
                <img src={mobiBurki} style={{marginRight:"120px"}} alt=""/>
                <img src={free} alt=""/>
                <img src={mtn} alt=""/>
                <img src={sepa} alt=""/>
                <img src={moov} alt=""/>
            </div>
            <div className="circle"></div>
            {/* <div className="circle"></div> */}
            {/* <div className="circle"></div> */}
            <div className="circle"></div>
        </div>
    )
}

export default Partner
