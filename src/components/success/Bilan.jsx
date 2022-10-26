import React from 'react'
import { useTranslation } from 'react-i18next'

function Bilan({data}) {
    const { t } = useTranslation()

    return (
        <div className="bilan">
            <h2>{t(' bilan1')}</h2>
            <div className="row">
                <span>{t(' bilan2')} </span>
                <span> {data.operation} </span>
            </div>
            <div className="row">
                <span>{t(' bilan3')}</span>
                <span> {data.id} </span>
            </div>
            <div className="row">
                <span>{t(' bilan4')}</span>
                <span> {data.amount} XAF </span>
            </div>
            <div className="row">
                <span>{t(' bilan5')}</span>
                <span> {data.phone} </span>
            </div>
            {data.hash && <div className="row">
                <span>{t(' bilan6')}</span>
                <span>
                    <a title='See operation progression' href={`https://www.blockchain.com/btc/tx/${data.hash}`} target="_blank">
                    { data.hash.substr(0, 6)+'...'+data.hash.substr(54) }
                    </a>
                </span>
            </div>}
            <span className='span'>{t(' bilan7')}</span>
        </div>
    )
}


export default Bilan