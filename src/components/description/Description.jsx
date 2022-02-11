import React, { useEffect } from 'react'
import ReactPlayer from 'react-player'
import { useTranslation } from 'react-i18next'
import { RiLuggageDepositFill } from 'react-icons/ri'
import { GiSellCard } from 'react-icons/gi'
import { FaCartPlus } from 'react-icons/fa'
import { FaBook } from 'react-icons/fa'

import './description.css'

import Descript1 from './descript1/Descript1'
import Descript2 from './descript2/Descript2'
import Descript3 from './descript3/Descript3'
import External from './assets/external-link.svg'


let videoList={
    en: ["https://www.youtube.com/watch?v=kMVa9Pl7xkk", "https://www.youtube.com/watch?v=p1sZbMYpMnU", "https://www.youtube.com/watch?v=EdtT-tHeQMA", "https://www.youtube.com/watch?v=7E-wfJub7c8" ],
    fr: ["https://www.youtube.com/watch?v=IBqu-9rsPqU", "https://www.youtube.com/watch?v=g6yOeoWK9hA", "https://www.youtube.com/watch?v=6FXOQkpMnlg", "https://www.youtube.com/watch?v=LC7W8JvRZOE" ]
}

function Description() {
    const { t } = useTranslation()
    const { pathname, hash, key }=window.location
    useEffect(() => {
        console.log("use effect on")
        if(hash==='') window.scrollTo(0, 0)
        else {
            let id=hash.replace('#', '')
            let element=document.getElementById(id)
            if(element) element.scrollIntoView()
        }
    }, [ pathname, hash, key ])

    let lang=JSON.parse(localStorage.getItem("lang")).lang
    return (
        <div  className="description">
            <div className="description-head">
                <div className="help-bd">
                    {/* entete de la page en rouge */}
                    <div className="help-Gone">
                    <div><a href='http://soon.ipercash.fr'><span className="help-Logo" >IPERCASH</span></a></div>
                    <div><a href='http://soon.ipercash.fr'> <span className="help-Rt"><img className="svg1" src={External} alt='link'/>{t('descripTitle')} </span></a></div>
                    </div>
                </div>
            </div>
            <div className="description-body">
                <div className="description-menu">
                    <ul className="list-ul">
                        <li className="list"> 
                            <a href="#dsc-about">
                                <span className="icon"><i>&ensp;<FaBook/></i></span>
                                <span className="title">{t('descriptSous1')} </span>
                            </a>
                        </li>
                        <li className="list"> 
                            <a href="#dsc-move">
                                <span className="icon"><i>&ensp;<GiSellCard/></i></span>
                                <span className="title">{t('descriptSous2')}  {/*{vente votre crypto*/}</span>
                            </a>
                        </li>
                        <li className="list"> 
                            <a href="#dsc-buy">
                                <span className="icon"><i>&ensp;<FaCartPlus/></i></span>
                                <span className="title">{t('descriptSous3')} {/*achat de la crypto*/} </span>
                            </a>
                        </li>
                        <li className="list"> 
                            <a href="#dsc-do">
                                <span className="icon"><i>&ensp;<RiLuggageDepositFill/></i></span>
                                <span className="title">{t('descriptSous4')} {/*un depot Mobile Money */}</span>
                            </a>
                        </li>   
                    </ul>
                </div>
                <div className="description-content">
                    {/*--section--about--*/}
                    <div className='content-about' id="dsc-about">
                        <h1 className='title2' style={{textAlign:"center",fontSize:"45px"}}>{t('descripTitleBody1')} </h1>
                        <p className='title3'><span className='title-color'>{t('descripTitleBody2')} </span> </p>
                        <p style={{fontSize:"16px"}}>{t('descriptAjout')}</p>
                        <div className='player'><ReactPlayer url={videoList[lang][0]} controls  /></div>
                    </div>
                   
                <Descript1  video={videoList} lang={lang} />
                <Descript2  video={videoList} lang={lang} />
                <Descript3  video={videoList} lang={lang} />
                    <hr width='90%' height="2px" color="#ee5253"/>
                    </div>
            </div>
        </div>
    )
}

export default Description
