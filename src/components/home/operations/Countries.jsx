import React, { useState } from 'react'
import { connect } from 'react-redux'

import './countries.css'
import camer from './images/camer.png'
import sene from './images/sene.png'
import ivc from './images/ivc.png'
// import mali from './images/mali.png'
// import burki from './images/burki.png'
// import guine from './images/guine.png'
import { changeCountry } from '../../../store/actions';

function Countries({country, dispatch}) {
    const [state, setState]=useState({img: camer, name: "Cameroon"})
    let ref=React.createRef()
    const selectCountry=(data, code)=>{
        setState(data)
        showList()
        dispatch(changeCountry(code))
    }

    const showList=()=>ref.current.classList.toggle('show')

    // console.log("les props ", country)
    return (
        <div className="choose-country">
            <div className="dropdown" onClick={showList} > <img src={state.img} className="ims"  alt=""/><span /> </div>
            <div ref={ref} className="countries-list">
                <div className="country" onClick={()=>selectCountry({img: camer}, 'CM')} >
                    <img src={camer} alt=""/>
                </div>
                <div className="country" onClick={()=>selectCountry({img: sene}, 'SN')} >
                    <img src={sene} alt=""/>
                </div>
                <div className="country" onClick={()=>selectCountry({img: ivc}, 'CI')} >
                    <img src={ivc} alt=""/>
                </div>
                {/* <div className="country" onClick={()=>selectCountry({img: mali}, 'ML')} >
                    <img src={mali} alt=""/>
                </div>
                <div className="country" onClick={()=>selectCountry({img: burki}, 'BF')} >
                    <img src={burki} alt=""/>
                </div>
                <div className="country" onClick={()=>selectCountry({img: guine}, 'GN')} >
                    <img src={guine} alt=""/>
                </div> */}
            </div>
        </div>
    )
}

const mapStateToProps=state=>({country: state.countryReducer.country})

export default connect(mapStateToProps)(Countries)
