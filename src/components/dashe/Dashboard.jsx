import React,{useState} from 'react'
import Sidebar from './components/sidebar/Sidebar'
import MainDash from './components/MainDash/MainDash'
import './dashboard.css'

function Dashboard() {
  const [select, setSelect] = useState('')
  console.log(select, 'le selected')

  return (
    <div className='dash'>
      <div className="AppGlass">
        <Sidebar setOption={setSelect} />
        <MainDash option={select} />
      </div>
    </div>
  );
}

export default Dashboard