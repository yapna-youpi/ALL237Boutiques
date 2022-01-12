import React from 'react'
import ReactPlayer from 'react-player'
import { useTranslation } from 'react-i18next'

import './descript1.css'
import img1 from '../assets/img1.jpg'
import img2 from '../assets/img2.jpg'
import img3 from '../assets/img3.jpg'
import img4 from '../assets/img4.jpg'
import img5 from '../assets/img5.jpg'
import img6 from '../assets/img6.jpg'
import img7 from '../assets/img7.jpg'
import img8 from '../assets/img8.jpg'

function Descript1({lang,video}) {
    const { t } = useTranslation();
    return (
        <div>
             {/*--section to move --*/}
             <div className='content-about' id="dsc-move">
                        <h2 className='title2'>{t('descripTitleBody3')}?</h2>
                        <div className='player'><ReactPlayer url={video[lang][3]} controls  /></div>
                        <p className="title3" >{t('descripTitleBody4')}
                        </p>
                        <p className='title4'>{t('descripTitleBody5')}
                            
                        </p>
                        <div className='player2'><img className="description-img1" src={img1} alt="transaction1" /></div>
                        <p className="title4" >{t('descripTitleBody6')}.</p>
                        <div className='player3'><img className="description-img2" src={img2} alt="confirm" /><br/></div>
                        <p className="title4" >{t('descripTitleBody7')}.</p>
                        <div className='player3'> <img className="description-img2" src={img3} alt="cancel" /></div>              
                        <p className="title4" >{t('descripTitleBody8')}.<br/>{t('descriptSous6')}:</p>
                        <p className="title4" >
                            <ul>
                                <li>{t('descripTitleBody9')} </li>
                                <li>{t('descripTitleBody10')}
                                </li>
                            </ul> 
                        </p>
                        <p className="title4" >{t('descripTitleBody11')}.
                        </p>
                        <div className='player3'> <img className="description-img2" src={img6} alt="" /></div>
                        <p className='title4'>{t('descripTitleBody12')}.</p>  
                        <div className='player3'>
                            <img className="player5" src={img7} alt="" />
                        </div>
                        <div className='player2'>
                            <img className="description-img1" src={img4} alt="" />
                        </div>
                        <div className='player2'>
                            <img className="player7" src={img5} alt="" />  
                        </div>
                        <p className='title4'>{t('descripTitleBody13')}
                            
                        </p>
                        <div className='player3'>   
                            <img className="player8" src={img6} alt="" />
                        </div>
                        <p className='title4'>{t('descripTitleBody14')}
                        </p> 
                        <div className='player3'><img className="player8" src={img7} alt="" /></div>
                        <p className='title4'> {t('descripTitleBody15')} </p>
                        <div className='player2'><img className='player5' src={img8} alt="" /></div>
                                        
                    </div>
        </div>
    )
}

export default Descript1
