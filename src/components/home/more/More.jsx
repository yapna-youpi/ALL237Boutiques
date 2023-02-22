import React from 'react'
import ReactPlayer from 'react-player'
import { useTranslation } from 'react-i18next'
import {VscDebugBreakpointLog, VscDebugBreakpointLogUnverified} from 'react-icons/vsc'

import phone from './imojies/echange_cryptomonnaie_bictcoin_usdt_ethereum.svg'
import applaude from './imojies/acheter_usdt_bitcoin_etherum_moin_chere.svg'
import femme from './imojies/plate_forme_echange_cryptomonnaie_electronique.png'
import note from './imojies/vendre_bitcoin_ethereum_usdt_moin_chere.svg'
import './more.css' 


function More() {
    const { t } = useTranslation();
    return (
        <>
        <div className='more' id="more" >
           
            {/* <section className="more-section" >
                <h1 className="more-title">{t('moreTitle1')}</h1>
                <h3 className="more-mot"><span >{t('moreSous1')}IPER</span>Cash </h3>
                <p>{t('moreSous2')}
                </p>
                <div className='player'><img style={{width:'100%'}} src={femme} alt="bilan" /></div>
                <p>{t('moreSous3')}
                    <div className='img-phone'><img  src={phone} alt='emojie phone' /></div>
                </p>
                <p>{t('moreSous4')}
                    <div className='img-phone'><img  src={applaude} alt='emojie applaudissements'  /></div><br/>
                    {t('moreSous5')}</p>
                <p style={{paddingBottom:'10px'}}>
                {t('moreSous6')}
                    <ol>
                        <li>{t('moreSous7')}</li>
                        <li>{t('moreSous8')}</li>
                        <li>{t('moreSous9')}</li>
                        <li>{t('moreSous10')}</li>
                    </ol>{t('moreSous11')} 
                    <div className='img-phone'><img  src={note} alt='emojie notes' /></div><br/>
                     <p>{t('moreSous12')}</p><br/>
                    <hr width='90%' height="2px" color="#ee5253"/>
                </p>
            </section> */}

            <br/><br/>
            <section className='more-section'>
                    <h1>{t('moreTitle1')}</h1><br/>
                    <hr width='95%' height="2px" color="#ee5253"/>
                    <ul>
                        <li><br/>
                            <h2><i><VscDebugBreakpointLog /></i>{t('moreSous1')}</h2>
                            <p>{t('moreSous2')}<br/>
                               {t('moreSous3')}
                            </p>

                            <p>{t('moreSous4')} <div className='img-phone'><img  src={note} alt='emojie notes' /></div><br/> 
                                {t('moreSous5')} <div className='img-phone'><img  src={note} alt='emojie notes' /></div>
                            </p>
                            <p>{t('moreSous6')}<br/> 
                            {t('moreSous7')}<br/> {t('moreSous8')}
                                <div className='img-phone'><img  src={applaude} alt='emojie applaudissements'  /></div><br/>
                            </p>
                        </li>
                        <li><br/>
                            <h2><i><VscDebugBreakpointLog /></i>{t('moreSous9')} </h2>
                            <div className='player'><img style={{width:'100%'}} src={femme} alt="bilan" /></div>
                            
                            <ul>
                                <h3><i><VscDebugBreakpointLogUnverified /></i>{t('moreSous10')}</h3>
                                <li>
                                    <h4>{t('moreSous11')}</h4>
                                    <p>
                                        {t('moreSous12')}
                                    </p>
                                    <p>{t('moreSous13')}
                                    </p>
                                </li>
                                <li>
                                    <h4>{t('moreSous14')}</h4>
                                    <p>{t('moreSous15')} <br/>{t('moreSous16')} <div className='img-phone'><img  src={note} alt='emojie notes' /></div> 
                                    </p>
                                </li>
                            </ul>
                        </li>
                    </ul>
            </section>

            <br/><br/>
            <section className='more-section'>
                <ul><br/>
                    <h3><i><VscDebugBreakpointLogUnverified /></i>{t('moreSous17')} </h3>
                    <li>
                        <h4>{t('moreSous18')} </h4>
                        <p>{t('moreSous19')}</p>
                        <p>{t('moreSous20')}<div className='img-phone'><img  src={note} alt='emojie notes' /></div> 
                        </p>
                    </li>
                    <li>
                        <h4>{t('moreSous21')}</h4>
                        <p>{t('moreSous22')}
                            <br/>{t('moreSous23')}<div className='img-phone'><img  src={note} alt='emojie notes' /></div> 
                        </p>
                    </li>

                    <li>
                        <h3><i><VscDebugBreakpointLogUnverified /></i>{t('moreSous24')}</h3>
                        <p className='para-li'>{t('moreSous25')} <br/>
                        {t('moreSous26')}<br/>
                        {t('moreSous27')}<br/>
                        {t('moreSous28')}<br/>
                        {t('moreSous29')}<br/>
                        {t('moreSous30')}<br/>
                        {t('moreSous31')}<br/>
                        {t('moreSous32')} <br/>
                        </p>
                    </li>

                    <li>
                        <h3><i><VscDebugBreakpointLogUnverified /></i>{t('moreSous33')} </h3>
                        <p>
                            {t('moreSous34')}<br/>
                            {t('moreSous35')} 
                        </p>
                    </li>
                    <li>
                        <h3><i><VscDebugBreakpointLogUnverified /></i>{t('moreSous36')} </h3>
                        <p className='para-li' >{t('moreSous37')} <br/>
                           {t('moreSous38')}<br/>
                           {t('moreSous39')}<br/>
                           {t('moreSous40')} <a href='www.ipercash.io' target=" _blank">{t('moreSous43')}www.ipercash.io</a> 

                           <br/>
                           {t('moreSous41')}<br/>
                           {t('moreSous42')}
                         </p>
                        
                    </li>

                </ul><br/>
                <hr width='95%' height="2px" color="#ee5253"/>
            </section>
        </div>

        
        
        </>
    )
}

export default More
