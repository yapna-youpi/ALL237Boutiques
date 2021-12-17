import { cashOut } from '../../intouch/api'
import { trackStatus } from '../../utils/utilFunctions'
import { checkBalance, checkAddress } from '../../bitcoins/process'
import crypt from '../../utils/crypt'

const mainNetUrl='https://api.blockcypher.com/v1/btc/main/txs/push'
// const testNetUrl='https://api.blockcypher.com/v1/btc/test3/txs/push'

// const apiUrl='https://ipercash-node-api.herokuapp.com/api/'
const apiUrl='http://127.0.0.1:4001/api/'

// fonction principale de d'achat
const buy=async (state, User, callback, cancel, success)=>{
    console.log(" you can buy crypto ", state)
    let i=0
    let attemps=0
    // preparation des parametres
    let params={
        partner_id: state.id,
        amount: state.xaf,
        number: state.number,
        userId: User.userId
        // service: checkServiceId(state.number.substring(4)),
    }
    console.log("les params",params)
    let crypto=state.amount*100000000
    let wallet=state.wallet
    let result, partner_id

    /* debut de l'operation */
    try {
        // verification de la validite de l'adresse
            console.log("verification de l'adresse")
        do {
            //console.log("tentative ", attemps)
            result=await checkAddress(wallet)
            if(result.status==='fail') {
                attemps++
            }
            else {
                //console.log(" on continue  ")
                attemps=3
            }
        } while (attemps<3)
        if(result.status==='fail') {
            console.log(result)
            cancel(result, i)
            return result
        }
        // fin de la verification de l'adresse
        attemps=0
        // verification du solde
            console.log("verification du solde")
        do {
            //console.log("tentative ", attemps)
            result=await checkBalance(crypto)
            if(result.status==='fail') {
                attemps++
            }
            else {
                console.log("on continue")
                attemps=3
            }
            
        } while (attemps<3)
        if(result.status==='fail') {
            //console.log(result)
            cancel(result, i)
            return result
        }
        attemps=0
        // fin de la premiere etape 
        i++
        callback(i)  // c'est la callback ci qu'il faut modifier

        // reception du payment
        do {
            console.log("tentative ", attemps)
            console.log("les params du cashout", params)
            let cashout=await cashOut(params, User.token)
            cashout ? attemps=3 : attemps++
            partner_id=cashout.partner_id
            if(cashout.url) {
                callback(i, cashout.url)
            }
        } while (attemps<3);
        if(partner_id) {
            trackStatus({...params, id: params.partner_id}, User.token, ()=>afterBuy(i, callback, wallet, crypto, cancel, success), cancel)
        }
        else {
            cancel({status: 'fail', cause: "payment demand has fail"}, i)
            return 10
        }
        return
        
        /* fin de l'operation */

        //afterBuy(i, callback, wallet, crypto, cancel, success)

        
    } catch (error) {
        cancel({status: 'fail', cause: "unknow error"}, i)
        console.log("l'erreur", error)
    }
}

const afterBuy=async (i, callback, wallet, crypto, cancel, success)=>{
    
    let result
    // fin de la deuxieme etape
    i++
    callback(i)
    
    console.log("on entre dans after buy")

    // construction de la transaction
    result=await getHash(wallet, crypto)
    if(result.status==='fail') {
        console.log("echec de la construction")
        cancel(result, i)
        return result
    }
    console.log("construction reussie ",result)
    // fin de la troisieme etape
    i++
    callback(i)

    //throw("ma propre erreur cool")

    // envoie de la transaction
    //console.log("faut reactiver send crypto")
    result=await sendCrypto(result.hash)
    console.log("final result", result)
    if(result.status==='fail') {
        console.log("echec du trensfert")
        cancel(result, i)
    }
    else {
        setTimeout(() => {
            console.log("transaction reussie")
            success()
        }, 2000);
        // fin de la derniere etape
        i++
        callback(i)
    }
}


const sendCrypto=async (hash)=>{
    console.log("send bitcoin")
    var decodetx={
        tx: hash
    }
    return await fetch(mainNetUrl, {method: "POST", body: JSON.stringify(decodetx) })
    .then(response=>response.json())
    .then(data=>{
        console.log(data)
        if(data.tx) return {status: 'success', txid: data.tx.hash}
        else return {status: 'fail', cause: "can't send fund"}
    })
}

const getHash=async (wallet, crypto, User)=>{
    let params={recipient: wallet, amount: crypto, userId: User.userId}
    params=JSON.stringify(params)
    let send=crypt(params)
    //console.log("ce que j'envoie ", send)
    return await fetch(apiUrl+'hash', {
    "method": "POST",
    "headers": {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Bearer "+User.token
    },
    "body": JSON.stringify({send})
    })
    .then(response => response.json())
    .then(data=>data.response)
    .catch(err => ({status: 'fail', cause: "can't get hash"}));
}

export default buy