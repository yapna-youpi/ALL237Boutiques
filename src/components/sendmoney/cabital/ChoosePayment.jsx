import React, { useRef, useState } from 'react'
import ReactLoading from 'react-loading'

import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import sepa from './sepa.png'
import card from './card.png'
import { MdKeyboardBackspace } from 'react-icons/md'
import { sendToApi } from '../../../utils/utilFunctions'
import { toastify } from '../../addons/toast/Toast'
import { FaLeaf } from 'react-icons/fa'

function ChoosePayment({ User, startCabital, change, state }) {
	const [method, setMethod] = React.useState("")
	const [loading, setLoading] = React.useState(false)

	// const [method, setMethod]=React.useState("")
	const _onClick = async () => {
		setLoading(true)
		let response = true
		if (method === "card") await cardPayment(state)
		// await startCabital(state)
		setLoading(false)
		response && change({ payment: false, info: true, type: method })
	}
	const handleChange = (e) => {
		if (e.target.value == 'sepa') {
			setMethod('sepa')
		} else setMethod('card')
	}
	const cardPayment = async (data) => {
		// console.log("the data ", data)
		let response = await sendToApi('cabital/cardpayment', { ...data, userId: User.userId }, User.token)
		// console.log("the response ", response)
		if (response.success) {
			window.open(response.link)
			return true
		}
		else {
			toastify('error', 'failded to get link')
			return false
		}
	}
	// const [check, setCheck] = useState('')
	// const checkInput = (e)=>{
	// 	if ((e.target.attributes.name.nodeValue == "payment1" || e.target.attributes.name.nodeValue == 'pay1') ) {
	// 		setCheck(true)
	// 	}else {
	// 		setCheck(false)
	// 	}
	// 	console.log('le name',e.target.attributes.name.nodeValue)
	// 	console.log('le check input',e.target)
	// }

	return (
		<div className='depart'>
			<FormControl fullWidth component="fieldset">
				<RadioGroup>
					{/* <h3 className='titlecolor'>SIMULATE CABITAL PROCESS</h3> */}
					<div className='backer' onClick={() => change({ solde: true, payment: false })}><MdKeyboardBackspace size={25} /></div>
					<div className="radios">
						<div className="form-group1" >
							<div className="depart-input" name="payment1" >
								<div className='departinputcontent'  name="pay1"><img className='departimg1' src={sepa} alt='sepa' /> Virement Sepa</div>
								<div id="i-check1" >
									<FormControlLabel onChange={handleChange} value="sepa" control={<Radio color="primary" />} label="" />
								</div>
							</div>
						</div>
						<div className="form-group1" >
							<label></label>
							<div className="depart-input" name="payment2" >
								<div className='departinputcontent'  name="pay2"><img className='departimg' src={card} alt='sepa' /> Carte de Credit</div>
								<div id="i-check2" >
									<FormControlLabel onChange={handleChange} value="credit" control={<Radio color="primary" />} label="" />
								</div>
							</div>
						</div>

					</div>
				</RadioGroup>
			</FormControl>
			<button className='btndepart' onClick={_onClick}>
				{
					loading ? <ReactLoading type="spin" color="#fff" width="22px" height="20px" /> : "Start"
				}
			</button>
		</div>
	)
}

export default ChoosePayment