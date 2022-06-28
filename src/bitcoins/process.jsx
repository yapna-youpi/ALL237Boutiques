
// fonction qui verifie la presence des fonds
let myaddress = 'bc1qmexu85sndwyc4dzak8z2sj43y2ycdwtcsatw05kwelyr8uetc8equjl5c4'  // here: '1DnKzNhp5JQyQRNPHP4coekGcA7KpnPzji'
const checkBalance = async (amount) => fetch('https://api.blockcypher.com/v1/btc/main/addrs/' + myaddress)
    .then(response => response.json())
    .then(data => {
        if (data.address) {
            //console.log(data)
            //console.log(data.final_balance)
            if (data.final_balance > amount + 4000) { // en production c'est 7500
                return { status: "success" }
            }
            else return { status: 'fail', cause: 'not enough funds', cn: 1 }
        }
        else return { status: 'fail', cause: 'bad address', cn: 2 }
    })
    .catch(err => ({ status: 'fail', cause: 'can not get balance', cn: 3 }))



const checkAddress = async (address) => fetch('https://api.blockcypher.com/v1/btc/main/addrs/' + address, { method: 'GET' })
    .then(response => response.json())
    .then(data => {
        //console.log("l'adresse ", data)
        if (data.error) return { status: 'fail', cause: "invalid address", cn: 4 }
        return { status: 'success', address: data.address }
        // {status: 'success', address: data}
    })
    .catch(err => ({ status: 'fail', cause: "can not get status of address", cn: 5 }))


export { checkBalance, checkAddress }
