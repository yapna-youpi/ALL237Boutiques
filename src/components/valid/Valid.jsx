import React, { useState, useEffect } from 'react'
import ReactLoading from 'react-loading'
import { FaCheck } from 'react-icons/fa'

import './valid.css'

function Valid({match}) {
    const [state, setState]=useState(null)

    useEffect(() => {
        console.log(match.params.id)
        let id=match.params.id
        fetch('https://ipercash-node-api.herokuapp.com/api/user/valid/'+id)
            .then(response=>response.json()).then(data=>setState(data))
        return () => {
            
        }
    }, [])
    console.log(state)
    return (
        <div className="checked">
            {!state ? <ReactLoading type="spin" color='#CC1616' height={150} width={150} /> : (
                <div> <FaCheck size={150} color="#CC1616" /> </div>
            )}
        </div>
    )
}

export default Valid
