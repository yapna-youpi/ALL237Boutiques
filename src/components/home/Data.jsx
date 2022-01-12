import React from 'react'
import  { useTranslation } from 'react-i18next'

import contactSearch from './assets/img/search-user.svg'
import contacte from './assets/img/contacts.svg' 
// import externalLink from '../img/external-link.svg'
import wallete from './assets/img/wallet.svg' 

function Data() {
    const { t } = useTranslation();
    const FIRST=[
        {
            id:1,
            title: t('dataTitlt1'),   
            description: t('dataSous1') ,
            route: 'help/description/#dsc-begin',
            img: contactSearch
        },
        {
            id:2,
            title:t('dataTitle2') ,
            description: t('dataSous2') ,
            route: 'help/description/#dsc-do',
            img: contacte
        },
        {
            id:3,
            title:t('dataTitle3') ,
            description: t('dataSous3') ,
            route: 'help/description/#dsc-buy',
            img: wallete
        },
        {
            id:4,
            title:t('dataTitle4') ,
            description:t('dataSous4') ,
            route: 'help/description/#dsc-move',
            img: wallete
        }   
    ] 

    return (
        <div>
          {FIRST}  
        </div>
    )
}

export default Data
