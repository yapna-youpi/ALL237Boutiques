import { trackCinet } from "../../utils/trackStatus"
import { sendToApi } from "../../utils/utilFunctions"
import { checkBalance, checkAddress } from '../../bitcoins/process'

const mainNetUrl = 'https://api.blockcypher.com/v1/btc/main/txs/push'
// const testNetUrl='https://api.blockcypher.com/v1/btc/test3/txs/push'


const buyCinet = async (state, User, callback, cashout, closeWidget, cancel, success) => {
    let i = 0
    let attemps = 0
    // preparation des parametres
    let params = {
        partner_id: state.id,
        amount: state.xaf,
        // amount: 100,
        number: state.number,
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
        if(result.status==='fail') {
            cancel(result, i)
            return result 
        } 

        attemps = 0
        // fin de la premiere etape 
        i++
        callback(i)  // c'est la callback ci qu'il faut modifier

        // reception du payment
        cashout()
        setTimeout(() => {
            trackCinet({ ...params, id: params.partner_id }, User.token, () => afterBuy(i, callback, wallet, crypto, closeWidget, cancel, success, User), cancel)
        }, 10*1000);

    } catch (error) {
        cancel({ status: 'fail', cause: "unknow error", cn: 0 }, i)
    }
}

const afterBuy = async (i, callback, wallet, crypto, closeWidget, cancel, success, User) => {

    let result
    // fin de la deuxieme etape
    closeWidget()
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

const getHash = async (wallet, crypto, User) => {
    let params = { recipient: wallet, amount: crypto, userId: User.userId }
    return await sendToApi('hash', params, User.token).then(result => {
        if (result === "error") return { status: 'fail', cause: "can't get hash", cn: 7 }
        return result

    })
}

export default buyCinet