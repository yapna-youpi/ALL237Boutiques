import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

import './main.css'
import Toast from '../components/addons/toast/Toast';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Home from '../components/home/Home';
import SendMoney from '../components/sendmoney/SendMoney';
import SendCabital from '../components/sendmoney/SendCabital';
import Choose from '../components/buycrypto/Choose';
import BuyCryptoMobile from '../components/buycrypto/BuyCryptoMobile';
import BuyCryptoCard from '../components/buycrypto/BuyCryptoCard';
import SellCrypto from '../components/sellcrypto/SellCrypto';
import NotFound from '../components/notfound/NotFound';
import Pay from '../components/pay/Pay';
import PayCinet from '../components/pay/PayCinet'
import Success from '../components/success/Success';
import Signup from '../components/signup/Signup';
import Login from '../components/login/Login';
import Forget from '../components/forget/Forget';
import Reset from '../components/forget/Reset';
import More from '../components/home/more/More';
import Valid from '../components/valid/Valid';
import Cabital from '../components/Cabital/Cabital'
import SendNavigator from '../components/sendnavigator/SendNavigator'
import ComingSoon from '../components/coming/ComingSoon'

const SWITCH_INTOUCH = process.env.REACT_APP_SWITCH_INTOUCH === 'TRUE'

function Main({ User, Country }) {


    const showHead = () => document.URL.indexOf('help') + 1
    const checkUser = C => User.userId ? C : () => <Redirect to="/login" />
    const checkAccount = C => User.userEmail.includes('@ipercash.') ? C : () => <ComingSoon />

    // console.log("the User ", User)
    return (
        <div className="main">
            <Helmet>
                <script src="https://widget.mercuryo.io/embed.2.0.js"></script>
            </Helmet>
            <Router>
                {!showHead() && <Header />}
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/home' exact component={Home} />
                    {/* <Route path='/sendmoney*' exact component={checkUser(SendNavigator)} /> */}
                    {/* <Route path='/sendmoney*' exact component={checkUser(SendMoney)} /> */}
                    <Route path='/buycrypto' exact component={Choose} />
                    <Route path='/buycrypto/mobile*' exact component={checkUser(BuyCryptoMobile)} />
                    <Route path='/buycrypto/card' exact component={checkUser(BuyCryptoCard)} />
                    <Route path='/sellcrypto*' exact component={checkUser(SellCrypto)} />
                    <Route path='/purchase' exact component={SWITCH_INTOUCH ? PayCinet : Pay} />
                    <Route path='/complete' exact component={Success} />
                    <Route path='/signup*' exact component={Signup} />
                    <Route path='/signup/:id' exact component={Signup} />
                    <Route path='/login*' exact component={Login} />
                    <Route path='/valid/help/:id' component={Valid} />
                    <Route path='/forget' exact component={Forget} />
                    <Route path="/reset/:id" exact component={Reset} />
                    <Route path='/More' exact component={More} />
                    {/* <Route path='/express' exact component={checkUser(Cabital)} /> */}
                    <Route path='/coming*' exact component={ComingSoon} />
                    {/* <Route path='/sumsub' exact component={Sumsub} />  */}
                    <Route path='*' component={NotFound} />
                </Switch>
                <Footer />
            </Router>
            <Toast />
        </div>
    )
}

const mapStateToProps = state => ({
    User: state.userReducer.user, Country: state.countryReducer.country,
})

export default connect(mapStateToProps)(Main)