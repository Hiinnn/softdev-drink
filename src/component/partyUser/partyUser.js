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
			currentPartyData: null,
			comingPartyData: null,
			invitedParty: null
		}
	}

	componentDidMount() {
		this.getMyParty()
		this.getMyInvitation()
	}

	getMyParty() {
		// get party data
		const url = `${localStorage.getItem('url')}/party/my_party/?is_all=True`
		const head = {
			Authorization: `Bearer ${localStorage.getItem('access')}`
		}

		Axios.get(url, { headers: head })
			.then((res) => {
				let current = []
				let coming = []

				// put nearest party to current party and other is coming party
				if (res.data.length > 0) {
					let date = new Date()

					if (parseInt(res.data[0].start_datetime.slice(12, 13)) <= date.getHours())
						current.push(res.data[0])
					else
						coming.push(res.data[0])

					for (let i = 1; i < res.data.length; i++) {
						coming.push(res.data[i])
					}
				}
				this.setState({
					currentPartyData: current,
					comingPartyData: coming
				})
			})
			.catch((err) => {
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
				this.setState({
					invitedParty: []
				})
			})
	}

	deleteQuitParty(partyId) {
		const url = `${localStorage.getItem('url')}/party/participate/${partyId}`
		const head = {
			Authorization: `Bearer ${localStorage.getItem('access')}`
		}

		Axios.delete(url, { headers: head })
			.then((res) => {
				window.location.reload()
			})
			.catch((err) => {
			})
	}

	currentParty() {
		// Check party is valid
		if (this.state.currentPartyData.length > 0)
			return (
				<>
					<div className="textCurrent" > Current party </div>
					<div className="current-container" >
						<PartyList partyData={this.state.currentPartyData[0]}
							partyUser={true}
							sm={false}
							joined={true}
							current={true}
							quit={this.deleteQuitParty}
						/>
						<Invite partyId={this.state.currentPartyData[0].party_id} />
						<div style={{ clear: 'left', marginLeft: '20px' }} > Total </div>
						<div style={{ float: 'left', width: 'auto', paddingRight: '10px', marginLeft: '20px' }} > {this.state.currentPartyData.total || 0.0} Baht </div>

					</div>
					<hr style={
						{ borderTop: '1px solid #888787' }}
					/>
				</>
			)
		else
			return (
				<>
					<div className="textCurrent" > Current party </div>
					<hr style={{ borderTop: '1px solid #888787' }} />
				</>
			)
	}

	comingParty() {
		// Check party is valid
		if (this.state.comingPartyData.length > 0)
			return (
				<>
					<div className="textCurrent" > Upcoming party </div>
					{
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
									<Invite partyId={this.state.comingPartyData[i].party_id} />
									<div style={{ width: 200, float: 'left', paddingRight: '10px', marginLeft: '20px' }}>
										Start : {(parseInt(this.state.comingPartyData[i].start_datetime.slice(11, 13)) + 7) % 24}{this.state.comingPartyData[i].start_datetime.slice(13, 16)}
									</div>
								</div>
							)
						})
					}
					<hr style={{ borderTop: '1px solid #888787' }} />
				</>
			)
		else
			return (
				<>
					<div className="textCurrent" > Upcoming party </div>
					<hr style={{ borderTop: '1px solid #888787' }} />
				</>
			)
	}

	invitedParty() {
		// Check party is valid
		if (this.state.invitedParty.length > 0)
			return (
				<>
					<div className="textCurrent" > My invitation </div>
					{
						Object.keys(this.state.invitedParty).map((i) => {
							return (
								<div className='coming-container'
									key={i} >
									<PartyList
										partyData={this.state.invitedParty[i]}
										partyUser={true}
										sm={false}
										current={false}
										quit={this.deleteQuitParty}
										inv={true}
									/>
									<div style={{ width: 100, float: 'left', paddingRight: '10px', marginLeft: '20px' }}>
										Start : {(parseInt(this.state.invitedParty[i].party_detail.start_datetime.slice(11, 13)) + 7) % 24}{this.state.invitedParty[i].party_detail.start_datetime.slice(13, 16)}
									</div>
									<div>
										Invited by {this.state.invitedParty[i].party_detail.member_list[0].name}
									</div>
								</div>
							)
						})
					}

					<hr style={{ borderTop: '1px solid #888787' }} />
				</>
			)
		else
			return (
				<>
					<div className="textCurrent" > My invitation </div>
					<hr style={{ borderTop: '1px solid #888787' }} />
				</>
			)
	}

	render() {
		if (this.state.currentPartyData && this.state.comingPartyData && this.state.invitedParty)
			return (
				<div className='partyUser-container' >
					{this.currentParty()}
					{this.comingParty()}
					{this.invitedParty()}
				</div>
			)
		else
			return <> </>
	}
}
export default PartyU;