import React from 'react'
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next'

import './footer.css'

function Footer() {
    const { t } = useTranslation();
    const History = useHistory();

    let AmList={
        en: ["http://ftp.ipercash.fr/politiques//aml_en.pdf","http://ftp.ipercash.fr/politiques//ploicy_fr.pdf" , "http://ftp.ipercash.fr/politiques//term_en.pdf"],
        fr: ["http://ftp.ipercash.fr/politiques//aml_fr.pdf","http://ftp.ipercash.fr/politiques//policy_en.pdf" , "http://ftp.ipercash.fr/politiques//terms_fr.pdf" ]
    }
    let lang=JSON.parse(localStorage.getItem("lang")||'{"lang":"en"}').lang

    return (
        <div className="footer">
            <footer>
                <div className="first">
                    <h3> &copy;{t('footerSous1')}</h3>
                    <h5>{t('footerSous2')}<span onClick={()=>History.push("/")} className='logo'> {t('footerSous3')}</span></h5>
                </div>
                <div className="second">
                    <button  ><a href={AmList[lang][2]} target="_blank">{t('footerSous4')}</a>&ensp;</button>
                    <button  ><a href={AmList[lang][1]} target="_blank">{t('footerSous5')}</a>&ensp;</button>
                    <button  ><a href={AmList[lang][0]} target="_blank">{t('footerSous6')}</a>&ensp;</button>
                    {/* </button> 
                    <button>  &ensp;
                    <button></button>   &ensp; */}
                    
                </div>
            </footer>
        </div>
    )
}

export default Footer
