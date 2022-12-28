
// fonction qui verifie la presence des fonds
let myAddress = process.env.REACT_APP_DIST_WALLET
const checkBalance = async (amount) => fetch(process.env.REACT_APP_BLOCKCYPHER_ADDRESS + myAddress)
    .then(response => response.json())
    .then(data => {
        if (data.address) {
            //console.log(data)
            //console.log(data.final_balance)
            if (data.final_balance > amount + 4000) { // en production c'est 7500
                return { status: "success" }
            }
            else return { status: 'fail', cause: 'Please retry later', cn: 1 }
        }
        else return { status: 'fail', cause: 'bad address', cn: 2 }
    })
    .catch(err => ({ status: 'fail', cause: 'Please retry later', cn: 3 }))



const checkAddress = async (address) => fetch(process.env.REACT_APP_BLOCKCYPHER_ADDRESS + address, { method: 'GET' })
    .then(response => response.json())
    .then(data => {
        //console.log("l'adresse ", data)
        if (data.error) return { status: 'fail', cause: "invalid address", cn: 4 }
        return { status: 'success', address: data.address }
        // {status: 'success', address: data}
    })
    .catch(err => ({ status: 'fail', cause: "can not get status of address", cn: 5 }))


export { checkBalance, checkAddress }
