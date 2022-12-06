export const getCurrenciesRate = async () =>
    await fetch(process.env.REACT_APP_API_URL + 'currencies')
        .then(response => response.json())
        .then(data => {
            // console.log("the currencies ", data)
            return data
        })
        .catch(error => {
            console.log("can't get currencies rates ")
            return false
        })