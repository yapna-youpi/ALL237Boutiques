import React, {useEffect} from 'react'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'


import store, { persistor } from '../store/store';
import Main from '../navigation/Navigator';
import resources from './lang/lang';

// initialize i18next with catalog and language to use 

let language=JSON.parse(localStorage.getItem('lang')) || {lang: 'fr', flag: 1}
i18n.use(initReactI18next)
    .init({
    resources,  
    lng: language.lang,
    fallbackLng: language.lang,
    interpolation: { escapeValue: false }
});

function AppRoot() {
    useEffect(() => {
        let rootElement=document.querySelector('#approot')
        if(navigator.appVersion.indexOf("iPhone")+1) {
            // alert(navigator.appVersion)
            rootElement.className="approotios"
        } else rootElement.className="approot"
    }, [])

    return (
        <div id="approot" className="approot">
            <Provider store={store} >
                <PersistGate loading={null} persistor={persistor} >
                    <Main />
                </PersistGate>
            </Provider>
        </div>
    )
}

export default AppRoot
