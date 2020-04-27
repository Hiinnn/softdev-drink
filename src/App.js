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
import UserParty from './pages/User-party/User-party';

function App() {
<<<<<<< HEAD
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
      <UserViewBranch />
    </div>
  );
=======
	return ( <
		div className = "App" > {
			// ? <SearchResult /> heart
			// ? <UserParty/> total
			// ? <UserOrder /> function
			// ? <TableCheck />

			// ? <UserProfile />
			// ? <UserBill />
			// ? <OwnerHome />

			// ? <UserHome />
			// * <SignUp/>
			// * <LoginPage />
			// * <UserViewBranch />
			// * <ResetPassword />

			// order sm ใช้ได้
		}


		{ /* <UserViewBranch /> */ }

		<
		/div>
	);
>>>>>>> 32e6da946b75907ebbc2cf59896934f5cf6ac722
}
export default App;