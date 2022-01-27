import { roundDecimal } from '../../utils/utilFunctions';

/* le pourcentage de la commission est de 5% */

const FEES=0.05
const INTOUCHFEES=250

const cryptoChange=(value, rate)=>{
    if(value<0.00009) {
        return {
            xaf: 0,
            eu: 0,
            amount: value
        }
    }
    else {
        console.log("le rate ", rate)
        return {
            xaf: Math.round(value*rate*655*(1-FEES)-INTOUCHFEES),
            eu: roundDecimal(value*rate*(1-FEES)-INTOUCHFEES/655),
            amount: value,
        }
    }

}

const euroChange=(value, rate)=>{
    if(value<4) {
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
            amount: roundDecimal((value*(1+FEES)+INTOUCHFEES/655)/rate),
        }
    }
}

const xafChange=(value, rate)=>{
    if(value<3000 || rate===0 ) {
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
            amount: roundDecimal((value*(1+FEES)+INTOUCHFEES)/rate/655),
        }
    }
}


export { xafChange, euroChange, cryptoChange }

//setState({...state, amount: value, xaf: roundDecimal(value*state.rate*655+1350), eu: roundDecimal(value*state.rate+1350/650)})

//setState({...state, eu: value, amount: roundDecimal(value/state.rate-0.000045), xaf: value*655})

//setState({...state, xaf: value, amount: roundDecimal(value/state.rate/655-0.000045), eu: roundDecimal(value/655)})