import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

// import SignUp from './pages/Login-Signup/Sign-up';
import LoginPage from './pages/Login-Signup/Login';
import ResetPassword from './pages/Login-Signup/Reset-password-page';

// import UserHome from './pages/User-home/User-home';
import UserBill from './pages/User-bill/User-bill';
import UserOrder from './pages/User-Order/User-Order';

// import OwnerHome from './pages/Owner-home/Owner-home';
import SearchResult from './pages/Search-result/Search-result';

import TableCheck from './pages/TableCheck/TableCheck';
import UserParty from './pages/User-party/User-party';

// ! Component ************************************
import Navbar from './component/Nav-bar/Nav-bar';

// * General
import Result from './component/Result/Result';
import SignUp from './component/Login-Sigup/SignUp-form';
import LoginForm from './component/Login-Sigup/Login-form';
import BranchDetail from './component/User-view-branch/Branch-detail';
import Reset from './component/Login-Sigup/Reset-password'

// * User main
import Slideshow from './component/Slideshow/Slideshow';
import Recommended from './component/Recommended/Recommended';
import UserProfile from './component/Profile/NewProfile';
import PartyU from './component/partyUser/partyUser';

// * Owner main
import Ownerform from './component/Owner-form/Owner-form'
import ShopOwnerTable from './component/ShopOwnerTable/ShopOwnerTable'

// * Shop manager main
import CheckTable from './component/CheckTable/CheckTable';

export default class App extends React.Component {

  constructor(props) {
    super(props)
    localStorage.setItem('url', 'https://f4057185.ngrok.io');
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
    localStorage.removeItem('role');
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('profile');
    this.setState({
      auth: false
    })
  }

  render() {
    return (
      <div className="App" >

        <Navbar auth={this.state.auth} logout={this.logout} />

        <Switch>
          <Route path="/search" component={Search} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={() => Login(this.login)} />
          <Route path="/reset" component={ResetPW}/>

          <Route path="/drinker/party/" component={DrinkerParty} />
          <Route path="/drinker/profile" component={() => <UserProfile />} />
          <Route path="/drinker/" component={DrinkerHome} />

          <Route path="/owner/shop/:shopId" render={props => <BranchDetail {...props} />} />
          <Route path="/owner/create" component={CreateShop} />
          <Route path="/owner" component={OwnerHome} />

          <Route path="/shop/:shopId" render={props => <BranchDetail {...props} />} />
          <Route path="/manager/check/:shopId" render={props => <CheckTable {...props} />} />

          <Route path="/" component={Home} />
          <Route component={() => <div>KUY</div>} />

        </Switch>
      </div>
    );
  }
}


const Home = () =>
  <>
    <Slideshow />
    <Recommended />
  </>

const Login = (login) => <LoginForm auth={login} />
const Signup = () => <SignUp />
const Search = () => <Result />
const ResetPW = () => <Reset />

const DrinkerHome = () => <><Slideshow /> <Recommended /></>

const OwnerHome = () => <ShopOwnerTable />
const CreateShop = () => <Ownerform />

const DrinkerParty = () => <PartyU />

