import React, { useState, useEffect } from 'react'
import ReactLoading from 'react-loading'
import { FaCheck } from 'react-icons/fa'
import { ImCross } from 'react-icons/im'
import { useTranslation } from 'react-i18next'

import './valid.css'

function Valid({match}) {
    const { t } = useTranslation();
    const [state, setState]=useState({load: true, valid: false})

    useEffect(() => {
        console.log(match.params.id)
        let id=match.params.id
        fetch('https://ipercash-node-api.herokuapp.com/api/user/valid/'+id)
            .then(response=>response.json()).then(data=>{
                console.log("the data ", data)
                setState({load: false, valid: data})
            })
        return () => {
            
        }
    }, [])
    console.log(state)
    return (
        <div className="checked">
            {state.load ? <ReactLoading type="spin" color='#CC1616' height={150} width={150} /> : (
                state.valid ? (<> 
                    <FaCheck size={150} color="#00B67A" /> <br/>
                    <h1>{ t('validTitle1') }</h1>
                    <h2 onClick={()=>window.location.href="/"}><u>{ t('validTitle2') }</u></h2>
                </>) : (<>
                    <ImCross size={150} color="#CC1616" /> <br/>
                    <h1 className="fail">{ t('validTitle3') }</h1>
                </>)
            )}
        </div>
    )
}

export default Valid
