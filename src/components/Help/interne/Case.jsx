import React from 'react'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'


import ipercashe from '../assets/img/ipercash.jpeg'
import contactSearch from '../assets/img/search-user.svg'
import contacte from '../assets/img/contacts.svg' 
import search from '../assets/img/search-user.svg' 
import wallete from '../assets/img/wallet.svg'
import './case.css'

const Case = ({route}) => {
    let history=useHistory()
    const { t } = useTranslation()
    return (
        <>
            <div className="help-option"  onClick={()=>history.push(route[0])}>
                <i className="helpIcon"><img src={contactSearch } alt="search" className="searche" /></i>
                <div className="helpDemarrer">
                    <h3 style={{textAlign:'center'}}>{t('case1')}</h3>
                    <div className="help-demarrer-content">
                    <img src={ipercashe} alt="ipercash" className="ipercash-fot"/>
                        <p className="case-paragraph">{t('case2')}</p>
                    </div>
                </div>
            </div> 
            <div className="help-option"  onClick={()=>history.push(route[1])}>
                <i className="helpIcon"><img src={contacte} alt="search" className="searche" /></i>
                <div className="helpDemarrer">
                    <h3 style={{textAlign:'center'}}>{t('case3')}</h3>
                    <div className="help-demarrer-content">
                    <img src={ipercashe} alt="ipercash" className="ipercash-fot"/>
                        <p className="case-paragraph">{t('case4')}</p>
                    </div>
                </div>
            </div> 
            <div className="help-option"  onClick={()=>history.push(route[2])}>
                <i className="helpIcon"><img src={wallete} alt="search" className="searche" /></i>
                <div className="helpDemarrer">
                    <h3 style={{textAlign:'center'}}>{t('case5')}</h3>
                    <div className="help-demarrer-content">
                    <img src={ipercashe} alt="ipercash" className="ipercash-fot"/>
                        <p className="case-paragraph">{t('case6')}</p>
                    </div>
                </div>
            </div> 
            <div className="help-option"  onClick={()=>history.push(route[3])}>
                <i className="helpIcon"><img src={search} alt="search" className="searche" /></i>
                <div className="helpDemarrer">
                    <h3 style={{textAlign:'center'}}>{t('case7')}</h3>
                    <div className="help-demarrer-content">
                    <img src={ipercashe} alt="ipercash" className="ipercash-fot"/>
                        <p className="case-paragraph">{t('case8')}</p>
                    </div>
                </div>
            </div> 
        </>
    )
}

export default Case