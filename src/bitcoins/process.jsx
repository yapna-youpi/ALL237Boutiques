

// fonction qui verifie la presence des fonds
let myaddress='1DnKzNhp5JQyQRNPHP4coekGcA7KpnPzji'  //'1DnKzNhp5JQyQRNPHP4coekGcA7KpnPzji'
const checkBalance=async (amount)=>fetch('https://api.blockcypher.com/v1/btc/main/addrs/'+myaddress)
    .then(response=>response.json())
    .then(data=>{
        if(data.address) {
            //console.log(data)
            //console.log(data.final_balance)
            if(data.final_balance>amount+4000) { // en production c'est 7500
                return {status: "success"}
            }
            else return {status: 'fail', cause: 'not enough funds'}
        }
        else return {status: 'fail', cause: 'bad address'}
    })
    .catch(err=>({status: 'fail', cause: 'can not get balance'}))



const checkAddress=async(address)=>fetch('https://api.blockcypher.com/v1/btc/main/addrs/'+address, {method: 'GET'})
    .then(response=>response.json())
    .then(data=>{
        //console.log("l'adresse ", data)
        if(data.error) return {status: 'fail', cause: "invalid address"}
        return {status: 'success', address: data.address}
        // {status: 'success', address: data}
    })
    .catch(err=>({status: 'fail', cause: "can not get status of address"}))


export {checkBalance, checkAddress}
