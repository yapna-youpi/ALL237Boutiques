import { roundDecimal } from '../../utils/utilFunctions';

/* le pourcentage de la commission est de 10% */

let FEES = 0.065    // commission 6.5% ( avec 2.5% de frais intouch)
const INTOUCHFEES = 0.025
const percent = 1    //1.15
const inverPercent = 1    //0.85

const cryptoChange = (value, rate, promotion, royalties = 0) => {
    let usedFees = promotion ? 0 : FEES + (royalties / 100)
    if (value < 0.00007266) {    // here put 0.00033
        return {
            xaf: 0,
            eu: 0,
            amount: value
        }
    }
    else {
        return {
            xaf: Math.round(value * rate * 655 * (1 + usedFees)),
            eu: roundDecimal(value * rate * (1 + usedFees)),
            amount: value,
        }
    }

}

const euroChange = (value, rate, promotion, royalties = 0) => {
    let usedFees = promotion ? 0 : FEES + (royalties / 100)
    if (value < 7.63) {    // here put 15.26
        return {
            xaf: Math.round(value * 655),
            eu: value,
            amount: 0
        }
    }
    else {
        return {
            xaf: Math.round(value * 655),
            eu: value,
            amount: roundDecimal(value * (1 - usedFees) / rate),
        }
    }
}

const xafChange = (value, rate, promotion, royalties = 0) => {
    let usedFees = promotion ? 0 : FEES + (royalties / 100)
    if (value < 5000 || rate === 0) {
        return {
            xaf: value,
            eu: roundDecimal(value / 655),
            amount: 0
        }
    }
    else {
        console.log("fees used ", promotion, usedFees)
        return {
            xaf: value,
            eu: roundDecimal(value / 655),
            amount: roundDecimal(value * (1 - usedFees) / rate / 655),
        }
    }
}


export { xafChange, euroChange, cryptoChange }

//setState({...state, amount: value, xaf: roundDecimal(value*state.rate*655+1350), eu: roundDecimal(value*state.rate+1350/650)})

//setState({...state, eu: value, amount: roundDecimal(value/state.rate-0.000045), xaf: value*655})

//setState({...state, xaf: value, amount: roundDecimal(value/state.rate/655-0.000045), eu: roundDecimal(value/655)})