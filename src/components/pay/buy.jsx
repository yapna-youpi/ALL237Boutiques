import { cashOut } from '../../intouch/api'
import { sendToApi, trackStatus } from '../../utils/utilFunctions'
import { checkBalance, checkAddress } from '../../bitcoins/process'


// fonction principale de l'achat
const buy = async (state, User, callback, cancel, success) => {
    let i = 0
    let attemps = 0
    // preparation des parametres
    let params = {
        partner_id: state.id,
        amount: state.xaf,
        number: state.phone,
        userId: User.userId
    }
    // let cryptoAmount = state.amount * 100000000
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
        callback(i)
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
            // console.log("we enter on track status ...")
            trackStatus({ ...params, id: params.partner_id }, User.token, () => afterBuy(i, callback, state.id, cancel, success, User), cancel)
        }
        else {
            cancel({ status: 'fail', cause: "payment demand has fail", cn: 8 }, i)
            return 10
        }
        // comment above in test or under in production
        // callback(i)
        /*  fin de l'operation  */


        // console.log("the state ", state)
        // console.log("the crypto amount ", cryptoAmount)
        // return

        // setTimeout(() => {
        //     afterBuy(i, callback, state.id, cancel, success, User)
        // }, 5000);


    } catch (error) {
        cancel({ status: 'fail', cause: "unknow error", cn: 0 }, i)
    }
}

const afterBuy = async (i, callback, id, cancel, success, User) => {
    let result
    // fin de la deuxieme etape
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
        if (result === "error") return { status: 'fail', cause: "can't get hash", cn: 7 }
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

export default buy