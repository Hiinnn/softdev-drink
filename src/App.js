import React from 'react';
import './App.css';
import Order from './pages/Order/Order';
import UserHome from './pages/User-home/User-home';
import UserProfile from './pages/User-profile/User-profile';
import TableCheck from './pages/TableCheck/TableCheck';
import LoginPage from './pages/Login-Signup/Login';
import SignUp from './pages/Login-Signup/Sign-up';

function App() {
  return (
    <div className="App" >
      {/* <TEST/> */}
      {/* <Order /> */}
      {/* <TableCheck/> */}
      {/* <UserHome/>  */}
      {/* <UserProfile /> */}
      <LoginPage/>
      {/* <SignUp/> */}
    </div>
  );
}
export default App;