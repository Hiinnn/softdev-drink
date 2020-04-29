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

const WebContext = React.createContext({
  link: 'http://f0e930d0.ngrok.io'
});

function App() {
  localStorage.setItem('url', 'http://f0e930d0.ngrok.io');
  
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
        // * <SignUp/>
        // * <LoginPage />
        // * <UserViewBranch />
        // * <ResetPassword />

        // order sm ใช้ได้
      }

      <Navbar />


      <Switch>
        <Route path="/login" component={login} />

        <Route path="/signup" component={signup} />

        <Route path={"/"} component={home} />

        {/* <Route component=for 404 /> */}

      </Switch>
    </div>
  );
}
export default App;


const home = () => <> <Slideshow /><Recommended /> </>
const login = () => <LoginForm />
const signup = () => <SignUp />