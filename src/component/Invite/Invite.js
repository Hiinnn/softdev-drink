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
		return ( <
			div >
			<
			form onSubmit = { this.handleSubmit }
			style = {
				{ margin: '20px', float: 'left' }
			} >
			<
			label >
			<
			input type = "text"
			name = "name"
			value = { this.state.value }
			placeholder = "Enter Username"
			onChange = { this.handleChange }
			className = 'Username' / >
			<
			/label> <
			input type = "submit"
			value = "INVITE"
			className = 'INVITE' / >
			<
			/form> <
			div style = {
				{ marginTop: '20px', float: 'left' } } >

			<
			div className = "form-check"
			id = "check"
			style = {
				{ width: '180px' }
			} >
			<
			input className = "form-check-input"
			type = "radio"
			name = "partyType"
			id = "private"
			value = "option1" / >
			<
			label className = "form-check-label"
			htmlFor = "exampleRadios2" > Private < /label> <
			/div> <
			div className = "form-check"
			id = "check"
			style = {
				{ width: '180px' }
			} >
			<
			input className = "form-check-input"
			type = "radio"
			name = "partyType"
			id = "public"
			value = "option2" / >
			<
			label className = "form-check-label"
			htmlFor = "exampleRadios2" > Public < /label> <
			/div> <
			/div> <
			/div>
		);
	}
}
export default Invite;