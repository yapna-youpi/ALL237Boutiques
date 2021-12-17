import React from 'react'
import { useHistory } from 'react-router'

import svg1 from '../assets/img/external-link.svg' 
import searche from '../assets/img/search.svg'
import './head.css'

const Head = () => {
    const history = useHistory();
    return (
        <div className="help-hd">
            {/* entete de la page en rouge */}
            <div className="help-Go">
            <a href='http://soon.ipercash.fr'><span className="help-Logo" >IPERCASH</span></a>
                <a href='http://soon.ipercash.fr'> <span className="help-Right"><img className="svg1" src={svg1} alt='link'/>allez sur IPERCASH</span></a>
            </div>
            <div className="Help-Mot1">
                <p>Vous trouverez ici toutes les réponses à vos questions concernant IPERCash.</p>
            </div>
            <form id="form" metho="post" >
                <div className="onglet-recherche">
                    <span className="btnh-imag"><img className="img-search" alt="search" src={searche} /></span>
                    <input className="help-Search" type="text" id="search" placeholder="Rechercher des réponses..." autoComplete="off"/> 
                </div>
            </form>
        </div>
    )
}

export default Head
