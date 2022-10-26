import { roundDecimal } from '../../utils/utilFunctions';

/* le pourcentage de la commission est de 5% */

const FEES = 0.0395
const INTOUCHFEES = 250 // les frais intouch sont de 250 XAF

const cryptoChange = (value, rate, promotion, royalties = 0) => {
    let usedFees = promotion ? 0 : FEES + (royalties / 100)
    let usedIntouchFees = promotion ? 0 : INTOUCHFEES
    if (value < 0.000296) {
        return {
            xaf: 0,
            eu: 0,
            amount: value
        }
    }
    else {
        return {
            xaf: Math.round(value * rate * 655 * (1 - usedFees) - usedIntouchFees),
            eu: roundDecimal(value * rate * (1 - usedFees) - usedIntouchFees / 655),
            amount: value,
        }
    }

}

const euroChange = (value, rate, promotion, royalties = 0) => {
    let usedFees = promotion ? 0 : FEES + (royalties / 100)
    let usedIntouchFees = promotion ? 0 : INTOUCHFEES
    if (value < 10) {
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
            amount: roundDecimal((value * (1 + usedFees) + usedIntouchFees / 655) / rate),
        }
    }
}

const xafChange = (value, rate, promotion, royalties = 0) => {
    let usedFees = promotion ? 0 : FEES + (royalties / 100)
    let usedIntouchFees = promotion ? 0 : INTOUCHFEES
    if (value < 6550 || rate === 0) {
        return {
            xaf: value,
            eu: roundDecimal(value / 655),
            amount: 0
        }
    }
    else {
        return {
            xaf: value,
            eu: roundDecimal(value / 655),
            amount: roundDecimal((value * (1 + usedFees) + usedIntouchFees) / rate / 655),
        }
    }
}


export { xafChange, euroChange, cryptoChange }

//setState({...state, amount: value, xaf: roundDecimal(value*state.rate*655+1350), eu: roundDecimal(value*state.rate+1350/650)})

//setState({...state, eu: value, amount: roundDecimal(value/state.rate-0.000045), xaf: value*655})

//setState({...state, xaf: value, amount: roundDecimal(value/state.rate/655-0.000045), eu: roundDecimal(value/655)})