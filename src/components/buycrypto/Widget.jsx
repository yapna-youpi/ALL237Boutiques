import React from 'react'
import { Helmet } from 'react-helmet'
import { Modal } from 'react-responsive-modal'
import { FaRegCopy } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

function Widget({open, close, amount, crypto, wallet, opId}) {
    const { t } = useTranslation();
    const ref=React.createRef()
    const copy=()=>{
        if(ref) {
            console.log(ref.current)
            ref.current.select()
            document.execCommand('copy')
        }
    }

    return (
        <div className="widget">
            <Modal open={close} onClose={close} center classNames={{modal: 'custom-modal'}} closeOnOverlayClick={false}>
                <div className="opid">
                    {t('widget')}
                    <h3>
                        <input ref={ref} value={opId} className="iid" onClick={copy} contentEditable={false} /><FaRegCopy size={20} />
                    </h3>
                </div>
                <div id="mercuryo-widget-buy"></div>
            </Modal>
            {open && (
                <Helmet> <script>{`
                        // console.log('${crypto}', mercuryoWidget)
                        setTimeout(() => {
                            mercuryoWidget.run({
                                widgetId: '968b3634-4802-468d-a4ac-21fb7c39af49',
                                host: document.getElementById('mercuryo-widget-buy'),
                                type: 'buy',
                                width: 350,
                                height: 550,
                                fixAmount: true,
                                currency: '${crypto}',
                                fixCurrency: true,
                                fiatAmount: ${amount},
                                fixFiatAmount: true,
                                fiatCurrency: 'EUR',
                                fixFiatCurrency: true,
                                address: '${wallet}',
                                hideAddress: true,
                                ratesFeeOff: true,
                                onStatusChange: data => console.log("status changed ", data) 
                            })
                        }, 0);
                    `}</script>
                </Helmet>)}
        </div>
    )
}

export default Widget
