import React from 'react'
import { connect } from 'react-redux'
import ChoosePayment from './ChoosePayment'
import RenderInfo from './RenderInfo'
import RenderOtp from './RenderOtp'

import Solde from './Solde'

function Ready({ User, data, cabital, type, close }) {
    // const [state, setState] = React.useState({ solde: true, payment: false, info: false, otp: false, type: "", amount: data.amount })
    const [state, setState] = React.useState({ solde: false, payment: false, info: true, otp: false, type: type, amount: data.amount })
    const changeState = (params) => setState({ ...state, ...params })
    return (
        <div className='ready'>
            {state.solde && <Solde change={changeState} balance={cabital.balance} />}
            {state.payment && <ChoosePayment User={User} change={changeState} state={data} />}
            {state.info && <RenderInfo User={User} change={changeState} method={state.type} state={data} cabital={cabital} />}
            {state.otp && <RenderOtp User={User} state={data} amount={state.amount} change={changeState} done={close}  />}
        </div>
    )
}
const mapStateToProps = state => ({ User: state.userReducer.user })

export default connect(mapStateToProps)(Ready)