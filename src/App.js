import React from 'react';
import './App.css';
import Order from './pages/Order/Order';
import UserHome from './pages/User-home/User-home';
import UserProfile from './pages/User-profile/User-profile';
import TableCheck from './pages/TableCheck/TableCheck';
import LoginPage from './pages/Login-Signup/Login';
import SignUp from './pages/Login-Signup/Sign-up';
import UserBill from './pages/User-bill/User-bill'
import ResetPassword from './pages/Login-Signup/Reset-password-page';

function App() {
  return (
    <div className="App" >
      {/* <TEST/> */}
      {/* <TableCheck/> */}
      {/* <UserProfile /> */}
      {/* <Order /> */}
      {/* <UserHome/>  */}
      {/* <LoginPage/> */}
      {/* <SignUp/> */}
      {/* <UserBill/> */}
      <ResetPassword/>
    </div>
  );
}
export default App;