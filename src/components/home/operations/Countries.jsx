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

    return (
        <div className="choose-country">
            <div className="dropdown" onClick={showList} > <img src={state.img} className="ims"  alt="default land"/><span /> </div>
            <div ref={ref} className="countries-list">
                <div className="country" onClick={()=>selectCountry({img: camer}, 'CM')} >
                    <img src={camer} alt="cmeroun"/>
                </div>
                <div className="country" onClick={()=>selectCountry({img: sene}, 'SN')} >
                    <img src={sene} alt="senegal"/>
                </div>
                <div className="country" onClick={()=>selectCountry({img: ivc}, 'CI')} >
                    <img src={ivc} alt="cote d'ivoire"/>
                </div>
                {/* <div className="country" onClick={()=>selectCountry({img: mali}, 'ML')} >
                    <img src={mali} alt="mali"/>
                </div>
                <div className="country" onClick={()=>selectCountry({img: burki}, 'BF')} >
                    <img src={burki} alt="burkina"/>
                </div>
                <div className="country" onClick={()=>selectCountry({img: guine}, 'GN')} >
                    <img src={guine} alt="guinée"/>
                </div> */}
            </div>
        </div>
    )
}

const mapStateToProps=state=>({country: state.countryReducer.country})

export default connect(mapStateToProps)(Countries)
