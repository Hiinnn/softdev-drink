import React from 'react';
import Axios from 'axios';


class Invite extends React.Component {
	constructor(props) {
		super(props);
		this.state = { value: '' };
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({ value: event.target.value });
	}

	handleSubmit(event) {
		event.preventDefault();
		this.postInvite()
	}

	postInvite() {
		console.log(this.props.partyId);
		
		const url = `${localStorage.getItem('url')}/party/invitation/`
		const data = {
			username: this.state.value,
			party_id: this.props.partyId
		}
		const head = {
			Authorization: `Bearer ${localStorage.getItem('access')}`
		}

		Axios.post(url, data, { headers: head })
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log('party err', err.response)
			})
	}

	render() {
		return (
			<div >
				<form onSubmit={this.handleSubmit} style={{ margin: '20px', float: 'left' }}>
					<label >
						<input type="text"
							name="name"
							value={this.state.value}
							placeholder="Enter Username"
							onChange={this.handleChange}
							className='Username' />
					</label>
					<input type="submit"
						value="INVITE"
						className='INVITE'
						style={{ marginLeft: 15 }} />
				</form>
			</div>
		);
	}
}
export default Invite;