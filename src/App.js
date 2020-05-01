import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

// import SignUp from './pages/Login-Signup/Sign-up';
import LoginPage from './pages/Login-Signup/Login';
import ResetPassword from './pages/Login-Signup/Reset-password-page';

import UserHome from './pages/User-home/User-home';
import UserBill from './pages/User-bill/User-bill';
import UserOrder from './pages/User-Order/User-Order';
import UserProfile from './pages/User-profile/User-profile';
import UserViewBranch from './pages/ํ๊User-view-branch/User-view-branch';

import OwnerHome from './pages/Owner-home/Owner-home';
import SearchResult from './pages/Search-result/Search-result';

import TableCheck from './pages/TableCheck/TableCheck';
import UserParty from './pages/User-party/User-party';

// ! Component ************************************
import Navbar from './component/Nav-bar/Nav-bar';

// * Signup
import SignUp from './component/Login-Sigup/SignUp-form';

// * Login
import LoginForm from './component/Login-Sigup/Login-form';

// * Usermain
import Slideshow from './component/Slideshow/Slideshow';
import Recommended from './component/Recommended/Recommended';

export default class App extends React.Component {

  constructor(props) {
    super(props)
    localStorage.setItem('url', 'https://4c6714eb.ngrok.io');
    this.state = {
      auth: true && localStorage.getItem("access") !== null
    }

    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
  }

  login = () => {
    this.setState({
      auth: true
    })
  }

  logout = () => {
    this.setState({
      auth: false
    })
  }

  render() {
    return (
      <div className="App" >
        {
          // ? <UserParty/>
          // ? <TableCheck />
          // ? <SearchResult />
          // ? <UserOrder />

          // ? <UserProfile />
          // ? <UserBill />
          // ? <OwnerHome />

          // * <UserHome />
          // * <UserViewBranch />
          // * <ResetPassword />



          // ! <SignUp/>
          // ! <LoginPage />
          // order sm ใช้ได้
        }

        <TableCheck />
        <Navbar auth={this.state.auth} logout={this.logout} />

        <Switch>
          <Route path="/login" component={() => Login(this.login)} />

          <Route path="/signup" component={Signup} />

          <Route path={"/"} component={Home} />

          <Route />

        </Switch>
      </div>
    );
  }
}


const Home = () => <> <Slideshow /><Recommended /> </>
const Login = (login) => <LoginForm auth={login} />
const Signup = () => <SignUp />
