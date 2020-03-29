import React from 'react';
import './App.css';
import Order from './pages/Order/Order';
import UserHome from './pages/User-home/User-home';
import UserProfile from './pages/User-profile/User-profile';
import TEST from './test'

function App() {
	return ( <
		div className = "App" > { /* <TEST/> */ } <
		Order / > { /* <UserHome/>  */ } { /*<UserProfile />*/ } <
		/div>
	);
}
export default App;