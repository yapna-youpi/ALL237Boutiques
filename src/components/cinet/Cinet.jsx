import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'

import './cinet.css'

function Cinet({ data, close, cancel }) {
    let cinetModal, page, scpt
    useEffect(() => {
        console.log("the props ", close, data)
        getElts()
        return () => {

        }
    }, [])

    const getElts = () => {
        let interval = setInterval(() => {
            cinetModal = document.querySelector('.cp-modal')
            page = document.querySelector('#page')
            scpt = document.querySelector('#cinet-script')
            console.log("the iframes, ", cinetModal, scpt)
            if (cinetModal) {
                const Close = document.createElement('div')
                Close.className = "cinet-close"
                Close.innerText = "X"
                Close.onclick = () => {
                    let conf = window.confirm("would you really close the payment process ?")
                    if (conf) {
                        close()
                        cancel({ status: 'fail', cause: "payment demand has fail", cn: 8 }, 1)
                        clearInterval(sessionStorage.getItem('CINET_INTERVAL'))
                        sessionStorage.removeItem('CINET_INTERVAL')

                    }
                }
                cinetModal.appendChild(Close)
                console.log("script removed ", interval)
                clearInterval(interval)
            } else {
                console.log("not found")
                getElts()
            }

        }, 10000);
    }
    const success = () => {
        alert("withdrawal successful")
    }
    const failed = () => {
        alert("withdrawal fail")
        scpt.parentNode.removeChild(scpt)
        cinetModal.parentNode.removeChild(cinetModal)
        close()
    }

    return (
        <div className="cinet">
            <Helmet> <script id="cinet-script">{`
                        function checkout() {
                            CinetPay.setConfig({
                                apikey: '20755331406241dfec7f8ac7.84958264',//   YOUR APIKEY
                                site_id: '426030',//YOUR_SITE_ID
                                notify_url: 'https://ipercash-node-api.herokuapp.com/api',
                                mode: 'PRODUCTION',
                            });
                            CinetPay.getCheckout({
                                transaction_id: '${data.id}', // YOUR TRANSACTION ID
                                amount: 100,
                                currency: 'XAF',
                                channels: 'MOBILE_MONEY',
                                // "lock_phone_number": true,
                                "customer_phone_number" : "237651851676",
                                description: 'Test de paiement',
                            });
                            CinetPay.waitResponse(function (data) {
                                if (data.status == "REFUSED") {
                                    console.log("echec du paiement ", data);
                                } else if (data.status == "ACCEPTED") {
                                    console.log("payment reussi ", data);
                                }
                            });
                            CinetPay.onError(function (data) {
                                console.log(data);
                            });
                        }
                        checkout()
                    `}</script>
            </Helmet>
        </div>
    )
}

export default Cinet


