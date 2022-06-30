import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { setUser } from '../../store/actions'

import './header.css'
import UserIcon from './User'
import Lang from './Lang'
import enseigne from './assets/enseigne.png'

let interval

function Header({User, Country, dispatch}) {
    const { t }=useTranslation()
    let history=useHistory()
    const myref=React.createRef()
    useEffect(() => {
        clearInterval(interval)
        interval=setInterval(()=>{
            const actualTm=+new Date
            if(actualTm-(User.timestamp) > 6000000) { // 30000000
                logout()
                history.push('/login')
            }
        }, 600000)
        return () => {
        }
    }, [User])


    const anim=()=>{
        myref.current.classList.toggle("open")
        let li=document.querySelectorAll('.nav-links li')
        li.forEach(link => {
            link.classList.toggle("fade")
        })
        let target=document.querySelector('.hamburger')
        target.classList.toggle('cross')
    }
    const nav=(route)=>{
        // console.log("the ref ", myref)
        myref.current.classList.remove("open")
        document.querySelector('.hamburger').classList.remove('cross')
        let li=document.querySelectorAll('.nav-links li')
        li.forEach(link => {
            link.classList.remove("fade")
        })
        // history.push(route)
        window.location.href=route
    }
    const logout=()=>dispatch(setUser({}))

    
    return (
        <div className="header" id='header'>
            <header>
                <nav>
                    <div className="banner">
                        <a href="/"><img src={enseigne} alt="" srcSet="" className="enseigne" /></a>
                        <Lang />
                    </div>
                    <div className="hamburger" onClick={anim} >
                        <div className="line"></div>
                        <div className="line"></div>
                        <div className="line"></div>
                    </div>
                    <ul className="nav-links" ref={myref}>
                        <li className="nav-link" onClick={()=>nav('/')}>  {t('link1')} </li> 
                        <li className="nav-link" onClick={()=>nav('/#about')}>  {t('link2')} </li> 
                        <li className="nav-link dropdown" >
                            <a onClick={()=>nav('/#services')}> {t('link3')} </a>
                            <div className="dropdown-content">
                                <div className="first-sub" ></div>
                                <div className="sub">
                                    <span className="arrow"></span>
                                    <div onClick={()=>nav('/sendmoney')} >{t('link6')}</div>
                                    <div onClick={()=>nav('/buycrypto')} >{t('link7')}</div>
                                    <div onClick={()=>nav('/sellcrypto')} >{t('link8')}</div>
                                </div>
                            </div>
                        </li> 
                        <li className="nav-link" onClick={()=>nav('/#contacts')}>{t('link4')}</li> 
                        <li className="nav-link sixth" > <a href="/signup"> {t('link9')} </a></li>
                        <UserIcon user={User}  nav={nav} logout={logout} />
                        <li className="nav-link" > <a href="http://support.ipercash.io" target="_blank"> {t('link5')} </a></li> 
                        {/* <button > {t('accountButton')} </button>  */}
                    </ul>
                </nav>
            </header>
            {/* <div className="beta-div">
                beta version
            </div> */}
        </div>
    )
}

const mapStateToProps=state=>({User: state.userReducer.user, Country: state.countryReducer.country})

export default connect(mapStateToProps)(Header)
