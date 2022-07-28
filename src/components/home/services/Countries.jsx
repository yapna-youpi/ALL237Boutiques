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
            <div className="dropdown" onClick={showList} > <img src={state.img} alt="default land2"/> {state.name} <span /> </div>
            <div ref={ref} className="countries-list">
                <div className="country" onClick={()=>selectCountry({img: camer, name: "Cameroon"}, 'CM')} >
                    <img src={camer} alt="cameroun"/>
                    <h4>Cameroon</h4>
                </div>
                <div className="country" onClick={()=>selectCountry({img: sene, name: "Senegal"}, 'SN')} >
                    <img src={sene} alt="senegal"/>
                    <h4>Senegal</h4>
                </div>
                <div className="country" onClick={()=>selectCountry({img: ivc, name: "Ivory-Coast"}, 'CI')} >
                    <img src={ivc} alt="cote d'ivoire"/>
                    <h4>Ivory-Coast</h4>
                </div>
                {/* <div className="country" onClick={()=>selectCountry({img: mali, name: "Mali"}, 'ML')} >
                    <img src={mali} alt="mali"/>
                    <h4>Mali</h4>
                </div>
                <div className="country" onClick={()=>selectCountry({img: burki, name: "Burkina"}, 'BF')} >
                    <img src={burki} alt="burkina"/>
                    <h4>Burkina</h4>
                </div>
                <div className="country" onClick={()=>selectCountry({img: guine, name: "Guinea"}, 'GN')} >
                    <img src={guine} alt="guinée"/>
                    <h4>Guinea</h4>
                </div> */}
            </div>
        </div>
    )
}

const mapStateToProps=state=>({country: state.countryReducer.country})

export default connect(mapStateToProps)(Countries)
