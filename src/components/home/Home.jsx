import React from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

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
    React.useEffect(()=>{
		AOS.init({
			scrollContainer: "#approot",
			duration: 1000,
		})
    }, [])

    return (
        <div className='home'>
            <Hero />
            <Operations />
            <About />
            <Partner />
            <Services />
            <Testimonials />
            <Steps />
            <Contacts />
        </div>
    )
}

export default Home
