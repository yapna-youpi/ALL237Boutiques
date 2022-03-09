import React from 'react'
import { useTranslation } from 'react-i18next'
import Carousel, { consts } from 'react-elastic-carousel'
import { SiTrustpilot } from 'react-icons/si'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'


import './testimonials.css'

const Arrows=({type, onClick, isEdge})=>{
    const pointer=type===consts.PREV ? <div className="recarrow"><FaChevronLeft size={20} /></div> : <div className="recarrow"><FaChevronRight size={20} /></div>
    return (
      <button onClick={onClick} disabled={isEdge}>
        {pointer}
      </button>
    )
}

function Testimonials() {
    const { t } = useTranslation();
    // console.log(window.innerWidth)
    return (
        <div className="testimonials">
            <h1> {t('testimonialTitle')} </h1>
            <h3>
                {/* debut de trustpilot */}
                <div className="trustpilot-widget" data-locale="en-GB" data-template-id="56278e9abfbbba0bdcd568bc" data-businessunit-id="616d7e144a86378d5870e77c" data-style-height="52px" data-style-width="100%">
                    <a href="https://uk.trustpilot.com/review/ipercash.fr" target="_blank" >Trustpilot</a>
                </div>    
                 {/* end of trustpilot */}
            </h3>
            <div className="testimonials-container">
                <Carousel className="testimonials-carousel"
                    pagination={false} itemsToShow={Math.floor(window.innerWidth/300)}
                    renderArrow={Arrows}
                >
                    <div className="testimonial">
                        <div className="testi-head">
                            <h4>Yapna Youpi</h4>
                            <div className="starts">
                                <div className="start">
                                    <SiTrustpilot color="#fff" size={20} />
                                </div>
                                <div className="start">
                                    <SiTrustpilot color="#fff" size={20} />
                                </div>
                                <div className="start">
                                    <SiTrustpilot color="#fff" size={20} />
                                </div>
                                <div className="start">
                                    <SiTrustpilot color="#fff" size={20} />
                                </div>
                                <div className="start">
                                    <SiTrustpilot color="#fff" size={20} />
                                </div>
                            </div>
                        </div>
                        <div className="testi-body">
                            <h4>vraiment tres belle experience je suis…</h4>
                            <p>
                                vraiment tres belle experience je suis etonne de ce genre de cervice dans mon pays cest rapide et securise
                                vraiment encore merci
                            </p>
                        </div>
                    </div>
                    <div className="testimonial">
                        <div className="testi-head">
                            <h4>christian DJITSA</h4>
                            <div className="starts">
                                <div className="start">
                                    <SiTrustpilot color="#fff" size={20} />
                                </div>
                                <div className="start">
                                    <SiTrustpilot color="#fff" size={20} />
                                </div>
                                <div className="start">
                                    <SiTrustpilot color="#fff" size={20} />
                                </div>
                                <div className="start">
                                    <SiTrustpilot color="#fff" size={20} />
                                </div>
                                <div className="start">
                                    <SiTrustpilot color="#fff" size={20} />
                                </div>
                            </div>
                        </div>
                        <div className="testi-body">
                            <h4>Service rapide et de qualité</h4>
                            <p>
                                Service rapide, viable et de qualité.
                            </p>
                        </div>
                    </div>
                    <div className="testimonial">
                        <div className="testi-head">
                            <h4>Yapna Youpi</h4>
                            <div className="starts">
                                <div className="start">
                                    <SiTrustpilot color="#fff" size={20} />
                                </div>
                                <div className="start">
                                    <SiTrustpilot color="#fff" size={20} />
                                </div>
                                <div className="start">
                                    <SiTrustpilot color="#fff" size={20} />
                                </div>
                                <div className="start">
                                    <SiTrustpilot color="#fff" size={20} />
                                </div>
                                <div className="start">
                                    <SiTrustpilot color="#fff" size={20} />
                                </div>
                            </div>
                        </div>
                        <div className="testi-body">
                            <h4>vraiment tres belle experience je suis…</h4>
                            <p>
                                vraiment tres belle experience je suis etonne de ce genre de cervice dans mon pays cest rapide et securise
                                vraiment encore merci
                            </p>
                        </div>
                    </div>
                </Carousel>
            </div>
            
            
        </div>
    )
}

export default Testimonials


