import React from 'react'
// import { Swiper, SwiperSlide } from "swiper/react"
// import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { useTranslation } from 'react-i18next'

import './slide.css'
import ImageSlider from './bigslide/ImageSlider'
import { SliderData } from './bigslide/SliderData'

function Slider({start}) {
    const { t } = useTranslation()
    const [state, setState] = React.useState(false)

    return (
        <div className='sliders'>
            {state ? (

                <ImageSlider slides={SliderData}  start={start} />
            ) : (
                <div className=" tutoriel">
                    <h2 className='tutotitle' >{t('slider1')} </h2>
                    <h4 className='soustuto'>{t('slider2')}</h4>
                    <ul className='tutorielist'>
                        <li className='lis'>{t('slider3')} </li> <br />
                        <li className='lis'>{t('slider4')} </li> <br />
                        <li className='notlist'>{t('slider5')} </li> <br />
                        <li className='lis'>{t('slider6')}</li><br />
                    </ul>
                    <a href='https://www.cabital.com/' target="_blank" rel='nofollow'><span className='seemore'>{t('slider7')}</span></a>
                    <div className="">
                        <button className='watch' onClick={() => setState(true)}>{t('slider8')}</button> <br /> <br />
                        <button className='skip' onClick={start}>{t('slider9')}</button><br />
                    </div>
                    <br/><br/>
                </div>
            )}
        </div>
    )

}

export default Slider