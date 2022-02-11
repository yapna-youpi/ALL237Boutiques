import React from 'react'

import './suivi.css' 
import Head from '../head/Head' 
import Data1 from '../data1.json'
import ReactPlayer from 'react-player'


function Suivi({match}) {
    let id=match.params.id;
    return (
        <>
        <Head/>
        <div className='suivi-content1'>
            <section className="suivi-section">
                <h1 className='suivi-titre'>{Data1[id].titre}</h1>
                <div className="help-video">
                    <ReactPlayer url={Data1[id].url} controls  />
                </div>
                <h3 className='suivi-titre3'>{Data1[id].text}</h3>
                <h4 className="suivi-titre4">sugesstion {Data1[id].auteur}<br/><span className="ligne-rouge">derniere mise à jour</span> il y'a 15jrs</h4>
                <p className='suivi-paragraph'>{Data1[id].paragraph[id].parag1}</p>
                <p className='suivi-paragraph'>{Data1[id].paragraph[id].parag2}</p>
                <p className='suivi-paragraph'>{Data1[id].paragraph[id].parag3}</p><br/><br/>
                <p className='suivi-paragraph'>{Data1[id].paragraph[id].parag4}</p>
                <p className='suivi-paragraph'>{Data1[id].paragraph[id].parag5}</p>
                <p className='suivi-paragraph'>{Data1[id].paragraph[id].parag6}</p>
                <p className='suivi-paragraph'>{Data1[id].paragraph[id].parag7}</p>
                <p className='suivi-paragraph'>{Data1[id].paragraph[id].parag8}</p>
                <p className='suivi-paragraph'>{Data1[id].paragraph[id].parag9}</p>
                <p className='suivi-paragraph'>{Data1[id].paragraph[id].parag10}</p><br/><br/>
                <p className='suivi-paragraph'>{Data1[id].paragraph[id].parag11}</p><br/><br/>
                <hr width='90%' height="2px" color="#ee5253"/>
            </section>
        </div>
        
        
        </>
    )
}

export default Suivi
