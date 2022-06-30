import crypt from '../utils/crypt'

// const apiUrl='https://ipercash-node-api.herokuapp.com/api/'
// const apiUrl='http://127.0.0.1:4001/api/'
const apiUrl=process.env.REACT_APP_API_URL

// fonction qui retourne le solde du compte intouch
const getBalance=(token="NOTHING")=>{
    const requestOption={
        "method": "POST",
        "headers": {
            "Accept": "application/json",
            "Authorization": "Bearer "+token
        }
    }
    fetch(apiUrl+'touch/getbalance', requestOption).then(response=>response.json()).then(data=>console.log(data))
    .catch(err=>console.log('err :>> ', err))
}

// fontion qui retourne le statut d'une operation
const getStatus=async(data, token="NOTHING")=>{
    let params=JSON.stringify(data)
    let send=crypt(params)
    let requestOption={
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Bearer "+token
        },
        "body": JSON.stringify({send})
    }
    let status=await fetch(apiUrl+'touch/getstatus', requestOption).then(response=>response.json())
    .then((data)=>{
        // console.log(data)
        return data.response ?  data.response.intouch.status : "PENDING"
        
    })
    return status
}

// fonction qui retire de l'argent du compte du client
const cashOut=async(params, token="NOTHING")=>{
    // const service=params.service
    // const params1={...params, 'service': service}
    let send=crypt(JSON.stringify(params))
    let requestOption={
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Bearer "+token
        },
        "body": JSON.stringify({send})
    }
    let status=await fetch(apiUrl+'touch/cashout', requestOption).then(response=>response.json())
    .then(data=>{
        // console.log(data)
        if(data.response) {
            // console.log("la requete est en attente chez intouch", data.response)
            return data.response
        }
        else {
            // console.log("y a eu une erreur sur le midleware")
            return false
        }
    })
    .catch(err=>{
        // console.log('err :>> ', err)
        return false
    })
    return status

}

// fonction qui envoie de l'argent vers le compte du client
const cashIn=async(params, token="NOTHING")=>{
    // console.log("cashin params", params)
    // const service=params.service
    // const params1={...params, 'service': service}
    let send=crypt(JSON.stringify(params))
    let requestOption={
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Bearer "+token
        },
        "body": JSON.stringify({send})
    }
    let status=await fetch(apiUrl+'touch/cashin', requestOption)
    .then(response=>response.json()).then(data=>data)
    .catch(err=>{
        // console.log('err :>> ', err)
        return false
    })
    return status

}


export { getBalance, getStatus, cashIn, cashOut }