import React from 'react'
import ReactPlayer from 'react-player'
import { useTranslation } from 'react-i18next'

import './descript2.css'
import img9 from '../assets/img9.jpg'
import img10 from '../assets/img10.jpg'
import img11 from '../assets/img11.jpg'
import img12 from '../assets/img12.jpg'

function Descript1({lang,video}) {
    const { t } = useTranslation();
    return (
        <div>
             {/*----section to buy--*/}
             <div className='content-about' id="dsc-buy">
                        <h2 className='title2'>{t('descripTitleBody16')}  ?</h2>
                        <div className='player'><ReactPlayer url={video[lang][2]} controls  /></div>
                        <p className='title3'><span className='title-color'>{t('descripTitleBody17')}<br/>{t('descriptionBody51')}.</span> </p>
                        <div className='player2'><img className="description-img1" src={img9} alt="" /></div>
                        <p className='title3'>{t('descripTitleBody18')}.</p>
                        <div className="player3"><img className="player8" src={img10} alt="" /></div>
                        <p className='title3'>{t('descripTitleBody19')}.</p>
                        <p className='title3'>{t('descripTitleBody20')}.</p>
                        <div className="player2"><img className="description-img1" src={img11} alt="" /></div>
                        <p className='title3'>{t('descripTitleBody21')}.</p>
                        <p className='title3'>{t('descripTitleBody22')}.</p>
                        <p className='title3'>{t('descripTitleBody23')}.</p>
                        <div className="player2"><img className="player5" src={img12} alt="" /></div>
                        <div className="player2"> <img className="description-img1" src={img11} alt="" /></div>
                        <p className='title3'>{t('descripTitleBody24')}</p>
                        <p className='title3'>{t('descripTitleBody25')}.<br/> {t('descripTitleBody52')}.</p>
                        <p className='title3'>{t('descripTitleBody26')}.</p>
                        <div className="player2"><img className="player5" src={img12} alt="" /></div>
                    </div>
        </div>
    )
}

export default Descript1
