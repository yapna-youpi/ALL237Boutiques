import React from 'react'
import { Modal } from 'react-responsive-modal';
import ReactLoading from 'react-loading'
import { useTranslation } from 'react-i18next'
import { FaCheck, FaRegCopy } from 'react-icons/fa'

import 'react-responsive-modal/styles.css';
import './modal.css'

function CoverModal({option, close}) {
    const { t } = useTranslation();

    let ref=React.createRef()
    const copy=()=>{
        if(ref) {
            console.log(ref.current)
            ref.current.select()
            document.execCommand('copy')
        }
    }
    const closeModal=()=>{
        if(window.confirm("you can't follow the operation ! \nMake sure you have save the operation id")) close()
    }
    return (
        <Modal open={option.open} center showCloseIcon={false}
            onClose={ option.closable ? ()=>close() : ()=>{}}  
            classNames={{
            overlay: 'customOverlay',
            modal: 'customModal',
            }}
        >
            <div className="content">
                <div className="head-content">
                    <h2>{t('coverModalTitle')}</h2>
                    <button onClick={closeModal} >X</button>
                </div>
                <div className="body-content">
                    <p>{t('coverModalSous1')} </p>
                    <h3 className="tid" onClick={copy}><input ref={ref} value={option.operationId} className="iid" contentEditable={false} /><FaRegCopy size={25} /> </h3>
                    
                    <p> { t('coverModalSous2')}  </p>
                    <div className="spinner"> 
                        {option.status==='success' ? (<FaCheck size={50} color='#05e8a5' />) : (<ReactLoading type="spinningBubbles" color='#CC1616' height='100px' width='100px' />) }
                    </div>
                    <p> { option.status==='success' ? t('coverModalSous4')  : t('coverModalSous5') } </p>
                </div>
            </div>
        </Modal>
    )
}

export default CoverModal