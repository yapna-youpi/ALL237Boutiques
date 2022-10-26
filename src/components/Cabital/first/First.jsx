import React, { useState, useEffect, useContext } from 'react'
import { connect } from 'react-redux'
import ReactLoading from 'react-loading'
import { useTranslation } from 'react-i18next'

import './first.css'
import Unlinked from './unlinked/Unlinked'
import { sendToApi } from '../../../utils/utilFunctions'
import { toastify } from '../../addons/toast/Toast'
import Linked from './linked/Linked'
import { BalanceContext } from '../Cabital'

function First({ User }) {
    const { t } = useTranslation();
    const [error, setError] = useState(false)
    const [state, setState] = useState({ ready: false, response: null })
    const [loading, setLoading] = useState('all')
    const { setBalance } = useContext(BalanceContext)
    useEffect(() => {
        getStatus()
    }, [])

    const getStatus = async () => {
        setLoading('all')
        let params = {
            "userId": User.userId,
            "email": User.userEmail,
        }
        let response = await sendToApi('cabital/init', params, User.token)
        // console.log("the response ", response)
        if (!response.success) {
            setError(true)
            return toastify('error', `${t('first1')}`)
        }
        else {
            setState(response)
            if (response.balance) setBalance({ eur: response.balance.EUR, usdt: response.balance.USDT, ready: response.ready })
            setLoading('')
            // setReady()
        }
    }
    const setReady = () => setState({ ...state, ready: true })
    const setLoader = (position) => loading === position
    const retry = () => {
        setLoader('all')
        setError(false)
        getStatus()
    }
    return (
        <div className="first">
            <fieldset className='first-fieldset'>
                {
                    error ? (<div className='first-error'>
                        <h3>{t('first2')} </h3>
                        <p>{t('first3')} </p>
                        <button onClick={retry}>Retry</button>
                    </div>) :
                        (setLoader('all') ? (<div className="loader"><ReactLoading type="spin" color="#cc1616" width="112px" height="112px" /></div>) : (
                            state.ready ? <>
                                <legend><h2>{t('first4')} </h2></legend>
                                <Linked data={state} User={User} />
                            </> : <>
                                <legend><h2>{t('first5')} </h2></legend>
                                <Unlinked data={state} User={User} setReady={getStatus} />
                            </>
                        ))
                }
            </fieldset>
        </div>
    )
}


const mapStateToProps = state => ({ User: state.userReducer.user })

export default connect(mapStateToProps)(First)