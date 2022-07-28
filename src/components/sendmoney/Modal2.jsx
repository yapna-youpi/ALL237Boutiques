import React from 'react'
import { Modal } from 'react-responsive-modal';
import { useTranslation } from 'react-i18next'
import { FiAlertOctagon } from 'react-icons/fi'

import 'react-responsive-modal/styles.css';
import './modal2.css'

function CoverModal({mode, close}) {
    const { t } = useTranslation();

    const closeModal=()=>{
         close()
    }

    return (
        <Modal open={mode} onClose={closeModal}  center closeOnOverlayClick 
            classNames={{
            overlay: 'm2customOverlay',
            modal: 'm2customModal',
            }}
         >
            <div className="content2">
                <div className="body-content2">
                    <div className="left">
                        <i className="icon-ind"><FiAlertOctagon size={30} /></i>
                    </div>
                    <div className="right">
                        <h2>
                            {t("modal2Title")}
                        </h2>
                        <p>
                            {t("modal2parag1")}
                            <br/>
                            {t("modal2parag2")}
                        </p>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default CoverModal