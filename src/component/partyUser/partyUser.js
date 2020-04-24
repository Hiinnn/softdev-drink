import React from 'react';
import './partyUser.css';
import CurrentParty from '../Current-party/Current-party';
import ComingParty from '../Coming-party/Coming-party';

class PartyU extends React.Component {
	render() {
		return ( <
			div className = 'partyUser-container' >
			<
			div className = "textCurrent" > Current party < /div> <
			CurrentParty / >
			<
			hr style = {
				{ borderTop: '1px solid #888787' } }
			/> <
			div className = "textCurrent" > Upcoming party < /div> <
			ComingParty / >
			<
			/div>
		);
	}
}
export default PartyU;