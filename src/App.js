import React from 'react';
import './App.css';
import Order from './pages/Order/Order';
import UserHome from './pages/User-home/User-home';
import UserProfile from './pages/User-profile/User-profile';
import TableCheck from './pages/TableCheck/TableCheck';
import TEST from './test'

function App() {
	return ( <
		div className = "App" > { /* <TEST/> */ } { /*<Order/>*/ } <
		TableCheck / > { /* <UserHome/>  */ } { /*<UserProfile />*/ } <
		/div>
	);
}
export default App;