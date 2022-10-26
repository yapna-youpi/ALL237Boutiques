import React, { useEffect } from 'react'
import ReactLoading from 'react-loading'

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import sepa from './sepa.png'
import card from './card.png'

function Depart({ startCabital }) {
	const [loading, setLoading] = React.useState(false)
	useEffect(() => {
		_onClick()
	}, [])


	const _onClick = async () => {
		setLoading(true)
		await startCabital()
		setLoading(false)
	}

	return (
		<div className='depart'>
			<br />
			<br />
			<ReactLoading type="spin" color="#cc1616" width="75px" height="75px" />
			{/* <h3 className='titlecolor'>SIMULATE CABITAL PROCESS</h3>
			<button className='btndepart' onClick={_onClick}>
				{
					loading ? <ReactLoading type="spin" color="#fff" width="22px" height="20px" /> : "Start"
				}
			</button> */}
			<br />
			<br />
		</div>
	)
}

export default Depart