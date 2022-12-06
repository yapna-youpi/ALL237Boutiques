import { cashOut } from '../../intouch/api'
import { sendToApi, trackStatus } from '../../utils/utilFunctions'
import { checkBalance, checkAddress } from '../../bitcoins/process'
// import crypt from '../../utils/crypt'

const mainNetUrl = 'https://api.blockcypher.com/v1/btc/main/txs/push'
// const testNetUrl='https://api.blockcypher.com/v1/btc/test3/txs/push'

// fonction principale de l'achat
const buy = async (state, User, callback, cancel, success) => {
    let i = 0
    let attemps = 0
    // preparation des parametres
    let params = {
        partner_id: state.id,
        amount: state.xaf,
        // amount: 500,
        number: state.phone,
        userId: User.userId
        // service: checkServiceId(state.number.substring(4)),
    }
    let crypto = state.amount * 100000000
    // let crypto=0.01*100000000 
    let wallet = state.wallet
    let result, partner_id

    /* debut de l'operation */
    try {
        // verification de la validite de l'adresse
        do {
            result = await checkAddress(wallet)
            if (result.status === 'fail') {
                attemps++
            }
            else {
                attemps = 3
            }
        } while (attemps < 3)
        if (result.status === 'fail') {
            cancel(result, i)
            return result
        }
        // fin de la verification de l'adresse
        attemps = 0
        // verification du solde
        do {
            result = await checkBalance(crypto)
            if (result.status === 'fail') {
                attemps++
            }
            else {
                attemps = 3
            }

        } while (attemps < 3)
        if (result.status === 'fail') {
            cancel(result, i)
            return result
        }
        attemps = 0
        // fin de la premiere etape 
        i++
        callback(i)  // c'est la callback ci qu'il faut modifier

        // reception du payment
        do {
            let cashout = await cashOut(params, User.token)
            cashout ? attemps = 3 : attemps++
            partner_id = cashout.partner_id
            if (cashout.url) {
                callback(i, cashout.url)
            }
        } while (attemps < 3)
        if (partner_id) {
            trackStatus({ ...params, id: params.partner_id }, User.token, () => afterBuy(i, callback, wallet, crypto, cancel, success, User), cancel)
        }
        else {
            cancel({ status: 'fail', cause: "payment demand has fail", cn: 8 }, i)
            return 10
        } 
        // comment above in test or under in production
        // callback(i)
        /* fin de l'operation */

        // afterBuy(i, callback, wallet, crypto, cancel, success, User)


    } catch (error) {
        cancel({ status: 'fail', cause: "unknow error", cn: 0 }, i)
    }
}

const afterBuy = async (i, callback, wallet, crypto, cancel, success, User) => {
    let result
    // fin de la deuxieme etape
    i++
    callback(i)


    // construction de la transaction
    result = await getHash(wallet, crypto, User)
    if (result.status === 'fail') {
        cancel(result, i)
        return result
    }
    // fin de la troisieme etape
    i++
    callback(i)
    // on termine l'operation
    setTimeout(() => {
        success(result.txid)
    }, 1500);
    // fin de la derniere etape
    i++
    callback(i)

}


const sendCrypto = async (hash) => {
    var decodetx = {
        tx: hash
    }
    return await fetch(mainNetUrl, { method: "POST", body: JSON.stringify(decodetx) })
        .then(response => response.json())
        .then(data => {
            if (data.tx) return { status: 'success', txid: data.tx.hash }
            else return { status: 'fail', cause: "can't send funds", cn: 7 }
        })
}

const getHash = async (wallet, crypto, User) => {
    let params = { recipient: wallet, amount: crypto, userId: User.userId }
    return await sendToApi('hash', params, User.token).then(result => {
        if (result === "error") return { status: 'fail', cause: "can't get hash", cn: 7 }
        return result

    })
}

export default buy