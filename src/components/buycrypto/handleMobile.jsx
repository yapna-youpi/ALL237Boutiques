import { roundDecimal } from '../../utils/utilFunctions';

/* le pourcentage de la commission est de 10% */

const FEES=0.065    // commission 6.5% ( avec 2.5% de frais intouch)
const INTOUCHFEES=0.025
const percent=1    //1.15
const inverPercent=1    //0.85

const cryptoChange=(value, rate)=>{
    if(value<0.00007266) {    // here put 0.00033
        return {
            xaf: 0,
            eu: 0,
            amount: value
        }
    }
    else {
        return {
            xaf: Math.round(value*rate*655*(1+FEES)),
            eu: roundDecimal(value*rate*(1+FEES)),
            amount: value,
        }
    }

}

const euroChange=(value, rate)=>{
    if(value<7.63) {    // here put 15.26
        return {
            xaf: value*655,
            eu: value,
            amount: 0
        }
    }
    else {
        return {
            xaf: value*655,
            eu: value,
            amount: roundDecimal(value*(1-FEES)/rate),
        }
    }
}

const xafChange=(value, rate)=>{
    if(value<5000 || rate===0 ) {
        return {
            xaf: value,
            eu: roundDecimal(value/655),
            amount: 0
        }
    }
    else {
        return {
            xaf: value,
            eu: roundDecimal(value/655),
            amount: roundDecimal(value*(1-FEES)/rate/655),
        }
    }
}


export { xafChange, euroChange, cryptoChange }

//setState({...state, amount: value, xaf: roundDecimal(value*state.rate*655+1350), eu: roundDecimal(value*state.rate+1350/650)})

//setState({...state, eu: value, amount: roundDecimal(value/state.rate-0.000045), xaf: value*655})

//setState({...state, xaf: value, amount: roundDecimal(value/state.rate/655-0.000045), eu: roundDecimal(value/655)})