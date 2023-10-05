import React, { useState, useEffect } from 'react'
import ReactLoading from 'react-loading'
import { FaCheck } from 'react-icons/fa'
import { ImCross } from 'react-icons/im'
import { useTranslation } from 'react-i18next'

import './valid.css'

const apiUrl = process.env.REACT_APP_API_URL

function Valid({ match }) {
    const { t } = useTranslation();
    const [state, setState] = useState({ load: true, valid: false })

    useEffect(() => {
        console.log(match.params.id)
        let id = match.params.id
        try {
            fetch(apiUrl + 'user/valid/' + id)
                .then(response => response.json()).then(data => {
                    // console.log("the data ", data)
                    setState({ load: false, valid: data })
                })
                .catch(error => {
                    setState({ load: false, valid: false })
                })
        } catch (error) {
            setState({ load: false, valid: false })
        }
    }, [])
    console.log(state)
    return (
        <div className="checked">
            {state.load ? <ReactLoading type="spin" color='#CC1616' height={150} width={150} /> : (
                state.valid ? (<div >
                    <p className='activated'>
                        <FaCheck size={50} color="#00B67A" /> <br />
                        <h2 className='act'>{t('validTitle1')}</h2>
                        <h2 onClick={() => window.location.href = "/login"}>
                            <u>{t('validTitle2')}</u>
                        </h2>
                    </p>
                </div>)
                    :
                    (<div className='activated'>
                        <ImCross size={50} color="#CC1616" /> <br />
                        <h2 className="fail"> {t('validTitle3')}</h2>
                    </div>)
            )}
        </div>
    )
}

export default Valid
