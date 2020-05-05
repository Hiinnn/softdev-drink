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
		this.getMyInvitation()
	}

	getMyParty() {
		const url = `${localStorage.getItem('url')}/party/my_party/?is_all=True`
		const head = {
			Authorization: `Bearer ${localStorage.getItem('access')}`
		}

		Axios.get(url, { headers: head })
			.then((res) => {
				let date = new Date()
				let current = []
				let coming = []

				if (parseInt(res.data[0].start_datetime.slice(12, 13)) <= date.getHours())
					current.push(res.data[0])
				else
					coming.push(res.data[0])

				for (let i = 1; i < res.data.length; i++) {
					coming.push(res.data[i])
				}

				this.setState({
					currentPartyData: current,
					comingPartyData: coming
				})
			})
			.catch((err) => {
				console.log('party err', err.response)
			})
	}

	getMyInvitation() {
		const url = `${localStorage.getItem('url')}/party/invitation/`
		const head = {
			Authorization: `Bearer ${localStorage.getItem('access')}`
		}

		Axios.get(url, { headers: head })
			.then((res) => {
				this.setState({
					invitedParty: res.data
				})
			})
			.catch((err) => {
				console.log('invite err', err.response)
			})
	}

	deleteQuitParty(partyId) {
		const url = `${localStorage.getItem('url')}/party/participate/${partyId}`
		const head = {
			Authorization: `Bearer ${localStorage.getItem('access')}`
		}

		Axios.delete(url, { headers: head })
			.then((res) => {
				this.getMyParty()
			})
			.catch((err) => {
				console.log('quit err', err.response)
			})
	}

	render() {
		if (this.state.currentPartyData && this.state.comingPartyData)
			return (
				<div className='partyUser-container' >
					<div className="textCurrent" > Current party </div>


					<div className="current-container" >
						{
							this.state.currentPartyData &&
							<>
								<PartyList partyData={this.state.currentPartyData[0]}
									partyUser={true}
									sm={false}
									joined={true}
									current={true}
									quit={this.deleteQuitParty}
								/>
								<Invite />
								<div style={{ clear: 'left', marginLeft: '20px' }} > Total </div>
								<div style={{ float: 'left', width: 'auto', paddingRight: '10px', marginLeft: '20px' }} > {this.state.currentPartyData.total || 0.0} Baht </div>
							</>
						}
					</div>


					<hr style={
						{ borderTop: '1px solid #888787' }}
					/>
					<div className="textCurrent" > Upcoming party </div>

					{
						this.state.comingPartyData &&
						Object.keys(this.state.comingPartyData).map((i) => {
							return (
								<div className='coming-container'
									key={i} >
									<PartyList partyData={this.state.comingPartyData[i]}
										partyUser={true}
										sm={false}
										current={false}
										quit={this.deleteQuitParty}
									/>
									<Invite />
									<div style={{ width: 200, float: 'left', paddingRight: '10px', marginLeft: '20px' }}>
										Start : {(parseInt(this.state.comingPartyData[i].start_datetime.slice(11, 13)) + 7) % 24}{this.state.comingPartyData[i].start_datetime.slice(13, 16)}
									</div>
								</div>
							)
						})
					}


					<hr style={{ borderTop: '1px solid #888787' }} />
					<div className="textCurrent" > My invitation </div>

					<div >
						{
							this.state.invitedParty &&
							Object.keys(this.state.invitedParty).map((i) => {
								return (
									<div className='coming-container'
										key={i} >
										<PartyList partyData={this.state.invitedParty[i]}
											partyUser={true}
											sm={false}
											inv={true}
										/>
										<div style={{ width: 150, float: 'left', paddingRight: '10px', marginLeft: '20px', marginRight: '20px' }} > {this.state.invitedParty[i].start_datetime.slice(11, 16)} - {this.state.invitedParty[i].end_datetime.slice(11, 16)} </div>
										<div style={{ float: 'left' }} > Invited by {this.state.invitedParty[i].username} </div>
									</div>
								)
							})
						}
					</div>
				</div>
			);
		else
			return <> </>
	}
}
export default PartyU;