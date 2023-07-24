import React from 'react'
import Logo from '../imgs/logo.png'
import './sidebar.css'

import { UilEstate } from '@iconscout/react-unicons'
import { SidebarData } from '../../Data/Data'
import {UilSignOutAlt} from '@iconscout/react-unicons'

const Sidebar = ({setOption}) => {

    const [selected, setSelected] = React.useState(0);

    const doneSelect = (item, index) =>{
        setSelected(index)
        setOption(item.heading.index)
        console.log('item et index',item,index)
        console.log(item.heading[index],'le rechercher')
    }
    

  return (
    <div className="sidebar">
        <div className="logo">
            <img src={Logo} alt="embleme de la societe Ipercash" />
            <span>
                <span className='text-ico'>IPER</span><span className='text-ico2'>Cash</span>
                {/* sh<span>o</span>ps */}
            </span>
        </div>

        {/*  ---menu --- */}
        <div className="menu">
           {
                SidebarData.map((item,index) => {
                    return (
                        <div className={selected === index ? "menuItem active" : "menuItem" } 
                        key={index}
                        onClick={() => doneSelect(item,index)}
                        
                        > 
                            <item.icon />
                            <span>
                                {item.heading}
                            </span>
                        </div>
                    )
                })
           }

           <div className="menuItem">
            <UilSignOutAlt />
           </div>
        </div>
    </div>
    )
}

export default Sidebar