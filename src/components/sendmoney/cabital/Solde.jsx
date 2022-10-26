import React from 'react'

function Solde({ change, balance }) {
    return (
        <div className='start'>
            <h3>Your Balance</h3>
            <div className="start-content">
                <div className="start-left">
                    <h4>EUR</h4>
                    <p>{balance.EUR} &#8364;</p>
                </div>
                <div className="start-right">
                    <h4>USDT</h4>
                    <p>{Math.ceil(balance.USDT)} usdt</p>
                </div>
            </div>
            <div className="start-btn">
                <button className="btnstart-left" onClick={() => change({ solde: false, payment: true })}>
                    Make A Dépot To Cabital
                </button>
                <button className="btnstart-right" onClick={() => change({ solde: false, otp: true })}>
                    Make Transfert To Ipercash
                </button>
            </div>
        </div>
    )
}

export default Solde