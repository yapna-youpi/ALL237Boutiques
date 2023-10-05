import { sendToApi } from "../utils/utilFunctions";

// fonction qui verifie la presence des fonds
let myAddress = process.env.REACT_APP_DIST_WALLET;
// const checkBtcBalance = async (amount) => fetch(process.env.REACT_APP_BLOCKCYPHER_ADDRESS + myAddress)
//     .then(response => response.json())
//     .then(data => {
//         if (data.address) {
//             //console.log(data)
//             //console.log(data.final_balance)
//             if (data.final_balance > amount + 4000) { // en production c'est 7500
//                 return { status: "success" };
//             }
//             else return { status: 'fail', cause: 'Please retry later', cn: 1 };
//         }
//         else return { status: 'fail', cause: 'bad address', cn: 2 };
//     })
//     .catch(err => ({ status: 'fail', cause: 'Please retry later', cn: 3 }))

const checkBtcBalance = async (amount) => {
    const { balance } = await sendToApi('buymobile/checkbalance', { crypto: 'BTC', amount });
    if (balance) return { status: "success" };
    else return { status: 'fail', cause: 'Please retry later', cn: 1 };
}
const checkEthBalance = async (amount) => {
    const { balance } = await sendToApi('buymobile/checkbalance', { crypto: 'ETH', amount });
    if (balance) return { status: "success" };
    else return { status: 'fail', cause: 'Please retry later', cn: 1 };
}
const checkUsdtBalance = async (amount) => {
    const { balance } = await sendToApi('buymobile/checkbalance', { crypto: 'USDT', amount });
    if (balance) return { status: "success" };
    else return { status: 'fail', cause: 'Please retry later', cn: 1 };
}


const checkBtcAddress = async (address) => fetch(process.env.REACT_APP_BLOCKCYPHER_ADDRESS + address, { method: 'GET' })
    .then(response => response.json())
    .then(data => {
        //console.log("l'adresse ", data)
        if (data.error) return { status: 'fail', cause: "invalid address", cn: 4 }
        return { status: 'success', address: data.address }
        // {status: 'success', address: data}
    })
    .catch(err => ({ status: 'fail', cause: "can not get status of address", cn: 5 }))

const checkEthAddress = async (address) => ({ status: 'success', address })

const checkUsdtAddress = async (address) => ({ status: 'success', address })


const checkBalance = async (amount, crypto) => {
    switch (crypto) {
        case 'BTC':
            return await checkBtcBalance(amount);
        case 'ETH':
            // return { status: "success" };
            return await checkEthBalance(amount);
        case 'USDT':
            // return { status: "success" };
            return await checkUsdtBalance(amount);
        default:
            return { status: 'fail', cause: 'Please retry later', cn: 1 };
    }

}

const checkAddress = async (address, crypto) => {
    switch (crypto) {
        case 'BTC':
            return await checkBtcAddress(address);
        case 'ETH':
            return await checkEthAddress(address);
        case 'USDT':
            return await checkUsdtAddress(address);
        default:
            return { status: 'fail', cause: "invalid address", cn: 4 };
    }

}


export { checkBalance, checkAddress }
