import { sendToApi } from "../utils/utilFunctions"

export const getCinetStatus = async (params, token) => {
    console.log("get status params ", params)
    let response=await sendToApi('cinet/status', params, token)
    console.log("le status ", response)
    return response.status
}