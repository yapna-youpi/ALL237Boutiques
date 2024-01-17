import React,{ useState, useEffect, useRef } from 'react'
import { sendToApi } from '../../../../utils/utilFunctions'
import { toastify } from '../../../addons/toast/Toast'
import { Modal } from 'react-responsive-modal'
import ReactLoading from 'react-loading';
import { useTranslation } from 'react-i18next';
import dateFormat, { masks } from "dateformat";
import './modalist.css'

export default function ModalList ({ userData , modalData , onClose }){
    const {t} = useTranslation()
    const btnref = useRef()
    
    const [loader2,setLoader2] = useState(false)
    const now = new Date(userData.updated_at);
    const date = new Date();

    const handleClaim =()=>{  // creer une reclammation par rapport à une operation

        btnref.current.onclick=function() {//pour autoriser qu'un seul clique
            this.onclick=function(e) {
                e.preventDefault();
            }
        }

        setLoader2(true)
        const claim = {
            transaction_id: modalData.transaction_id,
            clientId: modalData.userId,
            clientName: userData.userName,
            amountFiat: modalData.amountFiat,
            amountCrypto: modalData.amountCrypto,
            currency: modalData.cryptoCurency,
            authorId: userData.userId,
            authorName: userData.userName
        }
        sendToApi('user/setclaim', claim, userData.token)
        .then(data => {
            setLoader2(false)
            // console.log('les datas',data)
            if (data.success) {
                toastify("success", `${t('modaList1')}`,3000)  
            }else {
                toastify("error", `${t('modaList2')}`,3000)
            }
        }).catch(error => {
            toastify("error", `${t('modaList3')}`,3000) 
        })
    }
    console.log("les valeurs",modalData.transaction_id.slice(0,3))

    return (
        <>
            <Modal open={true} onClose={() => onClose(false) } center={true} onOverlayClick={() => onClose(false)} >
                <div>
                    <div className="handle-claim"><div className="claim-operation">
                        <h3>{t('modaList4')}</h3>
                        <div className='txt'>{t('modaList5')} <b>{modalData.status}</b> </div>
                        <div className='txt'>{t('modaList6')} {modalData.transaction_id} </div>
                        <div className='txt'>{t('modaList7')} { modalData.transaction_id.slice(0,3) == "IPB" ? t('modaList11') : t('modaList12')} </div>
                        <div className='txt'>{t('modaList8')} {modalData.amountCrypto + ' ' + modalData.cryptoCurency} </div>
                        <div className='txt'>{t('modaList9')} {modalData.amountFiat} </div>
                        <div className='txt'>{t('modaList10')} {userData.userName} </div>
                    </div><hr/>
                        <div className="claim-actions">
                            <button className="modal-button" onClick={() => handleClaim()} ref={btnref} disabled={loader2}>
                                { loader2 ?  (<div className='react-loa'><ReactLoading type="spin" color='#ffffff' height={30} width={30} center /></div>
                                          ) : t('modaList13')
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}