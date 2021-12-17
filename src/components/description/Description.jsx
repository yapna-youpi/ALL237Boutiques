import React, { useEffect } from 'react'
import { FaSellsy } from 'react-icons/fa'
import { HiShoppingCart } from 'react-icons/hi'
import { RiLoginCircleFill } from 'react-icons/ri'
import { SiMakerbot } from 'react-icons/si'
import ReactPlayer from 'react-player'

import Head from '../Help/head/Head'

import External from './assets/external-link.svg'
import img1 from './assets/img1.jpg'
import img2 from './assets/img2.jpg'
import img3 from './assets/img3.jpg'
import img4 from './assets/img4.jpg'
import img5 from './assets/img5.jpg'
import img6 from './assets/img6.jpg'
import img7 from './assets/img7.jpg'
import img8 from './assets/img8.jpg'
import img9 from './assets/img9.jpg'
import img10 from './assets/img10.jpg'
import img11 from './assets/img11.jpg'
import img12 from './assets/img12.jpg'
import img13 from './assets/img13.png'
import img14 from './assets/img14.png'
import img15 from './assets/img15.png'
import img16 from './assets/img16.png'
import img17 from './assets/img17.png'
import img18 from './assets/img18.png'
import img19 from './assets/img19.png'
import img20 from './assets/img20.png'

import './description.css'



