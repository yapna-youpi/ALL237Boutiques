import React from 'react'
import {useHistory} from 'react-router-dom'

import Head from './head/Head.jsx'
import Case from './interne/Case.jsx'
import './help.css'
import { FIRST } from './data'

const Help = () => {
    let history=useHistory()

    return (
        <>
            <Head />
            <div className="helpList">
                {FIRST.map(item=><Case key={item.id} title={item.title} description={item.description} route={item.route} img={item.img}  />)}
            </div>
        </>
    )
}

export default Help;
