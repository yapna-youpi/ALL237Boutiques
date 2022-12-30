import { roundDecimal } from '../../utils/utilFunctions';

/* le pourcentage de la commission est de 5% */

const FEES = 0.0395
const INTOUCHFEES = 250 // les frais intouch sont de 250 XAF
const min=process.env.REACT_APP_SELL_MIN

const cryptoChange = (value, rate, promotion, royalties = 0, forex) => {
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
            xaf: Math.round(value * rate * forex * (1 - usedFees) - usedIntouchFees),
            eu: roundDecimal(value * rate * (1 - usedFees) - usedIntouchFees / forex),
            amount: value,
        }
    }

}

const euroChange = (value, rate, promotion, royalties = 0, unit) => {
    console.log("the value ", value, unit)
    let usedFees = promotion ? 0 : FEES + (royalties / 100)
    let usedIntouchFees = promotion ? 0 : INTOUCHFEES
    if (value < 10) {
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
            amount: roundDecimal((value * (1 + usedFees) + usedIntouchFees / unit) / rate),
        }
    }
}

const xafChange = (value, rate, promotion, royalties = 0, forex) => {
    let usedFees = promotion ? 0 : FEES + (royalties / 100)
    let usedIntouchFees = promotion ? 0 : INTOUCHFEES
    console.log("the usedIntouchFees ", usedFees, usedIntouchFees)
    if (value < parseInt(min) || rate === 0) {
        return {
            xaf: value,
            eu: roundDecimal(value / forex),
            amount: 0
        }
    }
    else {
        return {
            xaf: value,
            eu: roundDecimal(value / forex),
            amount: roundDecimal((value * (1 + usedFees) + usedIntouchFees) / rate / forex),
        }
    }
}


export { xafChange, euroChange, cryptoChange }

//setState({...state, amount: value, xaf: roundDecimal(value*state.rate*655+1350), eu: roundDecimal(value*state.rate+1350/650)})

//setState({...state, eu: value, amount: roundDecimal(value/state.rate-0.000045), xaf: value*655})

//setState({...state, xaf: value, amount: roundDecimal(value/state.rate/655-0.000045), eu: roundDecimal(value/655)})