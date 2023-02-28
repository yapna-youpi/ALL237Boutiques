import { trackCinet } from "../../utils/trackStatus"
import { sendToApi } from "../../utils/utilFunctions"
import { checkBalance, checkAddress } from '../../bitcoins/process'


// fonction principale de l'achat
const buyCinet = async (state, User, callback, cashout, closeWidget, cancel, success) => {
    let i = 0
    let attemps = 0
    // preparation des parametres
    let params = {
        partner_id: state.id,
        amount: state.xaf,
        number: state.number,
        userId: User.userId
    }
    let cryptoAmount = setCryptoAmount(state.amount, state.crypto);
    let wallet = state.wallet
    let result, partner_id

    /* debut de l'operation */
    try {
        // verification de la validite de l'adresse

        do {
            result = await checkAddress(wallet, state.crypto)
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
        i++
        // verification que le montant est valide
        if (!cryptoAmount) {
            cancel({ status: 'fail', cause: 'Please retry later', cn: 1 }, i);
            return { status: 'fail', cause: 'Please retry later', cn: 1 };
        }
        // verification du solde
        do {
            result = await checkBalance(cryptoAmount, state.crypto)
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
        cashout()
        setTimeout(() => {
            trackCinet({ ...params, id: params.partner_id }, User.token, () => afterBuy(i, callback, state.id, closeWidget, cancel, success, User), cancel)
        }, 10 * 1000);

        // setTimeout(() => {
        //     afterBuy(i, callback, state.id, closeWidget, cancel, success, User)
        // }, 5000);

    } catch (error) {
        cancel({ status: 'fail', cause: "unknow error", cn: 0 }, i)
    }
}

const afterBuy = async (i, callback, id, closeWidget, cancel, success, User) => {

    let result
    // fin de la deuxieme etape
    closeWidget()
    i++
    callback(i)


    // construction de la transaction
    result = await getHash(id, User)
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


const getHash = async (id, User) => {
    let params = { id, userId: User.userId }
    return await sendToApi('buymobile/hash', params, User.token).then(result => {
        if (result.status !== "success") return { status: 'fail', cause: "can't get hash", cn: 7 }
        return result

    })
}

const setCryptoAmount = (amount, crypto) => {
    switch (crypto) {
        case 'BTC':
            return amount * 100000000;
        case 'ETH':
            return amount;
        case 'USDT':
            return amount;
        default:
            return 0;
    }

}

export default buyCinet