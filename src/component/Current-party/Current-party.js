import React from 'react';
import './Current-party.css';
import PartyList from '../Party/Party';
import Invite from '../Invite/Invite';

const currentPartyData = {
	name: 'Big\'s Party',
	member: [
		{ profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
		{ profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
		{ profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
		{ profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
		{ profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
		{ profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
		{ profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
		{ profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
		{ profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
		{ profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
	],
	host: true,
	total: 3000
}



class CurrentParty extends React.Component {
	render() {
		return (
			<div className="current-container" >
				<PartyList partyData={currentPartyData}
					partyUser={true}
					host={currentPartyData.host}
					sm={false}
				/>
				<Invite host={currentPartyData.host} />
				<div style={{ clear: 'left', marginLeft: '20px' }}>
					Total
					 </div>
				<div style={
					{ float: 'left', width: 'auto', paddingRight: '10px', marginLeft: '20px' }} > {currentPartyData.total} </div>
				<div > Baht </div>
			</div>
		);
	}
}
export default CurrentParty;