import React, { useState, useEffect, useContext } from 'react'
import { connect } from 'react-redux'
import ReactLoading from 'react-loading'
import { useTranslation } from 'react-i18next'

import './first.css'
import Unlinked from './unlinked/Unlinked'
import { sendToApi } from '../../../utils/utilFunctions'
import { toastify } from '../../addons/toast/Toast'
import { setUser } from '../../../store/actions'

function First({ User, dispatch }) {
    const { t } = useTranslation();
    const [state, setState] = useState({ ready: false, response: null })
    const [loading, setLoading] = useState('all')
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
            // setError(true)
            return toastify('error', `${t('first1')}`)
        }
        else {
            setState(response)
            if (response.balance) {
                setLoading('')
                setReady()
            }
            // setBalance({ eur: response.balance.EUR, usdt: response.balance.USDT, ready: response.ready })
        }
    }
    const setReady = () => dispatch(setUser({ ...User, cabitalReady: true }))
    const setLoader = (position) => loading === position

    return (
        <div className="first">
            <fieldset className='first-fieldset'>
                <legend><h2>{t('first5')} </h2></legend>
                <Unlinked data={state} User={User} setReady={getStatus} />
            </fieldset>
        </div>
    )
}


const mapStateToProps = state => ({ User: state.userReducer.user })

export default connect(mapStateToProps)(First)