import React from 'react'

import './home.css'
import Hero from './hero/Hero';
import Partner from './partners/Partner';
import About from './about/About';
import Operations from './operations/Operations';
import Services from './services/Services';
import Testimonials from './testimonials/Testimonials';
import Steps from './steps/Steps';
import Contacts from './contacts/Contacts';

function Home() {
    return (
        <div className='home'>
            <Hero />
            <Partner />
            <About />
            <Operations />
            <Services />
            <Testimonials />
            <Steps />
            <Contacts />
        </div>
    )
}

export default Home
