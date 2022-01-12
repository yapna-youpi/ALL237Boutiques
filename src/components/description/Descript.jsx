import React from 'react'
import { FaSellsy } from 'react-icons/fa'
import { HiShoppingCart } from 'react-icons/hi'
import { RiLoginCircleFill } from 'react-icons/ri'
import { GrSend } from 'react-icons/gr'


import Head from '../Help/head/Head' 

import './description.css'
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

function Description() {

    console.log(" je me rerend ")
    return(
    <>
    <Head/>
       <div className='description-suivi-content1'>
           <div className="description-list">
                <ul>
                    <a href="#dsc-retirer">
                        <li><i>&ensp;<HiShoppingCart/></i>  Retirer votre crypto</li>
                    </a>
                    <a href="#dsc-acheter">
                        <li><i>&ensp;<FaSellsy/></i> Acheter de la crypto</li>
                    </a>
                    <a href="#dsc-effectuer">
                        <li><i>&ensp;<GrSend/></i> Effectuer un depot Mobile Money</li>
                    </a>
                    <a href="#dsc-retirer">
                        <li><i>&ensp;<RiLoginCircleFill/></i>connecter</li>
                        <li><i><HiShoppingCart/></i>  Retirer votre crypto</li>
                    </a>
                    <a href="#dsc-acheter">
                        <li><i><FaSellsy/></i> Acheter de la crypto</li>
                    </a>
                    <a href="#dsc-effectuer">
                        <li><i><GrSend/></i> Effectuer un depot Mobile Money</li>
                    </a>
                    <a href="#dsc-retirer">
                        <li><i><RiLoginCircleFill/></i>  Se connecter</li>
                    </a>
                </ul>
           </div>
           <div className="description-content">

                <section id="dsc-retirer" className="suivi-section">
                    <h1 className="about-title">COMMENT CA MARCHE ?</h1>
                    <section>
                        <h3 className="about-title3"><span className="about-mot">RETIREZ VOT</span>RE CRYPTO</h3>
                        <p className="description-paragraph" >Remplissez le formulaire en indiquant : votre adresse Wallet, le montant à retirer, le numéro de téléphone du compte Mobile Money vers lequel vous souhaitez retirer les fonds. Validez le formulaire.</p>
                        <img className="description-img1" src={img1} alt="transaction1" /><br/>
                        <p className="description-paragraph" >Un récapitulatif de la transaction s’affiche en pop-up. Si les données sont exactes, veillez confirmer.</p>
                        <img className="description-img" src={img2} alt="confirm" /><br/>
                        <p className="description-paragraph" >Apparaît une fenêtre où s’affichent le montant exact que vous souhaitez retirer ainsi que l’adresse du wallet d’IPercash.</p>
                        <img className="description-img2" src={img3} alt="cancel" />
                        <img className="description-img" src={img3} alt="cancel" />
                        <p className="description-paragraph" >A cette étape, il faut vous rendre dans votre wallet.</p> 
                        Vous devez :
                            <ul>
                                <li>- soit scanner ce code depuis votre wallet, </li>
                                <li>- soit copier ces données (montant exact en BTC et adresse Wallet,d’IPERCash) afin d’effectuer un envoi de bitcoins au montant exact à l’adresse de IPERCash (toute erreur de montant ou d’adresse wallet entraînera la perte des fonds).
                                    Donc copiez le montant en BTC et allez le coller dans votre wallet pour un envoi. Copiez également l’adresse Wallet de IPercash afin de la coller dans votre Wallet pour l’adresse de destination de l’envoi.
                                </li>
                            </ul> 
                        <p className="description-paragraph" >Nous avons pris ici l’exemple d’un utilisateur possédant son Wallet sur la plateforme Coinbase.</p>
                        <img className="description-img2" src={img4} alt="" />
                        <img className="description-img2" src={img5} alt="" />
                        <p className="description-paragraph" >Lorsque vous aurez effectué cette transaction depuis votre Wallet, vous devez revenir sur notre site sur cette fenêtre confirmer votre envoi en cliquant sur I HAVE SENT. Vous avez 5 mn pour cela.</p>
                        <img className="description-img2" src={img6} alt="" />
                        <p className="description-paragraph" >Une fois confirmée, une fenêtre !!s’affiche demandant d’attendre la confirmation de la validation. Ceci peut durer entre 5 mn et 30 mn en fonction de l’encombrement de la blockchain.</p>
                        <img className="description-img2" src={img7} alt="" />
                        <img className="description-img1" src={img4} alt="" />
                        <img className="description-img" src={img5} alt="" />
                        <p className="description-paragraph" >Lorsque vous aurez effectué cette transaction depuis votre Wallet, vous devez revenir sur notre site sur cette fenêtre confirmer votre envoi en cliquant sur I HAVE SENT. Vous avez 5 mn pour cela.</p>
                        <img className="description-img" src={img6} alt="" />
                        <p className="description-paragraph" >Une fois confirmée, une fenêtre !!s’affiche demandant d’attendre la confirmation de la validation. Ceci peut durer entre 5 mn et 30 mn en fonction de l’encombrement de la blockchain.</p>
                        <img className="description-img" src={img7} alt="" />
                        <p className="description-paragraph" >La page CONGRATULATION s’affiche pour confirmer le succès de la transaction.</p>
                        <img className="description-img" src={img8} alt="" />
                    </section>

                    <section id="dsc-acheter">
                        <h3 className="about-title3"><span className="about-mot">ACHETEZ DE LA</span> CRYPTO</h3>
                        <p className="description-paragraph" >Remplissez le formulaire en indiquant : le montant que vous souhaitez acheter, votre numéro de téléphone, l’adresse de votre Wallet en Bitcoins. Validez.</p>
                        <img className="description-img2" src={img9} alt="" />
                        <img className="description-img1" src={img9} alt="" />
                        <p className="description-paragraph" >Une fenêtre pop-up vous demande de confirmer l’adresse BTC de votre Wallet. Cette confirmation est demandée car, selon les règles de la blockchain, toute erreur dans l’adresse Wallet de destination entraînera automatiquement la perte des fonds.</p>
                        <img className="description-img" src={img10} alt="" />
                        <p className="description-paragraph" >Collez donc à nouveau dans cette fenêtre l’adresse Wallet de destination si vous en êtes sûr.</p>
                        <p className="description-paragraph" >La page indiquant la progression de la transaction s’ouvre.</p> 
                        <img className="description-img2" src={img11} alt="" />
                        <p className="description-paragraph" >Vous recevrez un sms de votre opérateur mobile vous demandant de valider le retrait des fonds de votre compte Mobile Money.</p>
                        <p className="description-paragraph" >Une fois le retrait validé, la procédure continue automatiquement jusqu’au dépôt des fond dans votre wallet. Elle peut durer de 5 à 30 mn en fonction de la congestion de la blockchain.</p>
                        <p className="description-paragraph" >La page CONGRATULATION s’affiche pour confirmer le succès de la transaction.</p>
                        <img className="description-img2" src={img12} alt="" />
                        <img className="description-img1" src={img11} alt="" />
                        <p className="description-paragraph" >Vous recevrez un sms de votre opérateur mobile vous demandant de valider le retrait des fonds de votre compte Mobile Money.</p>
                        <p className="description-paragraph" >Une fois le retrait validé, la procédure continue automatiquement jusqu’au dépôt des fond dans votre wallet. Elle peut durer de 5 à 30 mn en fonction de la congestion de la blockchain.</p>
                        <p className="description-paragraph" >La page CONGRATULATION s’affiche pour confirmer le succès de la transaction.</p>
                        <img className="description-img" src={img12} alt="" />
                    </section>
                    
                    <section id="dsc-effectuer">
                        <h3 className="about-title3"><span className="about-mot">EFFECTUEZ UN DEPOT </span>MOBILE MONEY</h3>
                        <p className="description-paragraph" >Allez sur la page CREDITER UN COMPTE MOBILE MONEY.</p>
                        <p className="description-paragraph" >Indiquez le montant à créditer, le nom complet du destinataire, son pays et son numéro de téléphone.</p>
                        <p className="description-paragraph" >Vérifiez dans le sommaire de la transaction que les couts sont corrects. Validez.</p>
                        <p className="description-paragraph" >Vous êtes dirigé pour le paiement par carte de crédit sur la page de notre partenaire Mercuryo.</p>
                        <br/>
                        <p className="description-paragraph" >Acceptez les termes et services et cliquez sur BUY</p>
                        <img className="description-img2" src={img13} alt="" />
                        <p className="description-paragraph" >Si vous avez déjà passé l’indentification (procédure KYC), rentrez votre numéro de téléphone, un sms vous sera envoyé : </p>
                        <img className="description-img2" src={img14} alt="" />
                        <p className="description-paragraph" >Lorsque vous avez reçu le code par SMS, veuillez le rentrer dans la fenêtre suivante :</p>
                        <img className="description-img2" src={img15} alt="" />
                        <p className="description-paragraph" >Choisissez parmi les cartes de crédit que vous avez enregistrées dans votre compte celle que vous souhaitez utiliser pour procéder au paiement et validez</p>
                        <img className="description-img2" src={img16} alt="" />
                        <p className="description-paragraph" >Entrez le numéro de contrôle à trois chiffres situé au dos de la carte de crédit.</p>
                        <img className="description-img2" src={img17} alt="" />
                        <p className="description-paragraph" >Vous êtes ensuite dirigé vers le site de votre banque pour les vérifications habituelles (généralement contrôle en deux étapes)</p>
                        <img className="description-img2" src={img18} alt="" />
                        <img className="description-img2" src={img19} alt="" />
                        <p className="description-paragraph" >Une fois le paiement validé sur le site de votre banque, vous recevrez la confirmation de votre paiement sur la fenêtre suivante,</p>
                        <img className="description-img2" src={img20} alt="" />
                        <img className="description-img" src={img13} alt="" />
                        <p className="description-paragraph" >Si vous avez déjà passé l’indentification (procédure KYC), rentrez votre numéro de téléphone, un sms vous sera envoyé : </p>
                        <img className="description-img" src={img14} alt="" />
                        <p className="description-paragraph" >Lorsque vous avez reçu le code par SMS, veuillez le rentrer dans la fenêtre suivante :</p>
                        <img className="description-img" src={img15} alt="" />
                        <p className="description-paragraph" >Choisissez parmi les cartes de crédit que vous avez enregistrées dans votre compte celle que vous souhaitez utiliser pour procéder au paiement et validez</p>
                        <img className="description-img" src={img16} alt="" />
                        <p className="description-paragraph" >Entrez le numéro de contrôle à trois chiffres situé au dos de la carte de crédit.</p>
                        <img className="description-img" src={img17} alt="" />
                        <p className="description-paragraph" >Vous êtes ensuite dirigé vers le site de votre banque pour les vérifications habituelles (généralement contrôle en deux étapes)</p>
                        <img className="description-img" src={img18} alt="" />
                        <img className="description-img" src={img19} alt="" />
                        <p className="description-paragraph" >Une fois le paiement validé sur le site de votre banque, vous recevrez la confirmation de votre paiement sur la fenêtre suivante,</p>
                        <img className="description-img" src={img20} alt="" />
                        <p className="description-paragraph" >Le paiement sera reçu dans le compte Mobile Money de destination le temps nécessaire à la blockchain (généralement 5 mn mais en cas de congestion cela peut durer jusqu’à 30 mn.)</p>
                        <p className="description-paragraph" >Un mail récapitulatif de la transaction vous est envoyé dans la boite mail que vous avez communiqué au moment de l’identification.</p>
                        <p className="description-paragraph" >Veuillez mémoriser le numéro de la transaction (Mercuryo ID) en cas de contestations. Merci!</p>  
                    </section>

                    <hr width='90%' height="2px" color="#ee5253"/>
                </section>
            </div>
        </div>
        </>
    )
    
}

export default Description;
