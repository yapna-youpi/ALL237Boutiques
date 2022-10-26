import { sendToApi } from "../../utils/utilFunctions"

// const startCabital = (state) => {
//     // console.log("the User ", User)
//     let params = {
//         "transaction_id": randomId('C'), "phone": state.phone,
//         "name": state.name, userId: User.userId,
//         "email": User.userEmail,
//         "fiat_pay": Math.floor(EUR * state.amount),
//         "initial_amount": state.amount
//     }
//     let message = crypt(JSON.stringify(params))
//     const requestOption = {
//         "method": "POST",
//         "headers": {
//             "Content-Type": "application/json",
//             "Accept": "application/json",
//             "Authorization": "Bearer " + User.token
//         },
//         "body": JSON.stringify({ send: message })
//     }
//     fetch(apiUrl + 'cabital/init', requestOption)
//         .then(response => response.json()).then(data => {
//             console.log("the response ", data.firstLink)
//             // setCabital({...cabital, link: data.firstLink})
//             window.open(data.firstLink, '_blank')
//         })
//         .catch(error => {
//             console.error("there is an error ", error)
//         })
// }


export const getDepositInfo = async (userId, token) => {
    let params = {
        userId: userId,
    }
    return await sendToApi('cabital/getdepositinfo', params, token)
}

export const getDepositStatus=async(userId, token)=>{
    return await sendToApi('cabital/getdepositinfo', {userId}, token)
}