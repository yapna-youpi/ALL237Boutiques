import React from 'react'

import './fiats.css'

function Fiats({action, fiat}) {
    return (
        <div className="fiats">
            <div className={fiat==='EUR' ? "select" : ""} onClick={()=>action('EUR')} >EUR</div>
            <div className={fiat==='USD' ? "select" : ""} onClick={()=>action('USD')} >USD</div>
        </div>
    )
}

export default Fiats
