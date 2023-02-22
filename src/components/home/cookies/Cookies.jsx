import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';

import './cookies.css'

function Cookies() {
	let { t } = useTranslation();

	const [showCookie, setShowCookie] = useState(false);
	const [showCookie2, setShowCookie2] = useState(true);

	useEffect(() => {
		const legalCookie = localStorage.getItem('legalCookie');

		if (legalCookie == "accepte") {
			return false
		} else {
			setTimeout(() => {
				setShowCookie(!showCookie);
			}, 3000);
		}

	}, [])


	const setCookie = () => {
		setShowCookie(!showCookie)
		localStorage.setItem('legalCookie', "accepte");
	}

	const setCookie2 = () => {

		if (showCookie2 == false) {
			setShowCookie2(true)

		} else {
			setShowCookie2(!showCookie2)
		}

	}


	return (
		<>
			{showCookie ?
				(<div className='cookie '>
					<div className='cookie-1'>
						<h6 className='cook-text'>{t('cookie1')}</h6>
						<h5 className='cook-test2'>{t('cookie5')}</h5>
						{showCookie2 ?

							(<span className='cook-text3'>{t('cookie2')}<br />{t('cookie3')}
								{/* <br/>{t('cookie4')} */}
							</span>)
							:

							(<div className='cook-lig'>
								<div className='cook-lig'>
									<div>{t('cookie6')}</div>
									<div>
										<label>
											<input type="checkbox" id="cookie-cook" />
											<span className='cookie-check'></span>
										</label>
									</div>
								</div>
								<div className='cook-lig'>
									<div>{t('cookie7')}</div>
									<div>
										<label>
											<input type="checkbox" id="cookie-cook" />
											<span className='cookie-check'></span>
										</label>
									</div>
								</div>
							</div>)
						}

					</div>
					<div className='cookie-2'>
						<div onClick={setCookie2} className='cookie-4'>{t('cookie8')}</div>
						<div onClick={setCookie} className='cookie-3'>{t('cookie9')}</div>
					</div>
				</div>)
				: ('')
			}
		</>
	)
}

export default Cookies