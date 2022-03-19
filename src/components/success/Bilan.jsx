import React from 'react'

function Bilan({data}) {
    console.log("the data ", data)
    return (
        <div className="bilan">
            <h2>Summary</h2>
            <div className="row">
                <span>Operation </span>
                <span> {data.operation} </span>
            </div>
            <div className="row">
                <span>Operation Id</span>
                <span> {data.id} </span>
            </div>
            <div className="row">
                <span>Amount</span>
                <span> {data.amount} XAF </span>
            </div>
            <div className="row">
                <span> Number </span>
                <span> {data.phone} </span>
            </div>
            {data.hash && <div className="row">
                <span> Transaction Hash </span>
                <span>
                    <a title='See operation progression' href={`https://www.blockchain.com/btc/tx/${data.hash}`} target="_blank">
                    { data.hash.substr(0, 6)+'...'+data.hash.substr(54) }
                    </a>
                </span>
            </div>}
            <span className='span'> Operation complete thank for it </span>
        </div>
    )
}


export default Bilan