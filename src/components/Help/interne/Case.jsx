import React from 'react'
import { useHistory } from 'react-router-dom'


import ipercashe from '../assets/img/ipercash.jpeg'
import './case.css'

const Case = ({title, description, route, img}) => {
    let history=useHistory()
    return (
        <>
            <div className="help-option"  onClick={()=>history.push(route)}>
                <i className="helpIcon"><img src={img} alt="search" className="searche" /></i>
                <div className="helpDemarrer">
                    <h3 style={{textAlign:'center'}}>{title}</h3>
                    <div className="help-demarrer-content">
                    <img src={ipercashe} alt="ipercash" className="ipercash-fot"/>
                        <p className="case-paragraph">{description}</p>
                    </div>
                </div>
            </div> 
        </>
    )
}

export default Case