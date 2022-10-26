import { getStatus } from '../intouch/api'
import crypt from './crypt';

// console.log("hello dear")
// const apiUrl='https://ipercash-node-api.herokuapp.com/api/'
const apiUrl=process.env.REACT_APP_API_URL
// const apiUrl='http://127.0.0.1:4001/api/'

const roundDecimal=(nombre)=>{
    var precision = 8;
    var tmp = Math.pow(10, precision);
    return Math.round( nombre*tmp )/tmp;
}
const roundPrecision=(nombre, precision)=>{
    //var precision = 8;
    var tmp = Math.pow(10, precision);
    return Math.round( nombre*tmp )/tmp;
}

const trier=(tab, prop)=>tab.sort(function compare(a, b) {
    if (a[prop] < b[prop])
       return -1;
    if (a[prop] > b[prop] )
       return 1;
    return 0;
});

const checkServiceId=num=>{
    //console.log("le numero ",num)
    if(num && num.length===9){
        //console.log("bon nombre")
        if(num[0]==='6') {
            //console.log("bon debut")
            if(num[1]==='7') return 'mtn'
            else if(num[1]==='8') return 'mtn'
            else if(num[1]==='9') return 'orange'
            else if(num[1]==='5') {
                //console.log("on entre dans les details")
                if(num[2]<=4) return 'mtn'
                else return 'orange'
            }
        }
    }
    return null
}

const randomId=(l='A')=>{
    let id1=Math.floor((1+Math.random())*0x10).toString(20).substring(1)
    //let id2=Math.floor((1+Math.random())*0x100000000000000).toString(20).substring(1)
    let ts=(+new Date).toString()
    let base=ts.substring(2, 10)
    return "IP"+l+id1+base
    //return id1+Date.now()
}
const randomChain=()=>{
    let id1=Math.floor((1+Math.random())*0x100000000000000).toString(20).substring(1)
    let id2=Math.floor((1+Math.random())*0x100000000000000).toString(20).substring(1)
    return id1+id2
}

const trackStatus=async (params, token, callBack, cancel)=>{
    // console.log("trackstatus")
    let valid=true
    let status="PENDING"
    let i=1
    //getStatus(id)
    let interval=setInterval(async() => {
        let newStatus=await getStatus(params, token)
        // console.log("je suis i", i)
        if(valid) {
            // console.log("on entre sans tocker")
            if(newStatus!==status) {
                valid=false
                // console.log("l'operation est terminee ", newStatus)
                clearInterval(interval)
                if(newStatus==='SUCCESSFUL') {
                    callBack()
                    return
                }
                else cancel({status: 'fail', cause: 'payment process fail'}, 1)
            }
            i++
        } else {
            clearInterval(interval)
        }
        //console.log("le status  de trackstatus: ", newStatus)
    }, 20*1000); // en production il faudra mettre 20 secondes
    setTimeout(() => {
        if(valid) {
            // console.log("arret des operations")
            clearInterval(interval)
            cancel({status: 'fail', cause: 'payment process fail'}, 1)
        }
    }, 10*60*1000); // en production c'est 10*60
}

const setRequestOption=(body, token)=>({
    "method": "POST",
    "headers": {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization":  "Bearer "+token
    },
    "body": JSON.stringify(body)
})

const sendToApi=async(route, body, token="NOTHING")=>{
    let message=crypt(JSON.stringify(body))
    let result=fetch(apiUrl+route, setRequestOption({send: message}, token))
    .then(response=>response.json()).then(data=>data)
    .catch(err=>'error')
    return result
}

const getCryptoRate=async()=>fetch('https://api.coindesk.com/v1/bpi/currentprice/EUR.json')
    .then(response=>response.json()).then(data=>data.bpi)
    .catch(err=>0)
    // .catch(err=>40000)

const activeButtonSend=(state)=>{
    if(state.amount >= 25 && state.name &&  state.phone &&checkServiceId(state.phone) && (state.phone===state.cPhone)) return false
    else return true
}

const checkPhone=(error, num)=>{
    if(num==="") return error
    //if(!error) return false
    else return !checkServiceId(num)
}

const cutChain=(chain, i, f)=>{
    return chain.substr(0, i)+'...'+chain.substr(f)
}

const checkEmail=(email)=>{
    // var emailReg = new RegExp(".com$")
    // return emailReg.test(email);
    return email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
}

const checkWalletAddress=(address)=>{
    return address.match(/^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$/)
}

const checkPassword=(password)=>{
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$@%*+-_]{8,}$/
}

const regWallet = /^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$/

const regPhone = /^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$/

const regPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$@%*+-_]{8,}$/



export {roundDecimal, roundPrecision, randomId, randomChain,
        trackStatus, checkServiceId, trier, setRequestOption, sendToApi, getCryptoRate,
        activeButtonSend, checkPhone, cutChain, apiUrl, checkEmail, checkWalletAddress,
        checkPassword,regWallet,regPhone,regPassword
    }

