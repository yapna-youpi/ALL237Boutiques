import React from 'react'
import { connect } from 'react-redux'
import { setUser } from '../../store/actions'

import SendMoney from '../sendmoney/SendMoney'
import First from './first/First'

const ConnectToCabital = () => {
    return (
        <div id="cabital" className='cabitals'>
            <div className="cabital-content">
                <First/>
            </div>
        </div>
    )
}

function SendNavigator({ User, dispatch }) {


    // console.log("the user ", User)
    return (
        <>
            {
                User.cabitalReady ? <SendMoney /> : <ConnectToCabital/>
                // true ? <SendMoney /> : <ConnectToCabital/>
            }
        </>
    )
}

const mapStateToProps = state => ({ amount: state.amountReducer.amount, country: state.countryReducer.country, User: state.userReducer.user })


export default connect(mapStateToProps)(SendNavigator)