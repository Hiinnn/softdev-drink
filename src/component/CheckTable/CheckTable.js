import React from 'react';
import './CheckTable.css';
import { partyOrderArray } from '../../data/NEW/partyOrder';
import Axios from 'axios';
import { Link } from 'react-router-dom';

class CheckTable extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
		}
	}

	componentDidMount() {
		this.getManagerData()
	}

	componentDidUpdate() {
		if (this.state.managerData && !this.state.partyList) {
			this.getPartyList()
			this.getOrderList()
		}
	}

	getManagerData() {
		const url = `${localStorage.getItem('url')}/manager/profile/my_profile/`

		const head = {
			Authorization: `Bearer ${localStorage.getItem('access')}`
		}
		Axios.get(url, { headers: head })
			.then((res) => {
				this.setState({
					managerData: res.data
				})
			})
			.catch((err) => {
				console.log('check da err', err.response);
			})
	}

	getPartyList() {
		const date = new Date()
		const url = `${localStorage.getItem('url')}/party/list/?date=${date.getFullYear()}-${(date.getMonth() + 1) % 12}-${date.getDate()}&shop_id=${this.state.managerData.related_shop.shop_id}`

		const head = {
			Authorization: `Bearer ${localStorage.getItem('access')}`
		}
		Axios.get(url, { headers: head })
			.then((res) => {
				this.setState({
					partyList: res.data
				})
			})
			.catch((err) => {
				console.log('check ta err', err.response);
			})
	}

	getOrderList() {
		const date = new Date()
		const url = `${localStorage.getItem('url')}/ordering/party/bill/?date=${date.getFullYear()}-${(date.getMonth() + 1) % 12}-${date.getDate()}&shop_id=${this.state.managerData.related_shop.shop_id}`

		const head = {
			Authorization: `Bearer ${localStorage.getItem('access')}`
		}
		Axios.get(url, { headers: head })
			.then((res) => {
				this.setState({
					orderList: res.data
				})
			})
			.catch((err) => {
				console.log('order ta err', err.response);
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
			shop_id: this.state.managerData.related_shop.shop_id,
			party_name: 'Manager Booking',
			member_max: 3,
			start_datetime: new Date(date.getFullYear(), date.getMonth(), date.getDate(), startHr + 7, startMin, 0).toISOString().replace('.000Z', '+07:00'),
			end_datetime: new Date(date.getFullYear(), date.getMonth(), date.getDate(), endHr + 7, endMin, 0).toISOString().replace('.000Z', '+07:00'),
			is_join: 'False'
		}

		Axios.post(url, data, { headers: head })
			.then((res) => {
				window.location.reload()
			})
			.catch((err) => {
				console.log('create ta err', err.response);
			})
	}

	patchPaidBill(...e) {
		const url = `${localStorage.getItem('url')}/ordering/party/bill/${this.state.partyList[e[0]].party_id}/`
		const head = {
			Authorization: `Bearer ${localStorage.getItem('access')}`
		}
		const data = {
			payment_type: 'ca'
		}

		Axios.patch(url, data, { headers: head })
			.then((res) => {
			})
			.catch((err) => {
				console.log('create ta err', err.response);
			})
	}

	postAddOrder() {

	}

	render() {
		if (this.state.partyList && this.state.managerData && this.state.orderList)
			return (
				<div className="tableCheck-container" >
					<table className="tbCheck"
						style={
							{ float: 'left' }} >
						<thead >
							<tr >
								<th className="thCheck" > Party </th>
								<th className="thCheck" > Menu </th>
								<th className="thCheck" > Total </th>
								<th className="thCheck" > Check </th>
								{/* <th className="thCheck" > Clear </th> */}
							</tr>
						</thead>

						<tbody>
							{
								Object.keys(this.state.partyList).map((i) => {
									return (
										<tr className="data-tableCheck"
											key={i} >
											<td style={{ padding: "3%" }} > {parseInt(i)+1} </td>
											<td className="add" >
												<Link to={`/drinker/order/${this.props.match.params.shopId}/${this.state.partyList[i].party_id}`} style={{ textDecoration: 'none', color: 'white' }}>
													add
												</Link>
											</td>
											<td > {this.state.orderList[i].order_total} </td>
											<td className="true" onClick={this.patchPaidBill.bind(this, i)}> ✔ </td>
											{/* <td className="false" > ✘ </td> */}
										</tr>
									);
								})
							}
						</tbody>
					</table>
					<div style={{ paddingTop: '280px', width: '500px', height: '40px', float: 'left', position: 'relative', left: '50%', transform: 'translateX(-50%)' }} >
						<img className="imageplus"
							src={require("../../asset/icon/plus.png")}
							alt=""
							onClick={this.postCreateParty.bind(this)}
							width='40' />
					</div>
				</div>
			);

		else
			return <></>
	}
}
export default CheckTable;