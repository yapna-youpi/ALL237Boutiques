import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { setUser, changeCountry } from '../../store/actions'

import './header.css'
import { HiHome } from 'react-icons/hi'
// import { GrServices } from 'react-icons/gr'
import { BiChevronDown } from 'react-icons/bi'
import { AiFillContacts } from 'react-icons/ai'
import { GiArchiveRegister } from 'react-icons/gi'
import { MdHelpCenter, MdMiscellaneousServices } from 'react-icons/md'
import UserIcon from './User'
import Lang from './Lang'
import enseigne from './assets/acheter_bitcoin_usdt_etherium.png'

let beta = process.env.REACT_APP_IS_BETA === "TRUE"
let interval

function Header({ User, Country, dispatch }) {
    const [show, setShow] = React.useState(false)
    const { t } = useTranslation()
    let history = useHistory()
    const myref = React.createRef()
    useEffect(() => {
        clearInterval(interval)
        interval = setInterval(() => {
            const actualTm = +new Date
            if (actualTm - (User.timestamp) > 6000000) { // 30000000
                logout()
                history.push('/login')
            }
        }, 600000)
        getLocation()
        return () => {
        }
    }, [User])


    const anim = () => {
        myref.current.classList.toggle("open")
        let li = document.querySelectorAll('.nav-links li')
        li.forEach(link => {
            link.classList.toggle("fade")
        })
        let target = document.querySelector('.hamburger')
        target.classList.toggle('cross')
    }
    const nav = (route) => {
        myref.current.classList.remove("open")
        document.querySelector('.hamburger').classList.remove('cross')
        let li = document.querySelectorAll('.nav-links li')
        li.forEach(link => {
            link.classList.remove("fade")
        })
        // history.push(route)
        window.location.href = route
    }
    const logout = () => dispatch(setUser({}))
    const getLocation = () => {
        let ip = localStorage.getItem('inp')
        if (ip) {
            ip = JSON.parse(ip)
            dispatch(changeCountry(ip.country_code))
        } else {
            fetch("https://ipapi.co/json/")
                .then(res => res.json()).then(data => {
                    localStorage.setItem('inp', JSON.stringify(data))
                    dispatch(changeCountry(data.country_code))
                })
                .catch(error => ()=>{})
        }
    }
    const showServices = (e) => {

        if (window.innerWidth <= 768) {
            document.getElementById('dropdown-content').classList.toggle('visible');
        } else {
            nav('/#services')
        }

    }


    return (
        <div className="header" id='header'>
            <header>
                <nav>
                    <div className="banner">
                        <a href="/"><img src={enseigne} alt="acheter et vendre sa cryptomonnaie electronique sur IPERCash" srcSet="" className="enseigne" /></a>
                        <Lang />
                    </div>
                    <div className="hamburger" onClick={anim} >
                        <div className="line"></div>
                        <div className="line"></div>
                        <div className="line"></div>
                    </div>
                    <ul className="nav-links" ref={myref}>
                        <li className="nav-link" onClick={() => nav('/')}><i className='mobi-icon'><HiHome /></i>  {t('link1')} </li>
                        <li className="nav-link" onClick={() => nav('/#about')}>
                            <i className='mobi-icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffffff" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.875 14.25l1.214 1.942a2.25 2.25 0 001.908 1.058h2.006c.776 0 1.497-.4 1.908-1.058l1.214-1.942M2.41 9h4.636a2.25 2.25 0 011.872 1.002l.164.246a2.25 2.25 0 001.872 1.002h2.092a2.25 2.25 0 001.872-1.002l.164-.246A2.25 2.25 0 0116.954 9h4.636M2.41 9a2.25 2.25 0 00-.16.832V12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 12V9.832c0-.287-.055-.57-.16-.832M2.41 9a2.25 2.25 0 01.382-.632l3.285-3.832a2.25 2.25 0 011.708-.786h8.43c.657 0 1.281.287 1.709.786l3.284 3.832c.163.19.291.404.382.632M4.5 20.25h15A2.25 2.25 0 0021.75 18v-2.625c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125V18a2.25 2.25 0 002.25 2.25z" />
                                </svg>

                            </i> {t('link2')}
                        </li>
                        {/* <li className="nav-link" onClick={() => nav('/express')}><i className='mobi-icon'><HiHome /></i>  TRANSFERT </li> */}
                        <li className="nav-link dropdown" >
                            <i className='mobi-icon'><MdMiscellaneousServices size={22} /></i>
                            <a onClick={e => showServices(e)}> {t('link3')} </a>
                            <i className='mobi-icon'><BiChevronDown size={24} /></i>


                            <div className="dropdown-content" id="dropdown-content">
                                <div className="first-sub" ></div>
                                <div className="sub">
                                    <span className="arrow"></span>
                                    <div onClick={() => nav('/sendmoney/' + process.env.REACT_APP_SEND_LINK)} >{t('link6')}</div>
                                    <div onClick={() => nav('/buycrypto')} >{t('link7')}</div>
                                    <div onClick={() => nav('/sellcrypto/' + process.env.REACT_APP_SELL_LINK)} >{t('link8')}</div>
                                </div>
                            </div>
                        </li>
                        <li className="nav-link" onClick={() => nav('/#contacts')}> <i className='mobi-icon'><AiFillContacts /></i>{t('link4')}</li>
                        <li className="nav-link sixth" > <a href="/signup"><i className='mobi-icon'><GiArchiveRegister /></i> {t('link9')} </a></li>
                        <UserIcon user={User} nav={nav} logout={logout} />
                        <li className="nav-link" > <a href="http://support.ipercash.io" target="_blank"><i className='mobi-icon'><MdHelpCenter /></i> {t('link5')} </a></li>
                        {/* <button > {t('accountButton')} </button>  */}
                    </ul>
                </nav>
            </header>
            {beta && <div className="beta-div">
                Sandbox
            </div>}
        </div>
    )
}

const mapStateToProps = state => ({ User: state.userReducer.user, Country: state.countryReducer.country })

export default connect(mapStateToProps)(Header)