function Description() {

    return (
        <div  className="description">
            <div className="description-head">
                <div className="help-bd">
                    {/* entete de la page en rouge */}
                    <div className="help-Go">
                    <a href='http://soon.ipercash.fr'><span className="help-Logo" >IPERCASH</span></a>
                        <a href='http://soon.ipercash.fr'> <span className="help-Right"><img className="svg1" src={External} alt='link'/>allez sur IPERCASH</span></a>
                    </div>
                </div>
            </div>
            <div className="description-body">
                <div className="description-menu">
                    <ul>
                        <li className="list"> 
                            <a href="#dsc-about">
                                <span className="icon"><i>&ensp;<HiShoppingCart/></i></span>
                                <span className="title">A propos</span>
                            </a>
                        </li>
                        <li className="list"> 
                            <a href="#dsc-move">
                                <span className="icon"><i>&ensp;<HiShoppingCart/></i></span>
                                <span className="title">Retirer {/*{votre crypto*/}</span>
                            </a>
                        </li>
                        <li className="list"> 
                            <a href="#dsc-buy">
                                <span className="icon"><i>&ensp;<FaSellsy/></i></span>
                                <span className="title">Acheter {/*de la crypto*/} </span>
                            </a>
                        </li>
                        <li className="list"> 
                            <a href="#dsc-do">
                                <span className="icon"><i>&ensp;<SiMakerbot/></i></span>
                                <span className="title">Effectuer {/*un depot Mobile Money */}</span>
                            </a>
                        </li>
                        <li className="list">
                            <a href="#dsc-connect">
                                <span className="icon"></span>
                                <span className="title"><i>&ensp;<RiLoginCircleFill/></i>Se connecter</span>
                            </a>
                        </li>     
                    </ul>
                </div>
                <div className="description-content">
                    {/*--section--about--*/}
                    <div className='content-about' id="dsc-about">
                        <h2 className='title2'>Comment Ca Marche ?</h2>
                        <p className='title3'><span className='title-color'>A propos d'IPERCash</span> </p>
                        <div className='player'><ReactPlayer url={'https://www.youtube.com/watch?v=PSyUcb3fFtY&t=28s'} controls  /></div>
                    </div>
                    {/*--section to move --*/}
                    <div className='content-about' id="dsc-move">
                        <h2 className='title2'>Comment retirer de la Crypto ?</h2>
                        <p className="title3" >
                            Remplissez le formulaire en indiquant :
                        </p>
                        <p className='title4'>
                            votre adresse Wallet, le montant à retirer, le numéro de téléphone du 
                            compte Mobile Money vers lequel vous souhaitez retirer les fonds. Validez le formulaire.
                        </p>
                        <div className='player'><ReactPlayer url={'https://www.youtube.com/watch?v=PSyUcb3fFtY&t=53s'} controls  /></div>
                        <div className='player2'><img className="description-img1" src={img1} alt="transaction1" /></div>
                        <p className="title4" >Un récapitulatif de la transaction s’affiche en pop-up. Si les données sont exactes, veillez confirmer.</p>
                        <div className='player3'><img className="description-img2" src={img2} alt="confirm" /><br/></div>
                        <p className="title4" >Apparaît une fenêtre où s’affichent le montant exact que vous souhaitez retirer ainsi que l’adresse du wallet d’IPercash.</p>
                        <div className='player3'> <img className="description-img2" src={img3} alt="cancel" /></div>              
                        <p className="title4" >A cette étape, il faut vous rendre dans votre wallet.<br/>Vous devez :</p>
                        <p className="title4" >
                            <ul>
                                <li>- soit scanner ce code depuis votre wallet, </li>
                                <li>- soit copier ces données (montant exact en BTC et adresse Wallet,d’IPERCash) afin d’effectuer un envoi de bitcoins au montant exact à l’adresse de IPERCash (toute erreur de montant ou d’adresse wallet entraînera la perte des fonds).<br/><br/>
                                    Donc copiez le montant en BTC et allez le coller dans votre wallet pour un envoi. Copiez également l’adresse Wallet de IPercash afin de la coller dans votre Wallet pour l’adresse de destination de l’envoi.
                                </li>
                            </ul> 
                        </p>
                        <p className="title4" >
                            Nous avons pris ici l’exemple d’un utilisateur possédant son Wallet sur la plateforme Coinbase.<br/>
                            Lorsque vous aurez effectué cette transaction depuis votre Wallet, vous devez revenir sur notre site sur cette fenêtre confirmer votre envoi en cliquant sur I HAVE SENT. Vous avez 5 mn pour cela.
                        </p>
                        <div className='player3'> <img className="description-img2" src={img6} alt="" /></div>
                        <p className='title4'>Une fois confirmée, une fenêtre !!s’affiche demandant d’attendre la confirmation de la validation. Ceci peut durer entre 5 mn et 30 mn en fonction de l’encombrement de la blockchain.</p>  
                        <div className='player3'>
                            <img className="description-img2" src={img7} alt="" />
                        </div>
                        <div className='player2'>
                            <img className="description-img1" src={img4} alt="" />
                        </div>
                        <div className='player3'>
                            <img className="description-img" src={img5} alt="" />  
                        </div>
                        <p className='title4'>
                            Lorsque vous aurez effectué cette transaction depuis votre Wallet, 
                            vous devez revenir sur notre site sur cette fenêtre confirmer votre envoi en cliquant sur I HAVE SENT.<br/>
                            Vous avez 5 mn pour cela.
                        </p>
                        <div className='player3'>   
                            <img className="description-img" src={img6} alt="" />
                        </div>
                        <p className='title4'>Une fois confirmée, une fenêtre !!s’affiche demandant d’attendre la confirmation de la validation.<br/>
                             Ceci peut durer entre 5 mn et 30 mn en fonction de l’encombrement de la blockchain.
                        </p> 
                        <div className='player3'><img className="description-img" src={img7} alt="" /></div>
                        <p className='title4'>La page CONGRATULATION s’affiche pour confirmer le succès de la transaction.</p>
                        <div className='player3'><img className="description-img" src={img8} alt="" /></div>
                                        
                    </div>
                    {/*----section to buy--*/}
                    <div className='content-about' id="dsc-buy">
                        <h2 className='title2'>Comment Acheter une Crypto ?</h2>
                        <p className='title3'><span className='title-color'>Remplissez le formulaire en indiquant :
                        <br/> le montant que vous souhaitez acheter, votre numéro de téléphone, l’adresse de votre Wallet en Bitcoins. Validez.</span> </p>
                        <div className='player'><ReactPlayer url={'https://www.youtube.com/watch?v=FnQyenSjh94'} controls  /></div>
                        <div className='player2'><img className="description-img1" src={img9} alt="" /></div>
                        <p className='title3'>Une fenêtre pop-up vous demande de confirmer l’adresse BTC de votre Wallet. Cette confirmation est demandée car, selon les règles de la blockchain, toute erreur dans l’adresse Wallet de destination entraînera automatiquement la perte des fonds.</p>
                        <div className="player3"><img className="description-img" src={img10} alt="" /></div>
                        <p className='title3'>Collez donc à nouveau dans cette fenêtre l’adresse Wallet de destination si vous en êtes sûr.</p>
                        <p className='title3'>La page indiquant la progression de la transaction s’ouvre.</p>
                        <div className="player2"><img className="description-img1" src={img11} alt="" /></div>
                        <p className='title3'>Vous recevrez un sms de votre opérateur mobile vous demandant de valider le retrait des fonds de votre compte Mobile Money.</p>
                        <p className='title3'>Une fois le retrait validé, la procédure continue automatiquement jusqu’au dépôt des fond dans votre wallet. Elle peut durer de 5 à 30 mn en fonction de la congestion de la blockchain.</p>
                        <p className='title3'>La page CONGRATULATION s’affiche pour confirmer le succès de la transaction.</p>
                        <div className="player3"><img className="description-img2" src={img12} alt="" /></div>
                        <div className="player2"> <img className="description-img1" src={img11} alt="" /></div>
                        <p className='title3'>Vous recevrez un sms de votre opérateur mobile vous demandant de valider le retrait des fonds de votre compte Mobile Money</p>
                        <p className='title3'>Une fois le retrait validé, la procédure continue automatiquement jusqu’au dépôt des fond dans votre wallet.<br/> Elle peut durer de 5 à 30 mn en fonction de la congestion de la blockchain.</p>
                        <p className='title3'>La page CONGRATULATION s’affiche pour confirmer le succès de la transaction.</p>
                        <div className="player3"><img className="description-img" src={img12} alt="" /></div>
                    </div>
                        {/*---section-to send---*/}
                    <div className='content-about' id="dsc-do">
                        <h2 className='title2'>Comment Effectuer un Depot ?</h2>
                        <p className='title3'><span className='title-color'>Procedure pour éffectuer un dépot sur Mobile Money.</span> </p>
                        <div className='player'><ReactPlayer url={'https://www.youtube.com/watch?v=PSyUcb3fFtY&t=28s'} controls  /></div>
                        <p className='title3'>Allez sur la page CREDITER UN COMPTE MOBILE MONEY.</p>
                        <p className='title3'>Indiquez le montant à créditer, le nom complet du destinataire, son pays et son numéro de téléphone.</p>
                        <p className='title3'>Vérifiez dans le sommaire de la transaction que les couts sont corrects. Validez.</p>
                        <p className='title3'>Vous êtes dirigé pour le paiement par carte de crédit sur la page de notre partenaire Mercuryo.
                                            <br/>Acceptez les termes et services et cliquez sur BUY.
                        </p>
                        <div className="player3"><img className="description-img1" src={img13} alt="" /></div>
                        <p className='title3'>Si vous avez déjà passé l’indentification (procédure KYC), rentrez votre numéro de téléphone, un sms vous sera envoyé : </p>
                        <div className="player3"><img className="description-img1   " src={img14} alt="" /></div>
                        <p className='title3'>Lorsque vous avez reçu le code par SMS, veuillez le rentrer dans la fenêtre suivante :</p>
                        <div className="player3"><img className="description-img2" src={img15} alt="" /></div>
                        <p className='title3'>Choisissez parmi les cartes de crédit que vous avez enregistrées dans votre compte celle que vous souhaitez utiliser pour procéder au paiement et validez</p>
                        <div className="player3"><img className="description-img2" src={img16} alt="" /></div>
                        <p className='title3'>Entrez le numéro de contrôle à trois chiffres situé au dos de la carte de crédit.</p>
                        <div className="player3"><img className="description-img2" src={img17} alt="" /></div>
                        <p className='title3'>Vous êtes ensuite dirigé vers le site de votre banque pour les vérifications habituelles (généralement contrôle en deux étapes)</p>
                        <div className="player3"><img className="description-img2" src={img18} alt="" /></div>
                        <div className="player3"><img className="description-img2" src={img19} alt="" /></div>
                        <p className='title3'>Une fois le paiement validé sur le site de votre banque, vous recevrez la confirmation de votre paiement sur la fenêtre suivante,</p>
                        <div className="player3">
                            <img className="description-img1" src={img20} alt="" />
                        </div>
                        <div className="player3">
                            <img className="description-img1" src={img13} alt="" />
                        </div>
                        <p className='title3'>Si vous avez déjà passé l’indentification (procédure KYC), rentrez votre numéro de téléphone, un sms vous sera envoyé : </p>
                        <div className="player3"><img className="description-img1" src={img14} alt="" /></div>
                        <p className='title3'>Lorsque vous avez reçu le code par SMS, veuillez le rentrer dans la fenêtre suivante :</p>
                        <div className="player3"><img className="descripton-img1" src={img15} alt="" /></div>
                        <p className='title3' >Choisissez parmi les cartes de crédit que vous avez enregistrées dans votre compte celle que vous souhaitez utiliser pour procéder au paiement et validez</p>
                        <div className="player3"><img className="description-img1" src={img16} alt="" /></div>
                        <p className='title3' >Entrez le numéro de contrôle à trois chiffres situé au dos de la carte de crédit.</p>
                        <div className="player3"><img className="description-img1" src={img17} alt="" /></div>
                        <p className='title3' >Vous êtes ensuite dirigé vers le site de votre banque pour les vérifications habituelles (généralement contrôle en deux étapes)</p>
                        <div className="player3"><img className="description-img1" src={img18} alt="" /></div>
                        <div className="player3"><img className="description-img1" src={img19} alt="" /></div>
                        <p className='title3' >Une fois le paiement validé sur le site de votre banque, vous recevrez la confirmation de votre paiement sur la fenêtre suivante,</p>
                        <div className="player3"><img className="description-img1" src={img20} alt="" /></div>
                        <p className='title3' >Le paiement sera reçu dans le compte Mobile Money de destination le temps nécessaire à la blockchain (généralement 5 mn mais en cas de congestion cela peut durer jusqu’à 30 mn.)</p>
                        <p className='title3' >Un mail récapitulatif de la transaction vous est envoyé dans la boite mail que vous avez communiqué au moment de l’identification.</p>
                        <p className='title3' >Veuillez mémoriser le numéro de la transaction (Mercuryo ID) en cas de contestations. Merci!</p>



                    </div>
                    {/*--styling to connect--*/}
                    <div id="dsc-connect" className="dsc-connect">
                        <h3 className="about-title3"><span className="about-mot">Se Connecter </span>A Notre Plateforme</h3>
                        <p className='title3'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, obcaecati id ipsum
                            earum dolor impedit soluta enim ipsa corporis eos possimus cum pariatur ex, vero voluptatem 
                            laudantium sit adipisci ipsam?
                        </p>
                    </div>
                    <hr width='90%' height="2px" color="#ee5253"/>
                    </div>
            </div>
        </div>
    )
}

export default Description
