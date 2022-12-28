import { roundDecimal } from '../../utils/utilFunctions';

/* le pourcentage de la commission est de 15% */
const percent=1    //1.15
const inverPercent=1    //0.85

const cryptoChange=(value, rate,forex)=>{
    if(value<0.00033) {
        return {
            xaf: 0,
            eu: 0,
            amount: value
        }
    }
    else {
        return {
            xaf: Math.round(value*rate*forex*percent),
            eu: roundDecimal(value*rate*percent),
            amount: value,
        }
    }

}

const euroChange=(value, rate,forex)=>{
    if(value<25) {
        return {
            xaf: value*forex,
            eu: value,
            amount: 0
        }
    }
    else {
        return {
            xaf: value*forex,
            eu: value,
            amount: roundDecimal(value*inverPercent/rate),
        }
    }
}

const xafChange=(value, rate,forex)=>{
    if(value<16500 || rate===0 ) {
        return {
            xaf: value,
            eu: roundDecimal(value/forex),
            amount: 0
        }
    }
    else {
        return {
            xaf: value,
            eu: roundDecimal(value/forex),
            amount: roundDecimal(value*inverPercent/rate/forex),
        }
    }
}


export { xafChange, euroChange, cryptoChange }

//setState({...state, amount: value, xaf: roundDecimal(value*state.rate*655+1350), eu: roundDecimal(value*state.rate+1350/650)})

//setState({...state, eu: value, amount: roundDecimal(value/state.rate-0.000045), xaf: value*655})

//setState({...state, xaf: value, amount: roundDecimal(value/state.rate/655-0.000045), eu: roundDecimal(value/655)})