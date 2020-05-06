import React from 'react';
import './CheckTable.css';
import { partyOrderArray } from '../../data/NEW/partyOrder';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import AddTableForm from '../AddTableForm/AddTableForm'

class CheckTable extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			newParty: false
		}
		this.toggleAddParty = this.toggleAddParty.bind(this)
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
		const url = `${localStorage.getItem('url')}/ordering/party/bill/?date=${date.getFullYear()}-${(date.getMonth() + 1) % 12}-${date.getDate()}&shop_id=${this.state.managerData.related_shop.shop_id}&is_active=True`

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

	toggleAddParty() {
		this.setState({
			newParty: !this.state.newParty
		})
	}

	render() {
		if (this.state.partyList && this.state.managerData && this.state.orderList)
			return (
				<div className="tableCheck-container" >
					{
						!this.state.newParty &&
						<>
							<table className="tbCheck"
								style={
									{ float: 'left' }} >
								<thead >
									<tr >
										<th className="thCheck" > Party </th>
										<th className="thCheck" > Menu </th>
										<th className="thCheck" > Total </th>
										<th className="thCheck" > Check </th>
									</tr>
								</thead>

								<tbody>
									{
										Object.keys(this.state.partyList).map((i) => {
											return (
												<tr className="data-tableCheck"
													key={i} >
													<td style={{ padding: "3%" }} > {parseInt(i) + 1} </td>
													<td className="add" >
														<Link to={`/drinker/order/${this.props.match.params.shopId}/${this.state.partyList[i].party_id}`} style={{ textDecoration: 'none', color: 'white' }}>
															add
												</Link>
													</td>
													<td > {this.state.orderList[i].order_total} </td>
													<td className="true" onClick={this.patchPaidBill.bind(this, i)}> ✔ </td>
												</tr>
											);
										})
									}
								</tbody>
							</table>
							<div style={{ paddingTop: '280px', width: '500px', height: '40px', float: 'left', position: 'relative', left: '50%', transform: 'translateX(-50%)' }}>
								<img className="imageplus"
									src={require("../../asset/icon/plus.png")}
									alt=""
									onClick={this.toggleAddParty}
									width='40' />
							</div>
						</>
					}
					{
						this.state.newParty &&
						<AddTableForm shopId={this.state.managerData.related_shop.shop_id} toggle={this.toggleAddParty} />
					}

				</div>
			);

		else
			return <></>
	}
}
export default CheckTable;