import React,{useState} from 'react'
import Cards from '../Boxcards/Cards'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import Table from '../table/Table'
import { sendToApi } from '../../../../utils/utilFunctions'
import { UilMultiply } from '@iconscout/react-unicons'

import './maindash.css'

const urlClaim = [

]

function MainDash({option}) {
  const history = useHistory()

  console.log('option',option)
  const [ DashboardList, setDashboardList ] = useState([])
  const [ loader, setLoader ] = useState(false)
  const [operation,setOperation] = useState([])
  //function to get claim function parameter of sidebar
  const CheckTransaction = (UserData)=>{ // recuperer toutes les transactions d'un utilisateur
    sendToApi('user/getalltx', {id: `${UserData.user.userId}`}, `${UserData.user.token}`)
        .then(data => {
            setDashboardList(data.txs);
            console.log(DashboardList)
            setLoader(!loader);
        })
  }



  return (
    <div className="maindash">
      <div className="main_top">
        <h2>{option}</h2>
        <span className='btn_close-dashboard' onClick={()=>history.push('/')}><UilMultiply /></span>
      </div>
      <Cards />
      <div className='main_content'>
        {option === 'analytics' && <Table operation="ALL" route="getalltx" />}
        {option === 'buycrypto' && <Table operation="IPB" route="getalltx" />}
        {option === 'sellcrypto' && <Table operation="IPS" route="getalltx" />}
        {option === 'sendmoney' && <Table operation="IPC" route="getalltx" />}
        {option === 'claim' && <Table operation="ALL" route="getuserclaims" />}
        {/* <ClaimList /> */}
      </div>
    </div>
  );
}

export default MainDash