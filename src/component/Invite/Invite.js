import React from 'react';
import Axios from 'axios';
import { NotifyAlert } from '../SweetAlert'


class Invite extends React.Component {
	constructor(props) {
		super(props);
		this.state = { value: '' };
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		// set state when enter username
		this.setState({ value: event.target.value });
	}

	handleSubmit(event) {
		event.preventDefault();
		this.postInvite()
	}

	postInvite() {
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
				NotifyAlert(() => { }, 'เชิญสำเร็จ', '', 'success', false)
			})
			.catch((err) => {
				NotifyAlert(() => { }, 'ล้มเหลว', 'ไม่สามารถเชิญผู้ใช้ได้', 'error', false)
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