import React from 'react'
import {useHistory} from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import './notfound.css'

function NotFound() {
    let history=useHistory()
    const { t } = useTranslation();

    return (
        <div id="notfound" className="notfound">
            <div id="error">
                <div class="error">
                    <div class="first">
                        <div class="image"></div>
                    </div>
                    <div class="second">
                        <h1>404</h1>
                        <h3>{t('error1')}</h3>
                        <p>
                            {t('error2')}
                        </p>
                        <span onClick={()=>history.push('/')} >{t('error3')}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFound
