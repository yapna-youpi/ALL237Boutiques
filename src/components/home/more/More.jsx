import React from 'react'
import ReactPlayer from 'react-player'

import phone from './imojies/emoji_u1f44b.svg'
import applaude from './imojies/1f44f.svg'
import note from './imojies/270d.svg'
import './more.css' 


function More() {
    return (
        <>
        <div className='more'>
           
            <section className="more-section">
                <h1 className="more-title">EN SAVOIR PLUS</h1>
                <h3 className="more-mot"><span >À propos d’IPER</span>Cash </h3>
                <p>
                Né du double constat de l’explosion du Mobile Money et de la demande de cryptomonnaie en Afrique, IPERCash est une plateforme essentiellement basée sur la Blockchain et la finance décentralisée.
                </p>
                <div className='player'><ReactPlayer url={'https://www.youtube.com/watch?v=PSyUcb3fFtY&t=28s'} controls  /></div>
                <p>Pourquoi la fusion du Mobile Money et de la cryptomonnaie est certainement l’avenir de l’Afrique et très probablement du reste du monde ??<br/><br/>
                    Le taux de bancarisation en Afrique est extrêmement bas, particulièrement en Afrique subsaharienne. D’où une fulgurante pénétration du Mobile
                    Money permettant d’obtenir un portefeuille électronique sans contraintes.  
                    Le Mobile Money fonctionne par codes USSD compatibles  avec n’importe quel téléphone, ce service ne nécessite donc pas de téléphone sophistiqué.
                    <div className='img-phone'><img  src={phone} alt='emojie phone' /></div>
                </p>
                <p>D’autre part, la cryptomonnaie, particulièrement l'ethereum,le Bitcoin et l'usdt connaîssent également une pénétration inattendue en Afrique.
                    <div className='img-phone'><img  src={applaude} alt='emojie applaudissements' /></div><br/>
                     En effet, les conditions dictées par les banques centrales locales et leurs monnaies locales dépréciées contraignent les entreprises locales et les poussent à se tourner vers la cryptomonnaie bien plus souple.</p>
                <p style={{paddingBottom:'10px'}}>
                    Nous sommes donc une plateforme d’échanges et d’interactions entre le Mobile Money et la cryptomonnaie et une nécessité.<br/>
                    Nous sommes Une cross plate forme Internet et une application mobile  où les utilisateurs peuvent :
                    <ol>
                        <li>- Acheter de la cryptomonnaie par carte de crédit et la déposer sur un compte Mobile Money en Afrique.</li>
                        <li>- Acheter de la cryptomonnaie pour créditer leur  portefeuille électronique ;</li>
                        <li>- Acheter de la cryptomonnaie en payant avec Mobile Money</li>
                        <li>- Retirer de la cryptomonnaie de son portefeuille et la transférer dans son compte Mobile Money.</li>
                    </ol> 
                    IPERCash n’est pas un trader, IPERCash ne propose ni des produits financiers, ni  d’investissements 
                    spéculatifs mais entend participer à l’augmentation du volume des échanges en cryptomonnaie dans le monde.
                    <div className='img-phone'><img  src={note} alt='emojie notes' /></div><br/>
                     <p>Nous offrons donc aux Africains la possibilité  d’acheter des services et des produits en cryptomonnaie,
                      et inversement, d’être payé en cryptomonnaie.</p><br/>
                    <hr width='90%' height="2px" color="#ee5253"/>
                </p>
            </section>
        </div>
        
        
        </>
    )
}

export default More
