import React,{ useState, useEffect, useRef } from 'react'
import './dashboard.css'
import { useSelector } from 'react-redux'
import ReactLoading from 'react-loading';
import dateFormat, { masks } from "dateformat";
import { useTranslation } from 'react-i18next';
import ModaList from './ModaList'
import { Helmet } from "react-helmet";

import { sendToApi } from '../../utils/utilFunctions'




export default function Dashboard() {

    const {t} = useTranslation()
    const UserData = useSelector((state)=> state.userReducer)
    const [ DashboardList, setDashboardList ] = useState([])
    const [ loader, setLoader ] = useState(false)
    const [ mode, setMode ] = useState(false)
    const [ modalData, setModalData ] = useState([])

    const CheckTransaction = (UserData)=>{ // recuperer toutes les transactions d'un utilisateur
        sendToApi('user/getalltx', {id: `${UserData.user.userId}`}, `${UserData.user.token}`)
            .then(data => {
                setDashboardList(data.txs);
                // console.log(DashboardList)
                setLoader(!loader);
            })
    }

    useEffect(() => {
        if (UserData) {
            CheckTransaction(UserData)
        }
    }, [])

    const openModal = (data)=>{
        setMode(data)
    }
    const sendData = (byte)=>{
        setModalData(byte)
    }
    // console.log("les data des transactions",DashboardList)
    // console.log("les data du user", UserData)

  return (
    <div className='dashboard' id="dashboard">
        <Helmet>
            <title>Acheter la cryptomonnaie au cameroun</title>
        </Helmet>
        { mode && <ModaList modalData={modalData} userData={UserData.user} onClose={setMode}/> }
        <div className='entetelist'>
            <h1>{t('Dashboard1')}</h1>
              <p>{t('Dashboard2')}<br />
              {t('Dashboard3')} 
              </p>
        </div>
        <section>
            <ul className='list-data'>
                <li className={ DashboardList ? 'dashLigne1' : 'text-none'}>
                    <div className='dashContent1'>
                        <span>{t('Dashboard4')}</span>
                        <span>{t('Dashboard5')}</span>
                        <span>{t('Dashboard6')}</span>
                        <span>{t('Dashboard7')}</span>
                        <span>{t('Dashboard8')}</span>
                        <span>{t('Dashboard9')}</span>
                    </div>
                </li>
                {    !loader ?  (<div className='center'>
                                    <ReactLoading type="spin" color='#CC1616' height={70} width={70} center />
                                 </div>) 
                            :
                                (!DashboardList ? (<h4 className='text-non'>{t('Dashboard10')}</h4>) : 
                                    DashboardList.map((trans,index) => <div key={index}><DashLigne dataList={trans}  openModal={openModal} userData={UserData.user} sendData={sendData} /></div> ).reverse()
                                )
                }
                
            </ul>
        </section>
    </div>
  )
} 

const DashLigne = function ({ dataList , userData, sendData, openModal }) {
    
    const {t} = useTranslation()
    let lienHash = dataList.cryptoCurency == 'BTC' ? (`${process.env.REACT_APP_MEMPOOL_URL}/tx/${dataList.txid}`) : ( `https://www.etherscan.io/tx/${dataList.txid}`)
    const [ loader2, setLoader2 ] = useState(false)
    
    const btnref = useRef()
    
    const now = new Date(dataList.updated_at);

    const setModal = ()=>{
        openModal(true)
        sendData(dataList)
    }

    return (
        <li className={dataList.status == "complete" ? "lignewin" : "dashLigne" } >
                <div className='dashContent'>
                    <span>{dateFormat(now, " dd - mm - yyyy /  hh:MM ","longTime", false)}</span>
                    <span>{dataList.transaction_id}</span>
                    <span>{dataList.amountFiat}</span>
                    <span>{dataList.cryptoCurency}</span>
                    <span>{dataList.status}</span>
                    <span>
                        <a title='See operation progression' href={lienHash} target="_blank">
                            { dataList.txid && dataList.txid.substr(0, 6) + ' ... ' + dataList.txid.substr(54) }
                        </a>
                    </span>
                    <span className='claimbut' onClick={()=>setModal()}>
                        <button className='claimButton'  ref={btnref} >
                                {t('Dashboard11')}            
                        </button>
                    </span>
                </div>
        </li>
    )
}

