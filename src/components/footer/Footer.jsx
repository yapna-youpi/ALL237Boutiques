import React from 'react'
import { useTranslation } from 'react-i18next'

import './footer.css'

function Footer() {
    const { t } = useTranslation();

    return (
        <div className="footer">
            <footer>
                <div className="first">
                    <h3> &copy;{t('footerSous1')}</h3>
                    <h5>{t('footerSous2')} <span>{t('footerSous3')}</span> </h5>
                </div>
                <div className="second">
                    <button>{t('footerSous4')}</button> &ensp;
                    <button>{t('footerSous5')}</button>  &ensp;
                    <button>{t('footerSous6')}</button>   &ensp;
                </div>
            </footer>
        </div>
    )
}

export default Footer
