import React, { useState } from 'react'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import { useTranslation } from 'react-i18next'

import { FaUser, FaSignOutAlt} from 'react-icons/fa'
import { HiPencilAlt } from 'react-icons/hi'
import { Divider, MenuList, Paper } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

import './user.css'

function User({user, nav, logout}) {
    const { t } = useTranslation();

    const [anchor, setAnchor]=useState(null)
    let history=useHistory()
    const open=Boolean(anchor)
    const show=(e)=>{
        setAnchor(e.currentTarget)
    }
    const close=()=>setAnchor(null)
    const click=(route)=>{
        close()
        nav(route)
    }
    const logOut=()=>{
        close()
        logout()
        setTimeout(()=>window.location.href="/login", 500)
        // history.push('/')
        
    }
    console.log(user)
    return (
        <>
        <li className={user.userId ? "nav-link user-button connected" : "nav-link user-button" } onClick={(e)=>show(e)} >
            <FaUser color="#fff" />
            
        </li>
        <div className="user-menu">
        <Menu id="basic-menu" anchorEl={anchor} open={open}
                transformOrigin={{
                    vertical: -50,
                    horizontal: 10,
                }}
                onClose={close}
            >
                <MenuItem onClick={user.userName ? null : ()=>click('/login')}>
                    <span className="menu-text"><FaUser fontSize="large" /> &ensp;  {user.userName ? user.userName : t('user1') } </span>
                </MenuItem>
                <MenuItem onClick={()=>click('/signup')}>
                <span className="menu-text"><HiPencilAlt fontSize="large" /> &ensp;{t('user2')} </span>
                </MenuItem>
                <Divider />
                <MenuItem onClick={logOut}>
                <span className="menu-text"><FaSignOutAlt fontSize="large" /> &ensp;{t('user3')}  </span>
                </MenuItem>
        </Menu>
        </div>
        </>

    )
}

export default User
