import React from 'react'
import ReactPlayer from 'react-player'
import { useTranslation } from 'react-i18next'

import './descript3.css'
import img13 from '../assets/img13.png'
import img14 from '../assets/img14.png'
import img15 from '../assets/img15.png'
import img16 from '../assets/img16.png'
import img17 from '../assets/img17.png'
import img18 from '../assets/img18.png'
import img19 from '../assets/img19.png'
import img20 from '../assets/img20.png'

function Descript1({lang,video}) {
    const { t } = useTranslation();
    return (
        <div>
             {/*---section-to send---*/}
             <div className='content-about' id="dsc-do">
                        <h2 className='title2'>{t('descripTitleBody27')} ?</h2>
                        <div className='player'><ReactPlayer url={video[lang][1]} controls  /></div>
                        <p className='title3'><span className='title-color'>{t('descripTitleBody28')}.</span> </p>
                        <p className='title3'>{t('descripTitleBody29')}.</p>
                        <p className='title3'>{t('descripTitleBody30')}.</p>
                        <p className='title3'>{t('descripTitleBody31')}.</p>
                        <p className='title3'>{t('descripTitleBody32')}.
                        </p>
                        <div className="player3"><img className="description-img1" src={img13} alt="" /></div>
                        <p className='title3'>{t('descripTitleBody33')}</p>
                        <div className="player3"><img className="description-img1   " src={img14} alt="" /></div>
                        <p className='title3'>{t('descripTitleBody34')} :</p>
                        <div className="player3"><img className="description-img2" src={img15} alt="" /></div>
                        <p className='title3'>{t('descripTitleBody35')}</p>
                        <div className="player3"><img className="description-img2" src={img16} alt="" /></div>
                        <p className='title3'>{t('descripTitleBody36')}.</p>
                        <div className="player3"><img className="description-img2" src={img17} alt="" /></div>
                        <p className='title3'>{t('descripTitleBody37')}</p>
                        <div className="player3"><img className="description-img2" src={img18} alt="" /></div>
                        <div className="player3"><img className="player5" src={img19} alt="" /></div>
                        <p className='title3'>{t('descripTitleBody38')},</p>
                        <div className="player3">
                            <img className="description-img1" src={img20} alt="" />
                        </div>
                        <p className='title3' >{t('descripTitleBody45')}</p>
                        <p className='title3' >{t('descripTitleBody46')}.</p>
                        <p className='title3' >{t('descripTitleBody47')}!</p>
                    </div>
        </div>
    )
}

export default Descript1
