import React from 'react'
import ReactLoading from 'react-loading'

const RenderLinking = ({ linkink, startRegistering }) => {
    // const [loading, setLoading]=React.useState(false)
    let text = ""
    switch (linkink.step) {
        case 0:
            text = "You have to register to cabital"
            break
        case 1:
            text = "Create an account on Cabital"
            break
        case 2:
            text = "Now pass KYC"
            break
        case 3:
            text = "Now active 2FA"
            break
        case 4:
            text = "You are ready"
        default:
            text = "You have to register to cabital"
            break;
    }
    return (
        <div className="linking">
            <h3 className="lettercolor">{text}</h3>
            {!linkink.step ? <button className="btnlink" onClick={startRegistering}>Register</button> : 
                <ReactLoading type="spin" color="#cc1616" width="112px" height="112px" />}
        </div>
    )
}

export default RenderLinking