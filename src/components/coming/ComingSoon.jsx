import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { sendToApi } from '../../utils/utilFunctions';
import { useTranslation } from 'react-i18next';

import './comingsoon.css'
import image from './mechanical-gears.svg';

function ComingSoon({ User }) {
    const { t } = useTranslation();
    useEffect(() => {
        console.log("the email ", User.userEmail)
        sendToApi('useremail', {email: User.userReducer})
    }, [])


    return (
        <div id="coming" className="coming">
            <img src={image} alt="commin-soon" />
            <div className="">
                <h1>{t('comingSoon1')} </h1>
                <h3>{t('comingSoon2')}  </h3>
                {/* <div className="form">
                    <input type="email" placeholder="email"/>
                    <button> notify me </button>
                </div>
                <span> Back to home page </span> */}
            </div>
        </div>
    )
}

const mapStateToProps = state => ({ User: state.userReducer.user })

export default connect(mapStateToProps)(ComingSoon)

