import React from 'react';
import './partyUser.css';
import PartyList from '../Party/Party';
import Invite from '../Invite/Invite';
import { partyData } from '../../data/NEW/Party';
import comingPartyArray from '../../data/NEW/comingPartyArray';

class PartyU extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPartyData: partyData,
			comingPartyData: comingPartyArray
		}
	}
	render() {
		return (
			<div className='partyUser-container' >
				<div className="textCurrent" > Current party </div>

				<div className="current-container" >
					<PartyList partyData={this.state.currentPartyData}
						partyUser={true}
						/*host={currentPartyData.host}*/
						sm={false}
					/>
					<Invite host={true} />
					<div style={{ clear: 'left', marginLeft: '20px' }} > Total </div>
					<div style={{ float: 'left', width: 'auto', paddingRight: '10px', marginLeft: '20px' }} > 3000 { /*{this.state.currentPartyData.total}*/} </div>
					<div> Baht </div>
				</div>


				<hr style={{ borderTop: '1px solid #888787' }} />
				<div className="textCurrent" > Upcoming party </div>


				<div >
					{
						Object.keys(this.state.comingPartyData).map((i) => {
							return (
								<div className='coming-container' >
									<PartyList partyData={this.state.comingPartyData[i]}
										partyUser={true}
										/*host={this.state.comingPartyData[i].host}*/
										sm={false}
									/>
									<Invite host={true} /*{this.state.comingPartyData.host}*/ />
									<div style={{ float: 'left', width: 'auto', paddingRight: '10px', marginLeft: '20px' }
									}> {this.state.comingPartyData[i].start_datetime} - {this.state.comingPartyData[i].end_datetime}
									</div>
								</div>
							)
						})
					}
				</div>
			</div>
		);
	}
}
export default PartyU;