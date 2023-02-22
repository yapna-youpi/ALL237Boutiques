import { use } from 'i18next';
import { roundDecimal, roundPrecision } from '../../utils/utilFunctions';

/* le pourcentage de la commission est de 5% */

const FEES = process.env.REACT_APP_SELL_FEES
const INTOUCHFEES = process.env.REACT_APP_INTOUCH_CI_FEES // les frais intouch sont de 250 XAF
const min=process.env.REACT_APP_SELL_MIN

const cryptoChange = (value, rate, promotion, royalties = 0, unit, crypto) => {
    console.log("rate and rate dans cryptoChange ", rate, rate)
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
        if ( crypto === 'USDT') {
            return {
                xaf: Math.trunc(value * rate * unit * (1 - usedFees) - usedIntouchFees - value * rate * unit * 0.0377),
                eu: roundDecimal(value * rate * (1 - usedFees) - usedIntouchFees / unit - value * rate * 0.04) ,
                amount: value,
            }
        } else return {
            xaf: Math.round(value * rate * unit * (1 - usedFees) - usedIntouchFees) ,
            eu: roundDecimal(value * rate * (1 - usedFees) - usedIntouchFees/unit),
            amount: value,
        }
    }

}

const euroChange = (value, rate, promotion, royalties = 0, unit,crypto) => {
    console.log("the value dans eurohange ", value, unit)
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
        if ( crypto === 'USDT') {
            return {
                xaf: Math.round(value * unit),
                eu: value,
                amount: Math.ceil((value/rate) + usedFees * value/rate + INTOUCHFEES/rate/unit )  ,
            }
        } else return {
            xaf: Math.round(value * unit),
            eu: value,
            amount: roundDecimal((value/rate) + usedFees * value/rate + INTOUCHFEES/rate/unit),
        }
    }
}

const xafChange = (value, rate, promotion, royalties = 0, unit,crypto) => {
    let usedFees = promotion ? 0 : FEES + (royalties / 100)
    let usedIntouchFees = promotion ? 0 : INTOUCHFEES
    console.log("the usedIntouchFees dansxafChange ", usedFees, usedIntouchFees)
    if (value < parseInt(min) || rate === 0) {
        return {
            xaf: value,
            eu: roundDecimal(value / unit),
            amount: 0
        }
    }
    else {
        if ( crypto === 'USDT') {
            return {
                xaf: value,
                eu: roundDecimal(value / unit),
                amount: Math.ceil(roundDecimal(( value / rate) + value * usedFees/rate  + INTOUCHFEES/rate))
            }
        } else return {
            xaf: value,
            eu: roundDecimal(value / unit),
            amount:  roundDecimal(( value / rate) + value * usedFees/rate  + INTOUCHFEES/rate),
        }
    }
}


export { xafChange, euroChange, cryptoChange }

//setState({...state, amount: value, xaf: roundDecimal(value*state.rate*655+1350), eu: roundDecimal(value*state.rate+1350/650)})

//setState({...state, eu: value, amount: roundDecimal(value/state.rate-0.000045), xaf: value*655})

//setState({...state, xaf: value, amount: roundDecimal(value/state.rate/655-0.000045), eu: roundDecimal(value/655)})