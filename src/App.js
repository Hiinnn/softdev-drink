import React from 'react';
import './App.css';

import SignUp from './pages/Login-Signup/Sign-up';
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

function App() {
  return (
    <div className="App" >
      {
        // ? <TableCheck />
        // ? <UserProfile />
        // ? <UserBill />
        // ? <OwnerHome />
        // ? <SearchResult />
        // ? <UserHome />
        // ? <UserOrder />
        // ? <ResetPassword />
        
        // * <SignUp/>
        // * <LoginPage />
        // * <UserViewBranch />
      }
      <LoginPage />
      <OwnerHome />
      <UserOrder />
      <UserViewBranch />
    </div>
  );
}
export default App;