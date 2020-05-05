import React from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';
import './AddTableForm.css';
import { partyData } from '../../data/NEW/Party';

class AddTableForm extends React.Component {
	constructor() {
		super()
		this.state = {
			party_name: partyData.party_name,
			member_max: partyData.member_max,
			start_datetime: partyData.start_datetime,
			end_datetime: partyData.end_datetime,
			is_join: false
		}
	}


	handlePartyName = (e) => {
		e.preventDefault();
		this.setState({ party_name: e.target.value })
	}

	changePartySize = (op) => {
		// check that party is empty or max
		if ((this.state.member_max === 0 && op === "-")) return;

		// add or sub
		let temp = op === "+" ? 1 : -1;
		this.setState(() => {
			return {
				member_max: this.state.member_max + temp
			}
		})
	}

	render() {
		return ( <
			div className = "NEW-PARTY-container" >
			<
			Form className = "NEW-PARTY-wrapper" >
			<
			h2 style = {
				{ textAlign: 'center', paddingBottom: '10px' } } > NEW PARTY < /h2> <
			Form.Group as = { Row }
			style = {
				{ paddingBottom: '15px' } } >
			<
			Form.Label style = {
				{ marginTop: '8px' } } >
			Party name <
			/Form.Label> <
			Col >
			<
			Form.Control type = "text"
			name = "Party_name"
			placeholder = "Party name"
			onChange = { this.handleChange }
			/> <
			/Col> <
			/Form.Group>

			<
			Form.Group as = { Row } >
			<
			Form.Label style = {
				{ marginTop: '8px', marginRight: '20px' } } >
			Member max <
			/Form.Label> <
			Col >
			<
			div className = "party-size-container" >
			<
			a className = "size-button-wrapper"
			onClick = {
				() => this.changePartySize('-') } >
			<
			img className = "size-button"
			src = "https://image.flaticon.com/icons/svg/271/271220.svg" / >
			<
			/a> <
			div className = "party-size" > { this.state.member_max }
			คน < /div> <
			a className = "size-button-wrapper"
			onClick = {
				() => this.changePartySize('+') } >
			<
			img className = "size-button"
			src = "https://image.flaticon.com/icons/svg/271/271228.svg" / >
			<
			/a> <
			/div>

			<
			/Col> <
			/Form.Group>

			<
			br / >
			<
			br / >

			<
			Button type = "submit"
			style = {
				{ width: '150px', float: 'right' } } > Create table < /Button> <
			/Form> <
			/div>



			// <div className = "tableCheck-container" >
			//     <div className="form-container">
			//         <form className="ui form">
			//                 <label>Party name</label>
			//                 <input type="text" placeholder="Party name" value={this.state.partyName || ""} onChange={this.handlePartyName} />

			// 				<div className="party-size-container">
			//             		<a className="size-button-wrapper" onClick={() => this.changePartySize('-')}>
			//                 		<img className="size-button" src="https://image.flaticon.com/icons/svg/271/271220.svg" />
			//             		</a>
			// 					 <div className="party-size">{this.state.max} คน</div>
			//            	 		<a className="size-button-wrapper" onClick={() => this.changePartySize('+')}>
			//                 		<img className="size-button" src="https://image.flaticon.com/icons/svg/271/271228.svg" />
			//             		</a>
			//         		</div>



			//         </form>
			//     </div>
			// </div>
		);
	}
}
export default AddTableForm;