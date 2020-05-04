import React from 'react';


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
		alert(this.state.value);
		event.preventDefault();
	}

	render() {
		return (
			<div >
				<form onSubmit={this.handleSubmit}
					style={
						{ margin: '20px', float: 'left' }
					} >
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
						style={{marginLeft: 15}}/>
				</form>
			</div>
		);
	}
}
export default Invite;