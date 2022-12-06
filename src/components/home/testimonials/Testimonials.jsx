import React,{useRef} from 'react'
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
    
    const itemsPerPage = Math.floor(window.innerWidth/400);
    const items = [4]
    const carouselRef = useRef(null);
    const totalPages = Math.ceil(items.length / itemsPerPage)
    let resetTimeout;
    const { t } = useTranslation();

    return (
        <div className="testimonials">
            <span className='temoin'>{t('testimonialTitle')}</span>
            <h2> {t('testimonialTitle2')} </h2>
            <h3>
                {/* debut de trustpilot */}
                <div className="trustpilot-widget" data-locale="en-GB" data-template-id="56278e9abfbbba0bdcd568bc" data-businessunit-id="616d7e144a86378d5870e77c" data-style-height="52px" data-style-width="100%">
                    <a href="https://uk.trustpilot.com/review/ipercash.fr" target="_blank" rel="noopener">Trustpilot</a>
                </div>    
                 {/* end of trustpilot */}
            </h3>
            <div className="testimonials-container">
                <Carousel className="testimonials-carousel"
                    pagination={false}
                    itemsToShow={Math.floor(window.innerWidth/400) || 1}
                    renderArrow={Arrows}

                    ref={carouselRef}
                    enableAutoPlay
                    autoPlaySpeed={4000} // same time
                    onNextEnd={({ index }) => {
                        clearTimeout(resetTimeout)
                        if (index + 1 === totalPages) {
                           resetTimeout = setTimeout(() => {
                              carouselRef.current.goTo(0)
                          }, 6000) // same time
                        }
                   }}
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
                            <h4>Philippe Oyono</h4>
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
                                {/* <div className="start">
                                    <SiTrustpilot color="#fff" size={20} />
                                </div> */}
                            </div>
                        </div>
                        <div className="testi-body">
                            <h4>Continuez comme ça 👌👍</h4>
                            <p>
                                Très surpris de voir un tel service aussi rapide,sécurisé et très utile ici au Cameroun.
                            </p>
                        </div>
                    </div>

                    <div className="testimonial">
                        <div className="testi-head">
                            <h4>Claudia B.</h4>
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
                            <h4>I had an excellent experience using...</h4>
                            <p>
                            I had an excellent experience using this platform. I was easy to use after performing my KYC and fast. 
                            I live in the USA and sent BTC to a mobile account in Cameroon, they received the amount in FCFA in their mobile account instantaneously! 
                            I will no longer consider using platforms such as Western Union that have higher fees and require the recipient to go to an agency!
                            </p>
                        </div>
                    </div>

                    <div className="testimonial">
                        <div className="testi-head">
                            <h4>Edmond</h4>
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
                            <h4>I like Ipercash because is the best…</h4>
                            <p>
                                I like Ipercash because is the best business to do trading in my country and transaction is fast
                            </p>
                        </div>
                    </div>
                    
                  
                   
                </Carousel>
            </div>
            
            
        </div>
    )
}

export default Testimonials


