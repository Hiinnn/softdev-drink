import React from 'react';
import './partyUser.css';
import PartyList from '../Party/Party';
import Invite from '../Invite/Invite';
import { partyData, partyArray } from '../../data/NEW/Party';
import Axios from 'axios';

class PartyU extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPartyData: partyData,
			comingPartyData: partyArray
		}
	}

	componentDidMount() {
		this.getMyParty()
	}

	getMyParty() {
		const url = `${localStorage.getItem('url')}/party/my_party/?is_all=True`
		const head = {
			Authorization: `Bearer ${localStorage.getItem('access')}`
		}

		Axios.get(url, { headers: head })
			.then((res) => {
				let current = []
				let coming = []
				let pass = []
				// console.log('party', res.data[0], newArr)

				// this.setState({
				// 	currentPartyData: res.data[0],
				// 	comingPartyData: newArr
				// })
			})
			.catch((err) => {
				console.log('party err', err.response)
			})
	}

	deleteQuitParty(partyId) {
		const url = `${localStorage.getItem('url')}/party/participate/${partyId}`
		const head = {
			Authorization: `Bearer ${localStorage.getItem('access')}`
		}

		Axios.delete(url, { headers: head })
			.then((res) => {
				console.log('quit', res.data)
				this.getMyParty()
			})
			.catch((err) => {
				console.log('quit err', err.response)
			})
	}

	render() {
		return (
			<div className='partyUser-container' >
				<div className="textCurrent" > Current party </div>

				<div className="current-container" >
					<PartyList partyData={this.state.currentPartyData}
						partyUser={true}
						sm={false}
						joined={true}
						quit={this.deleteQuitParty}
					/>
					<Invite />
					<div style={{ clear: 'left', marginLeft: '20px' }} > Total </div>
					<div style={{ float: 'left', width: 'auto', paddingRight: '10px', marginLeft: '20px' }} > {this.state.currentPartyData.total || 0.0}Baht </div>
				</div>


				<hr style={
					{ borderTop: '1px solid #888787' }}
				/>
				<div className="textCurrent" > Upcoming party </div>

				<div > {
					Object.keys(this.state.comingPartyData).map((i) => {
						return (
							<div className='coming-container'
								key={i} >
								<PartyList partyData={this.state.comingPartyData[i]}
									partyUser={true}
									sm={false}
									quit={this.deleteQuitParty}
								/>
								<Invite />
								<div style={{ width: 200, float: 'left', paddingRight: '10px', marginLeft: '20px' }} > {this.state.comingPartyData[i].start_datetime.slice(11, 16)} - {this.state.comingPartyData[i].end_datetime.slice(11, 16)}
								</div>
							</div>
						)
					})
				}
				</div>


				<hr style={{ borderTop: '1px solid #888787' }} />
				<div className="textCurrent" > My invitation </div>

				<div >
					{
						Object.keys(this.state.comingPartyData).map((i) => {
							return (
								<div className='coming-container'
									key={i} >
									<PartyList partyData={this.state.comingPartyData[i]}
										partyUser={true}
										sm={false}
										inv={true}
									/>
									<div style={{ width: 150, float: 'left', paddingRight: '10px', marginLeft: '20px', marginRight: '20px' }} > {this.state.comingPartyData[i].start_datetime.slice(11, 16)} - {this.state.comingPartyData[i].end_datetime.slice(11, 16)} </div>
									<div style={{ float: 'left' }} > Invited by {this.state.comingPartyData[i].username} </div>
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