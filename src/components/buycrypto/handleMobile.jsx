import { roundDecimal, roundPrecision } from '../../utils/utilFunctions';


const FEES = roundPrecision(process.env.REACT_APP_BUY_FEES, 4) + roundPrecision(process.env.REACT_APP_INTOUCH_CO_FEES, 4)  //  frais de l'operation
const min = process.env.REACT_APP_BUY_MIN;
const max = process.env.REACT_APP_BUY_MIN;

const cryptoChange = (value, rate, promotion, royalties = 0,forex,eurRate) => {
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
            xaf: Math.round(value * eurRate * forex * (1 + usedFees)),
            eu: roundDecimal(value * rate * (1 + usedFees)),
            amount: value,
        }
    }

}

const euroChange = (value, rate, promotion, royalties = 0,unit) => {
    let usedFees = promotion ? 0 : FEES + (royalties / 100)
    if (value < 7.63) {    // here put 15.26
        return {
            xaf: Math.round(value * unit),
            eu: value,
            amount: 0
        }
    }
    else {
        return {
            xaf: Math.round(value * unit),
            eu: value,
            amount: roundDecimal(value * (1 - usedFees) / rate),
        }
    }
}

const xafChange = (value, rate, promotion, royalties = 0,unit) => {
    let usedFees = promotion ? 0 : FEES + (royalties / 100)
    if (value < 5000 || rate === 0) {
        return {
            xaf: value,
            eu: roundDecimal(value / unit),
            amount: 0
        }
    }
    else {
        // console.log("fees used ", promotion, usedFees)
        return {
            xaf: value,
            eu: roundDecimal(value / unit),
            amount: roundDecimal(value * (1 - usedFees) / rate / unit),
        }
    }
}


export { xafChange, euroChange, cryptoChange }