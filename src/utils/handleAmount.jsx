import { roundDecimal } from './utilFunctions';

/* le pourcentage de la commission est de 15% */

const cryptoChange=(value, rate)=>{
    if(value<0.00033) {
        return {
            xaf: 0,
            eu: 0,
            amount: value
        }
    }
    else {
        console.log("le rate ", rate)
        return {
            xaf: Math.round(value*rate*655*1.15),
            eu: roundDecimal(value*rate*1.15),
            amount: value,
        }
    }

}

const euroChange=(value, rate)=>{
    if(value<15.26) {
        return {
            xaf: value*655,
            eu: value,
            amount: 0
        }
    }
    else {
        // console.log("le resultat", rate)
        return {
            xaf: value*655,
            eu: value,
            amount: roundDecimal(value*0.85/rate),
        }
    }
}

const xafChange=(value, rate)=>{
    if(value<10000) {
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
            amount: roundDecimal(value*0.85/rate/655),
        }
    }
}


export { xafChange, euroChange, cryptoChange }

//setState({...state, amount: value, xaf: roundDecimal(value*state.rate*655+1350), eu: roundDecimal(value*state.rate+1350/650)})

//setState({...state, eu: value, amount: roundDecimal(value/state.rate-0.000045), xaf: value*655})

//setState({...state, xaf: value, amount: roundDecimal(value/state.rate/655-0.000045), eu: roundDecimal(value/655)})