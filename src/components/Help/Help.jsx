import React from 'react'

import Head from './head/Head.jsx'
import Case from './interne/Case.jsx'
import './help.css'
import { FIRST } from './data'

const Help = () => {

    return (
        <>
            <Head />
            <div className="helpList">
                <Case route={FIRST.route} />
                {/* {FIRST.map(item=><Case key={item.id} title={item.title} description={item.description} route={item.route} img={item.img}  />)} */}
            </div>
        </>
    )
}

export default Help;
