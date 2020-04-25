import React from 'react';
import Navbar from '../../component/Nav-bar/Nav-bar';
import './User-party.css';
import PartyU from '../../component/partyUser/partyUser';

class UserParty extends React.Component {

	render() {
		return (
			<>
				<Navbar />
				<PartyU />
			</>
		);
	}
}
export default UserParty;