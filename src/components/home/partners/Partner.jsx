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
import visa from './images/visa.svg';
import cinetpay from './images/cinetpay.svg'
import intouch from './images/intouch.svg'

function Partner() {
    return (
        <div className="partners">
            <div className="partners-container">
                <img src={mercuryo} alt="mercurio"/>
                <img src={orange} alt="orange"/>
                <img src={mobi} alt="mobimali"/>
                <img src={wizall} alt="wizall"/>
                <img src={cinetpay} alt="cinetpay"/>
                <img src={free} alt="free"/>
                <img src={mtn} style={{marginRight:"60px"}} alt="mtn"/>
                <img src={sepa} alt="sepa"/>
                <img src={moov} style={{marginRight:"75px"}} alt="moov"/>
                <img src={visa} style={{marginRight:"75px",maxWidth:"150px"}} alt="visa"/>
                <img src={intouch} alt="intouch"/>
                <img src={mercuryo} alt="mercurio"/>
                <img src={orange} style={{marginRight:"30px"}} alt="orange"/>
                <img src={mobi} alt="mobimali"/>
                <img src={wizall} alt="wizall"/>
                <img src={mobiBurki} style={{marginRight:"120px"}} alt="mobiburki"/>
                <img src={mtn} alt="mtn"/>
                <img src={sepa} alt="sepa"/>
                <img src={moov} alt="moov"/>
            </div>
            {/* <div className="circle"></div> */}
            {/* <div className="circle"></div> */}
            {/* <div className="circle"></div> */}
            {/* <div className="circle"></div> */}
        </div>
    )
}

export default Partner
