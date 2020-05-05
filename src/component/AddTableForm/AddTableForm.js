import React from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';
import './AddTableForm.css';
import { partyData } from '../../data/NEW/Party';
import Axios from 'axios';

class AddTableForm extends React.Component {
	constructor() {
		super()
		this.state = {
			party_name: partyData.party_name,
			member_max: partyData.member_max,
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

	postCreateParty() {
		const date = new Date()
		const startHr = date.getMinutes() < 30 ? date.getHours() : date.getHours() + 1
		const startMin = date.getMinutes() < 30 ? '30' : '00'
		const endHr = startHr + 1
		const endMin = date.getMinutes() < 30 ? '00' : '30'

		const url = `${localStorage.getItem('url')}/booking/book/`
		const head = {
			Authorization: `Bearer ${localStorage.getItem('access')}`
		}
		const data = {
			shop_id: this.props.shopId,
			party_name: this.state.party_name,
			member_max: this.state.member_max,
			start_datetime: new Date(date.getFullYear(), date.getMonth(), date.getDate(), startHr + 7, startMin, 0).toISOString().replace('.000Z', '+07:00'),
			end_datetime: new Date(date.getFullYear(), date.getMonth(), date.getDate(), endHr + 7, endMin, 0).toISOString().replace('.000Z', '+07:00'),
			is_join: 'False'
		}

		Axios.post(url, data, { headers: head })
			.then((res) => {
				this.props.toggle()
				window.location.reload()
			})
			.catch((err) => {
				console.log('create ta err', err.response);
			})
	}

	render() {
		return (
			<div>
				<Form className="NEW-PARTY-wrapper" >
					<h2 style={
						{ textAlign: 'center', paddingBottom: '10px' }} > NEW PARTY </h2>
					<Form.Group as={Row} style={{ paddingBottom: '15px' }} >
						<Form.Label style={{ marginTop: '8px' }} >Party name </Form.Label>
						<Col >
							<Form.Control type="text"
								name="Party_name"
								placeholder="Party name"
								onChange={this.handleChange} />
						</Col>
					</Form.Group>

					<Form.Group as={Row} >
						<Form.Label style={{ marginTop: '8px', marginRight: '20px' }} >Member max </Form.Label>
						<Col >
							<div className="party-size-container" >
								<a className="size-button-wrapper" onClick={() => this.changePartySize('-')} >
									<img className="size-button"
										src="https://image.flaticon.com/icons/svg/271/271220.svg" />
								</a>
								<div className="party-size" > {this.state.member_max}คน </div>
								<a className="size-button-wrapper" onClick={() => this.changePartySize('+')} >
									<img className="size-button" src="https://image.flaticon.com/icons/svg/271/271228.svg" />
								</a>
							</div>

						</Col>
					</Form.Group>

					<br />
					<br />

					<Button type="submit" style={{ width: '150px', float: 'right' }} > Create table </Button>
				</Form>
			</div>
		);
	}
}
export default AddTableForm;