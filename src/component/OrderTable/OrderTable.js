import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'; 		//className = "table"
import { Button } from 'react-bootstrap';		//className = "btn"
import './OrderTable.css';
import { orderData } from '../../data/NEW/Order'
import Axios from 'axios';
import { NotifyAlert } from '../SweetAlert';

export default class OrderTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			order: orderData,
			new_goods_name: '',
			new_goods_price: '',
			changed: [],
		};

		this.addAmount = this.addAmount.bind(this);
		this.delAmount = this.delAmount.bind(this);

		this.newOrder = this.newOrder.bind(this);
		this.deleteOrder = this.deleteOrder.bind(this);

		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount = () => {
		this.getOrderData();
	}

	getOrderData = () => {
		const type = this.props.type === 'food' ? 'fd' : 'dk'
		Axios.get(`${localStorage.getItem('url')}/stock/manage/?type=${type}&shop_id=${this.props.shopId}`)
			.then((res) => {
				this.setState({
					order: res.data
				})
			})
			.catch((err) => {
			})
	}

	handleChange = (e) => {
		e.preventDefault();

		const alt = e.target.alt;
		const name = e.target.name;
		let value = e.target.value;
		const order = { ...this.state.order };
		let changed = this.state.changed;

		if (changed.findIndex((val) => val === alt) === -1) {
			changed.push(alt)
		}

		switch (name) {
			case "goods_name":
				order[alt][name] = value;
				break;
			case "goods_price":
				value = parseFloat(value);
				value = value.toFixed(2);
				if (value === 'NaN') value = 0.00.toFixed(2);
				order[alt][name] = value;
				break;
			case "new_goods_price":
				value = parseFloat(value);
				value = value.toFixed(2);
				if (value === 'NaN') value = 0.00.toFixed(2);
				this.setState({ [name]: value })
				return;
			default:
				this.setState({
					[name]: value
				})
				return;
		}
		this.setState({
			order: order,
			changed: changed
		})
	}

	newOrder = () => {
		let oldOrder = { ...this.state.order }
		let newOrder = []

		if (this.state.new_goods_name && this.state.new_goods_price > 0) {
			Object.keys(oldOrder).map((key) => {
				newOrder.push(oldOrder[key])
			})
			newOrder.push({
				shop_id: this.props.shopId,
				goods_name: this.state.new_goods_name,
				goods_price: this.state.new_goods_price,
				left: 0,
				type: this.props.type === 'food' ? 'fd' : 'dk'
			})

			this.postRequestNewOrder(this.props.shopId, this.state.new_goods_name, this.state.new_goods_price, this.props.type === 'food' ? 'fd' : 'dk', newOrder)
		}
	}

	postRequestNewOrder(id, name, price, type, order) {
		const body = {
			shop_id: id,
			goods_name: name,
			goods_price: price,
			left: 0,
			type: type
		}

		const header = {
			Authorization: `Bearer ${localStorage.getItem('access')}`
		}

		Axios.post(`${localStorage.getItem('url')}/stock/manage/`, body, { headers: header })
			.then((res) => {
				this.setState({
					order: order,
					new_goods_name: '',
					new_goods_price: '',
				})
			})
			.catch((err) => {
				this.setState({
					new_goods_name: 'The name must be unique.'
				})
			})

	}

	deleteOrder = (e) => {
		const index = parseInt(e.target.name)
		const pk = this.state.order[index].pk
		let newOrder = this.state.order;
		newOrder = [...newOrder.slice(0, index), ...newOrder.slice(index + 1)]

		this.delRequestOrder(this.props.shopId, pk, newOrder)
	}

	delRequestOrder = (shopId, pk, order) => {
		const data = {
			shop_id: shopId
		}
		const headers = {
			Authorization: `Bearer ${localStorage.getItem('access')}`
		}

		Axios.delete(`${localStorage.getItem('url')}/stock/manage/${pk}/`, { data, headers })
			.then((res) => {
				this.setState({
					order: order
				})
			})
			.catch((err) => {
				console.log('del err', err.response);
			})
	}

	editMenu = (e) => {
		const index = parseInt(e.target.alt)
		const pk = this.state.order[index].pk
		const url = `${localStorage.getItem('url')}/stock/manage/${pk}/`
		const data = {
			shop_id: this.props.shopId,
			[e.target.name]: e.target.value
		}
		const header = {
			Authorization: `Bearer ${localStorage.getItem('access')}`
		}

		Axios.patch(url, data, { headers: header })
			.then((res) => {
			})
			.catch((err) => {
				console.log('edit err', err.response);
			})
	}

	addAmount = (e) => {
		const index = e.target.name;
		const pk = this.state.order[index].pk
		let newOrder = { ...this.state.order };
		newOrder[index].left += 1;

		this.patchAmountOrderRequest(this.props.shopId, pk, newOrder[index].left)

		this.setState({
			order: newOrder
		})
	}

	delAmount = (e) => {
		const index = e.target.name;
		const pk = this.state.order[index].pk
		let newOrder = { ...this.state.order };

		if (newOrder[index].left > 0) {
			newOrder[index].left -= 1;
			this.patchAmountOrderRequest(this.props.shopId, pk, newOrder[index].left)

			this.setState({
				order: newOrder
			})
		}
	}

	patchAmountOrderRequest = (shopId, pk, left) => {
		const data = {
			shop_id: shopId,
			left: left,
		}
		const header = {
			Authorization: `Bearer ${localStorage.getItem('access')}`
		}

		Axios.patch(`${localStorage.getItem('url')}/stock/manage/${pk}/`, data, { headers: header })
			.then((res) => {
			})
			.catch((err) => {
				console.log('patch err', err.response);
			})
	}

	render() {
		if ((localStorage.getItem('role') === 'dk' || localStorage.getItem('role') === null) && !(Array.isArray(this.state.order) && this.state.order.length))
			return (<> </>)
		else
			return (
				<Table striped bordered responsive="sm" variant="dark" style={{ width: 400 }} id="order-table">
					<thead>
						<tr>
							<th style={{ textAlign: 'center', borderRight: '0px', fontSize: 20 }}>{this.props.type.toUpperCase()}</th>
						</tr>
					</thead>

					{
						(this.state.order[this.props.type] !== null) &&
						< tbody style={{ maxHeight: this.props.maxHeight }}>
							{	// Loop create item in table
								Object.keys(this.state.order).map((index) => {
									return (
										<tr key={index}>
											{
												this.props.addToCart
													? //show add to cart button (use in user order)
													<>
														<td className="menu-name" width="85%">
															{this.state.order[index].goods_name}
															<br />
															<div id="menu-price"> {this.state.order[index].goods_price} ฿</div>
														</td>
														<td className="menu-button" width="15%">
															<Button variant="info"
																size="sm"
																onClick={() => { this.props.addToCart(this.props.type, index) }}
																block>
																+
														</Button>
														</td>
													</>
													:
													this.props.disableBt === true // branch detail page
														?	// show only menu (user view branch)
														<>
															<td id="menu-name" width="85%">
																{this.state.order[index].goods_name}
																<br />
															</td>
															<td>
																<div id="menu-price">{this.state.order[index].goods_price} ฿</div>
															</td>
														</>
														:	// can delet menu when role == owner, manager
														this.props.role === 'sm'
															?	// shop manager view branch
															<>
																<td className="menu-name"
																	width="66%"
																	style={{ borderWidth: '1px 0px 1px 1px' }}>
																	{this.state.order[index].goods_name}
																	<br />
																	<div id="menu-price"> {this.state.order[index].goods_price} ฿</div>
																</td>

																<td className="menu-button"
																	width="12%"
																	style={{ borderWidth: '1px 0px 1px 0px' }}>
																	<Button variant="info"
																		size="sm"
																		name={index}
																		onClick={this.delAmount}>
																		-
																</Button>
																</td>

																<td className="menu-button"
																	width="10%"
																	style={{ borderWidth: '1px 0px 1px 0px', textAlign: 'center' }}>
																	{this.state.order[index].left}
																</td>

																<td className="menu-button"
																	width="12%"
																	style={{ borderWidth: '1px 1px 1px 0px' }}>
																	<Button variant="info"
																		size="sm"
																		name={index}
																		onClick={this.addAmount}>
																		+
																</Button>
																</td>
															</>
															:
															this.props.role === 'ow'
																?	// owner view branch
																<>
																	<td width="60%"
																		style={{ borderWidth: '1px 0px 1px 1px' }}>
																		<input className="menu-name"
																			name="goods_name"
																			alt={index}
																			step="0.1"
																			onChange={this.handleChange}
																			value={this.state.order[index].goods_name}
																			style={{ textAlign: "left", width: "100%" }}
																			onKeyPress={event => {
																				if (event.key === 'Enter') this.editMenu(event);
																			}} />
																	</td>

																	<td className="menu-button"
																		width="25%"
																		style={{ borderWidth: '1px 0px 1px 0px' }}>
																		<input className="menu-price"
																			name="goods_price"
																			alt={index}
																			step="0.1"
																			onChange={this.handleChange}
																			value={this.state.order[index].goods_price}
																			style={{ textAlign: "right", width: "100%" }}
																			onKeyPress={event => {
																				if (event.key === 'Enter') this.editMenu(event);
																			}} />
																	</td>

																	<td className="menu-button"
																		width="13%"
																		style={{ borderWidth: '1px 1px 1px 0px' }}>
																		<Button variant="info"
																			size="sm"
																			name={index}
																			onClick={this.deleteOrder}>
																			-
																	</Button>
																	</td>
																</>
																:	// user view branch
																<>
																	<td className="menu-name"
																		width="75%"
																		style={{ borderWidth: '1px 0px 1px 1px' }}>
																		{this.state.order[index].goods_name}
																		<br />
																	</td>
																	<td className="menu-button"
																		width="25%"
																		style={{ borderWidth: '1px 1px 1px 0px' }}>
																		<div className="menu-price" style={{ textAlign: "right" }}> {this.state.order[index].goods_price} ฿</div>
																	</td>
																</>
											}
										</tr>
									)
								})
							}


							{
								this.props.role === 'ow' &&
								<tr>
									<td width="60%"
										style={{ borderWidth: '1px 0px 1px 0px' }}>
										<input
											name="new_goods_name"
											style={{ width: '100%', verticalAlign: 'middle', textAlign: 'left' }}
											value={this.state.new_goods_name}
											placeholder="Name"
											onChange={this.handleChange}
										/>
									</td>

									<td width="25%"
										style={{ borderWidth: '1px 0px 1px 0px' }}>
										<input
											name="new_goods_price"
											style={{ width: '100%', verticalAlign: 'middle', textAlign: 'right' }}
											value={this.state.new_goods_price}
											placeholder="Price"
											onChange={this.handleChange}
										/>
									</td>

									<td
										className="menu-button"
										width="13%"
										style={{ borderWidth: '1px 1px 1px 0px' }}>
										<Button variant="info" size="sm" onClick={this.newOrder}>
											+
										</Button>
									</td>
								</tr>
							}
						</tbody>
					}
				</Table>
			)
	}
}

OrderTable.defaultProps = {
	addToCart: false,
	width: 400,
	maxHeight: 300,
}

const officeDay = [
	{
		weekday: 0,
		open_time: 'hr:min',
		close_time: 'hr:min',
	},
	{
		weekday: 1,
		open_time: 'hr:min',
		close_time: 'hr:min',
	},
	{
		weekday: 2,
		open_time: 'hr:min',
		close_time: 'hr:min',
	},
	{
		weekday: 3,
		open_time: 'hr:min',
		close_time: 'hr:min',
	},
	{
		weekday: 4,
		open_time: 'hr:min',
		close_time: 'hr:min',
	},
	{
		weekday: 5,
		open_time: 'hr:min',
		close_time: 'hr:min',
	},
	{
		weekday: 6,
		open_time: 'hr:min',
		close_time: 'hr:min',
	},
]