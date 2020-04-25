import React from 'react';
import './Coming-party.css';
import PartyList from '../Party/Party';
import Invite from '../Invite/Invite';

const comingPartyData = [{
	name: 'Zeer O\'s',
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
		{ profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
		{ profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
	],
	host: false,
	time: '21:00 PM',
	date: '15/4/2020'

},
{
	name: 'Wachira',
	member: [
		{ profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
		{ profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
		{ profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
		{ profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
		{ profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
	],
	host: true,
	time: '21:00 PM',
	date: '15/4/2020'
},
]

class ComingParty extends React.Component {

	render() {
		return (
			<div > {
				Object.keys(comingPartyData).map((i) => {
					return (
						<div className='coming-container' >
							<PartyList partyData={comingPartyData[i]}
								partyUser={true}
								host={comingPartyData[i].host}
								sm={false} />
							<Invite host={comingPartyData.host} />
							<div style={
								{ float: 'left', width: 'auto', paddingRight: '10px', marginLeft: '20px' }} > {comingPartyData[i].time} </div>
							<div > {comingPartyData[i].date} </div>
						</div>
					)
				})
			}
			</div>
		);
	}
}
export default ComingParty;