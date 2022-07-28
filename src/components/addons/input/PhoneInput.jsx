import React from 'react'
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'

import './phone-input.css'

function InputPhone({label, name, val, id, error, help, change, handBlur, country, all, cm }) {
    return (
        <div className="input-phone">
            <label htmlFor=""> {label} </label>
            <PhoneInput name={name} id={id}
                // countries={['CM', 'SN', 'BF', 'CI', 'ML', 'GN']}
                value={val}
                countries={!all ? (cm ? ['CM'] : ['CM', 'SN', 'CI']): null}
                // countries={null}
                defaultCountry={country || 'CM'} international countryCallingCodeEditable={false}
                onChange={(value)=>change({name: name, value: value})}
                onBlur={ handBlur ? (e)=>handBlur(e.target) : ()=>{}}
            />
            <span>{error&&help}</span>
        </div>
    )
}

export default InputPhone
