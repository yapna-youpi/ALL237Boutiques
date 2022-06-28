import React from 'react'
import { Modal } from 'react-responsive-modal';
import { useTranslation } from 'react-i18next'
import { FiAlertOctagon } from 'react-icons/fi'

import 'react-responsive-modal/styles.css';
import './modal2.css'

function CoverModal({mode, close}) {
    const { t } = useTranslation();

    const closeModal=()=>{
        console.log("closing")
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
                            Le service est momentanément indisponible!
                        </h2>
                        <p>
                            {/* En raison d'un desagrement, le service est temporairement inaccessible <br/> */}
                            Nos équipes font le maximum pour résoudre le problème au plus vite.<br/> 
                            Toutes nos excuses pour cet imprévu !
                        </p>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default CoverModal