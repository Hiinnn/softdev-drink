import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

// import SignUp from './pages/Login-Signup/Sign-up';
import LoginPage from './pages/Login-Signup/Login';
import ResetPassword from './pages/Login-Signup/Reset-password-page';

// import UserHome from './pages/User-home/User-home';
import UserBill from './pages/User-bill/User-bill';
import UserOrder from './pages/User-Order/User-Order';
import UserProfile from './pages/User-profile/User-profile';

// import OwnerHome from './pages/Owner-home/Owner-home';
import SearchResult from './pages/Search-result/Search-result';

import TableCheck from './pages/TableCheck/TableCheck';
import UserParty from './pages/User-party/User-party';

// ! Component ************************************
import Navbar from './component/Nav-bar/Nav-bar';

// * General
import SignUp from './component/Login-Sigup/SignUp-form';
import LoginForm from './component/Login-Sigup/Login-form';
import BranchDetail from './component/User-view-branch/Branch-detail';

// * User main
import Slideshow from './component/Slideshow/Slideshow';
import Recommended from './component/Recommended/Recommended';

// * Owner main
import ShopOwnerTable from './component/ShopOwnerTable/ShopOwnerTable';
import Result from './component/Result/Result';

export default class App extends React.Component {

  constructor(props) {
    super(props)
    localStorage.setItem('url', 'https://532127f4.ngrok.io');
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
          // // ? <OwnerHome />

          // // * <UserHome />
          // * <UserViewBranch />
          // * <ResetPassword />



          // ! <SignUp/>
          // ! <LoginPage />
          // TODO <UserHome />
          // TODO <OwnerHome />
          // order sm ใช้ได้
        }
        <Navbar auth={this.state.auth} logout={this.logout} />

        <Switch>
          <Route path="/login" component={() => Login(this.login)} />

          <Route path="/signup" component={Signup} />

          <Route path="/search" component={Search}/>

          <Route path="/drinker" component={DrinkerHome} />
          {/* <Route path="/owner" component={OwnerHome} /> */}
          {/* <Route path="/manager" component={ManagerHome} /> */}

          <Route path="/shop" component={Shop}/>

          <Route path="/" component={Home} />

          <Route component={() => <div>KUY</div>}/>

        </Switch>
      </div>
    );
  }
}


const Home = () => <> <Slideshow /><Recommended /> </>
const Login = (login) => <LoginForm auth={login} />
const Signup = () => <SignUp />
const Search = () => <Result/>

const Shop = () => <BranchDetail/>

const DrinkerHome = () => <><Slideshow /> <Recommended /></>
const OwnerHome = () => <> <ShopOwnerTable /></>
const ManagerHome = () => <></>
