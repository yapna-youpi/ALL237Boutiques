import React,{ useState,  useEffect} from 'react'
import { useTranslation } from 'react-i18next'
import { MdKeyboardBackspace } from 'react-icons/md'

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import "./summary.css"

function Summary({ setSender , showing , state , setSummer, EUR }) {

    const { t } = useTranslation()

    //the state
    const [visible, setVisible] = useState('');
    //the function for checking if checked
    const [check, setCheck] = useState({one:false,two:false});
    //function of change summary
    const [summary, setSummary] = useState(false)
    //error
    const [ error, setError ] = useState('');
    
    const handleChange = (e)=>{
        setVisible("activer");
        setError(false)
        
        if (e.target.value == 'sepa'){
            setCheck({...check, one:true, two:false});
            document.getElementById('i-check1').style.background = "#f8d7da";
            document.getElementById('i-check2').style.background = "";
            setSender({...setSender, cab:true})
        } else {
         document.getElementById('i-check2').style.background = "#f8d7da";
         document.getElementById('i-check1').style.background = "";
         setCheck({...check, one:false, two:true});
         setSender({ mer: true , cab: false })
        }    

        // e.target.parentElement.parentElement.parentElement.parentElement.style.background = "#f8d7da";
    }

    const choisir = ()=>{
        if(visible !== "activer"){
            return setError(true)
        }else{
            setSummary(!summary);
            setSummer(true)
        }
    }

    const retour = ()=>{
        setVisible("desactiver");
        setSummary(!summary);
        setSummer(false);
        setSender({ mer: false , cab: false });

        setTimeout(() => {
            if (check.one == true) {
                document.getElementById('i-check1').style.background = "#f8d7da";
                document.getElementById('i-check2').style.background = "";

            } else if(check.two == true){
                document.getElementById('i-check2').style.background = "#f8d7da";
                document.getElementById('i-check1').style.background = "";
            }
        }, 100);
    }
  return (
    <div className='summary'>
        { !summary ? 
                    (<div className="summary_first warning" id="sommaryFirst">
                        <FormControl fullWidth component="fieldset">
                            <RadioGroup  >
                            <h2>Choisir le Mode de Payement</h2>
                            <div>
                                <div className="form-group1" >
                                    <label>payment 1</label>
                                    <div className="form-content" name="payment1" >
                                        <div className='text'>Virement Sepa</div>
                                        <div className='i-check' id="i-check1">
                                            <FormControlLabel  onChange={handleChange}  value="sepa" control={<Radio color="primary" />} label="Sepa" />
                                        </div>
                                    </div>
                                    { error ? <div className='sumerror'>choice is required!</div> : ''}
                                </div>
                                <div className="form-group1" >
                                    <label>payment 2</label>
                                    <div className="form-content" name="payment2" >
                                        <div className='text'>Carte de Credit</div>
                                        <div className='i-check' id="i-check2">
                                            <FormControlLabel   onChange={handleChange} value="carte" control={<Radio color="secondary" />} label="Carte" />  
                                        </div>
                                    </div>
                                    { error ? <div className='sumerror'>choice is required!</div> : ''}
                                </div>
                        
                                <div className="form-btn" >
                                    <button onClick={()=>choisir()} disabled={false}  > Choose payment </button>
                                </div>
                            </div>
                            </RadioGroup>
                        </FormControl>
                    </div>) 
                :

                    (<> 
                        <div className="summary_second gone" id="summarySecond">
                            <div className='retun' onClick={retour}><MdKeyboardBackspace size={25}/></div>
                            <h2>{t('sendMoneySous2')}</h2>
                            <div className="row">
                                <span>{t('sendMoneySous3')}</span>
                                <span> {Intl.NumberFormat('de-DE').format(Math.ceil(state.amount))} EUR </span>
                            </div>
                            <div className="row">
                                <span>{t('sendMoneySous4')}</span>
                                <span> {Intl.NumberFormat('de-DE').format(Math.ceil(state.fees))}  EUR </span>
                            </div>
                            <div className="row">
                                <span>{t('sendMoneySous5')} </span>
                                <span> {Intl.NumberFormat('de-DE').format(Math.ceil(parseFloat(state.amount) + parseFloat(state.fees)) || 0)} EUR </span>
                            </div>
                            <div className="row">
                                <span>{t('sendMoneySous6')}</span>
                                <span>  {Intl.NumberFormat('de-DE').format(Math.floor(EUR * state.amount))} XAF </span>
                            </div>
                        </div>

                        <div className='gone'>
                            <h2>{t('sendText5')}</h2>
                            {showing ? (
                                <div className='warning eclips '>
                                    <div className="row">
                                        <span>{t('sendText1')}EUR </span>
                                        <span> {"3.96%  "}EUR </span>
                                    </div>
                                    <div className="row">
                                        <span>{t('sendText2')}EUR </span>
                                        <span> {"2 "}EUR </span>
                                    </div>
                                    <div className="row">
                                        <span>{t('sendText3')}EUR </span>
                                        <span> {"3 "}EUR </span>
                                    </div>
                                    <div className="row">
                                        <span>{t('sendText4')} </span>
                                        <span> {"4 "}EUR </span>
                                    </div>
                                </div>
                            )
                                :
                                (
                                    <div className="warning delay">
                                        <h2>{t('sendMoneySous7')}</h2>
                                        <p>
                                            {t('sendMoneySous8')}
                                        </p>
                                    </div>
                                )
                            }
                        </div>
                    </>)
            
            }


       
    </div>
  )
}

export default Summary