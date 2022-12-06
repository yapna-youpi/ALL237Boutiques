import React from 'react'
// import ReactLoading from 'react-loading'
import { useTranslation } from 'react-i18next'

import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import sepa from './sepa.png'
import card from './card.png'
import { MdKeyboardBackspace } from 'react-icons/md'

function Payment({ back, process }) {
	const { t } = useTranslation()
	const [method, setMothod] = React.useState({ method: '', error: false })

	const processPayment = () => {
		if (!method.method) return setMothod({ ...method, error: true })
		process(method.method)
		back()
	}
	return (
		<>
			<div className="payments">
				<div className='return' onClick={back}><MdKeyboardBackspace size={25} /></div>
				<h4>{t('payments1')}</h4>
				<RadioGroup>
					<div className="radios">
						<div className="form-group1" >
							<div className="depart-inp" name="payment1" >
								<div className='departinputcontent'><img className='departimg1' src={sepa} alt='sepa' />{t('payments2')}</div>
								<div id="i-check1">
									<FormControlLabel onChange={() => setMothod({ error: false, method: 'sepa' })} value="sepa" control={<Radio color="primary" />} label="" />
								</div>
							</div>
						</div>
						<div className="form-group1" >
							<label></label>
							<div className="depart-inp" name="payment2" >
								<div className='departinputcontent'><img className='departimg' src={card} alt='sepa' />{t('payments3')}</div>
								<div id="i-check2">
									<FormControlLabel onChange={() => setMothod({ error: false, method: 'card' })} value="credit" control={<Radio color="primary" />} label="" />
								</div>
							</div>
						</div>
						{method.error && <div className='kycerreur'>{t('payments4')} </div>}
					</div>
				</RadioGroup>
			</div>
			<button className="btnpays" onClick={processPayment}>{t('payments5')} </button>
		</>
	)
}

export default Payment