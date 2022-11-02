import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { sendToApi } from '../../utils/utilFunctions';

import './comingsoon.css'
import image from './mechanical-gears.svg';

function ComingSoon({ User }) {
    useEffect(() => {
        console.log("the email ", User.userEmail)
        sendToApi('useremail', {email: User.userReducer})
    }, [])


    return (
        <div id="coming" className="coming">
            <img src={image} alt="commin-soon" />
            <div className="">
                <h1>The application is under maintenance</h1>
                <h3> You will be notified when the service is available again. </h3>
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

