import React from 'react'
import { Helmet } from 'react-helmet'

function Widget({ amount, crypto, wallet, opId }) {
    const ref = React.createRef()
    return (
        <>
            <div id="mercuryo-widget"></div>
            <Helmet> <script>{`
                        setTimeout(() => {
                            mercuryoWidget.run({
                                widgetId: 'c265d0fa-2797-47f6-9a83-b69003150687',
                                merchantTransactionId: '${opId}',
                                host: document.getElementById('mercuryo-widget'),
                                type: 'buy',
                                width: 350,
                                height: 650,
                                fixAmount: true,
                                currency: 'USDC',
                                fixCurrency: true,
                                fiatAmount: ${amount},
                                fixFiatAmount: true,
                                fiatCurrency: 'EUR',
                                fixFiatCurrency: true,
                                address: 'TBC1ojDr8ZYVcoiyq4jZSDmiV4YGYrvjxB',
                                signature: '065d8b3972cb618e1566d568d2421b7fc820eb921e0da0b90ece4fcbd826609b1f882d23c8ec2cc44c96649915b79d9bf0ce7f47850feab62af4ab8917f57da4',
                                hideAddress: true,
                                ratesFeeOff: true,
                                theme: 'ipc'
                            })
                        }, 0);
                    `}</script>
            </Helmet>
        </>

    )
}

export default Widget

