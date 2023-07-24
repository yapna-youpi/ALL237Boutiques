import React from 'react'
import { Modal } from 'react-responsive-modal';
import { useTranslation } from 'react-i18next'
import { FaRegCopy } from 'react-icons/fa'
import { ImCross } from 'react-icons/im'


import 'react-responsive-modal/styles.css';
import './modal.css'
import Widget from './Widget'
import { toastify } from '../addons/toast/Toast';

function CoverModal({ option, close, amount }) {
    const { t } = useTranslation();

    let ref = React.createRef()
    const copy = (text) => {
        navigator.clipboard.writeText(text)
        toastify('info', "text copied", 3 * 1000)
    }
    const closeModal = () => {
        if (window.confirm("you can't follow the operation ! \nMake sure you have save the operation id")) close()
    }

    // console.log("the options ", option)
    return (
        <Modal open={option.open} center showCloseIcon={false}
            onClose={option.closable ? () => close() : () => { }}
            classNames={{
                overlay: 'customOverlay',
                modal: 'customModal',
            }}
        >
            <div className="">
                {option.status === 'pending' && <Widget opId={option.operationId} amount={option.amount} />}
                {option.status === 'failed' && <div className="content">
                    <div className="head-content">
                        <h2>{t('coverModalSous6')}</h2>
                        <button onClick={closeModal} >X</button>
                    </div>
                    <div className="body-content">
                        <p>{t('coverModalSous1')} </p>
                        <h3 className="tid" onClick={() => copy(option.operationId)}><span className="icopy" >{option.operationId}</span> <FaRegCopy size={25} /> </h3>
                        {/* <input ref={ref} value={option.operationId} className="iid" contentEditable={false} /> */}
                        <p> {t('coverModalSous2')}  </p>
                        <div className="spinner">
                            <ImCross size={75} color='#CC1616' />
                        </div>
                        <p>{t('coverModalSous6')} </p>
                    </div>
                </div>}
            </div>
        </Modal>
    )
}

export default CoverModal