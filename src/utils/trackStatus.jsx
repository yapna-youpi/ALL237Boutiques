import { getStatus } from '../intouch/api'
import { getCinetStatus } from '../cinetpay/api'

export const trackIntouch = async (params, token, callBack, cancel) => {
    // console.log("trackstatus")
    let valid = true
    let status = "PENDING"
    let i = 1
    //getStatus(id)
    let interval = setInterval(async () => {
        let newStatus = await getStatus(params, token)
        // console.log("je suis i", i)
        if (valid) {
            // console.log("on entre sans tocker")
            if (newStatus !== status && newStatus !=='error') {
                valid = false
                // console.log("l'operation est terminee ", newStatus)
                clearInterval(interval)
                if (newStatus === 'SUCCESSFUL') {
                    callBack()
                    return
                }
                else cancel({ status: 'fail', cause: 'payment process fail', cn: 9 }, 1)
            }
            i++
        } else {
            clearInterval(interval)
            // console.log("on a encore efface l'intervalle")
        }
        //console.log("le status  de trackstatus: ", newStatus)
    }, 20 * 1000); // en production il faudra mettre 20 secondes
    setTimeout(() => {
        if (valid) {
            // console.log("arret des operations")
            clearInterval(interval)
            cancel({ status: 'fail', cause: 'payment process fail', cn: 9 }, 1)
        }
    }, 15 * 60 * 1000); // en production c'est 10*60
}

export const trackCinet=async (params, token, callBack, cancel) => {
    console.log("trackstatus")
    let valid = true
    let status = "PENDING"
    let i = 1
    //getStatus(id)
    let interval = setInterval(async () => {
        let newStatus = await getCinetStatus(params, token)
        // console.log("je suis i", i)
        if (valid) {
            console.log("on refait une recherche")
            if (newStatus === 'ACCEPTED') {
                valid = false
                console.log("l'operation est terminee ", newStatus)
                clearInterval(interval)
                if (newStatus === 'ACCEPTED') {
                    callBack()
                    return
                }
                else cancel({ status: 'fail', cause: 'payment process fail', cn: 9 }, 1)
            }
            i++
        } else {
            clearInterval(interval)
            // console.log("on a encore efface l'intervalle")
        }
        //console.log("le status  de trackstatus: ", newStatus)
    }, 20 * 1000); // en production il faudra mettre 20 secondes
    sessionStorage.setItem('CINET_INTERVAL', interval)
    setTimeout(() => {
        if (valid) {
            console.log("arret des operations")
            clearInterval(interval)
            cancel({ status: 'fail', cause: 'payment process fail', cn: 9 }, 1)
            sessionStorage.removeItem('CINET_INTERVAL')
        }
    }, 15 * 60 * 1000); // en production c'est 10*60
}