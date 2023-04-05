import { roundDecimal, roundPrecision } from '../../utils/utilFunctions';


const FEES = roundPrecision(process.env.REACT_APP_BUY_FEES, 4) + roundPrecision(process.env.REACT_APP_INTOUCH_CO_FEES, 4)  //  frais de l'operation
const min = {
    BTC: parseInt(process.env.REACT_APP_BUY_BTC_MIN),
    ETH: parseInt(process.env.REACT_APP_BUY_ETH_MIN),
    USDT: parseInt(process.env.REACT_APP_BUY_USDT_MIN)
}
console.log('first fees',process.env.REACT_APP_BUY_FEES, "second fees",process.env.REACT_APP_INTOUCH_CO_FEES,"les frais global",FEES)
const cryptoChange = (value, rate, promotion, royalties = 0, unit, crypto) => {
    console.log("rate and rate ", rate, rate)
    let usedFees = promotion ? 0 : FEES + (royalties / 100)
    if (value < 0.00007266) {    // here put 0.00033
        return {
            xaf: 0,
            eu: 0,
            amount: value
        }
    }
    else { 
        if ( crypto === 'USDT') {
            return {
                xaf: Math.round( 1.0139 * value * rate * unit / (1 - usedFees)) ,
                eu: roundDecimal(1.0139 * value * rate / (1 - usedFees)),
                amount: value,
            }
        } else return {
                xaf: Math.round(value * rate * unit / (1 - usedFees)),
                eu: roundDecimal(value * rate / (1 - usedFees)),
                amount: value,
            }
    }
}
// console.log('les frais', FEES)
// console.log('les frais ', FEES)
const euroChange = (value, rate, promotion, royalties = 0, unit, crypto) => {
    let usedFees = promotion ? 0 : FEES + (royalties / 100)
    if (value < 7.63) {    // here put 15.26
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
                    amount: Math.trunc(roundDecimal(value * ( 1 - usedFees ) / rate))
                }
            } else return {
                xaf: Math.round(value * unit),
                eu: value,
                amount: roundDecimal(value * ( 1 - usedFees ) / rate) 
            }
        }
}

const xafChange = (value, rate, promotion, royalties = 0, unit, crypto) => {
    let usedFees = promotion ? 0 : FEES + (royalties / 100)
    if (value < parseInt(min[crypto]) || rate === 0) {
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
                    amount: Math.trunc(roundDecimal(value * (1 - usedFees) / rate / unit)),
                }
            } else return {
                    xaf: value,
                    eu: roundDecimal(value / unit),
                    amount: roundDecimal(value * (1 - usedFees) / rate / unit),
                }
        }
}


export { xafChange, euroChange, cryptoChange }