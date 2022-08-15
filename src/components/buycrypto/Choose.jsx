import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { FiSmartphone } from 'react-icons/fi';
import { FaRegCreditCard } from 'react-icons/fa';
import { CgChevronDoubleDownR } from 'react-icons/cg'
import { useTranslation } from 'react-i18next'
import { ImForward } from "react-icons/im";

import './chooses.css'
import visa from './images/visa.webp';
import master from './images/master.png';
import google from './images/google.png';
import apple from './images/apple.png';
import mtn from './images/mtn.png'
import moov from './images/moov.png'
import yup from './images/yup.png'
import orang from './images/orange.png'
import mobi from './images/mobi-burki.png'

function Choose() {
    const { t } = useTranslation();
    let history = useHistory()

    const [isVisible, setisVisible] = useState(false);
    const [isVisible2, setisVisible2] = useState(false);

    const handleImag = () => {
        setisVisible(v => !v);

    }
    const handleImag2 = () => {
        setisVisible2(v => !v);

    }


    const imag = isVisible ? (<div className="hiden">
        <img onClick={() => history.push('/buycrypto/' + process.env.REACT_APP_BUY_LINK)} src={visa} alt="visa" />
        <img onClick={() => history.push('/buycrypto/' + process.env.REACT_APP_BUY_LINK)} src={master} alt="mster" />
        <img onClick={() => history.push('/buycrypto/' + process.env.REACT_APP_BUY_LINK)} src={google} alt="google" />
        <img onClick={() => history.push('/buycrypto/' + process.env.REACT_APP_BUY_LINK)} src={apple} alt="apple" />
    </div>
    ) : '';

    const imag2 = isVisible2 ? (<div className="hiden">
        <img onClick={() => history.push('/buycrypto/' + process.env.REACT_APP_BUY_LINK)} src={mtn} alt="mtn" />
        <img onClick={() => history.push('/buycrypto/' + process.env.REACT_APP_BUY_LINK)} src={moov} alt="moov" />
        <img onClick={() => history.push('/buycrypto/' + process.env.REACT_APP_BUY_LINK)} src={mobi} alt="mobi" />
        <img onClick={() => history.push('/buycrypto/' + process.env.REACT_APP_BUY_LINK)} src={yup} alt="yup" />
        <img onClick={() => history.push('/buycrypto/' + process.env.REACT_APP_BUY_LINK)} src={orang} alt="orang" />
    </div>
    ) : '';

    return (
        <div id="choose" className="choose" style={{ color: '#707070' }}>
            <h1>{t('choosesTitle')}</h1>
            <div className="chooses">
                <div className="credit-card way">
                    <div className="way2">
                        <div className="head" onClick={() => history.push('/buycrypto/' + process.env.REACT_APP_BUY_LINK)}>
                            <h2>{t('chosesSous1')}</h2>
                            <div className="text-card">{t('chosesSous2')}</div>
                            <hr className="card-ligne" />
                        </div>
                        <div className="bodycard">
                            <FiSmartphone size={60} />
                            <span onClick={handleImag2} className="card-show"> < ImForward /> </span>
                        </div>
                    </div>
                    {imag2}
                </div>
                <span className="hr" />
                <div className="mobile-money way" >
                    <div className="way2">
                        <div className="head" onClick={() => history.push('/buycrypto/card')}>
                            <h2>{t('chosesSous4')}</h2>
                            <div className="text-card">{t('chosesSous3')}  </div>
                            <hr className="card-ligne" />
                        </div>
                        <div className="bodycard">
                            <FaRegCreditCard size={60} />
                            <span onClick={handleImag} className="card-show"> <ImForward /> </span>

                        </div>
                    </div>
                    {imag}
                </div>
            </div>
        </div>
    )
}

export default Choose