import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'; 		//className = "table"
import { Button } from 'react-bootstrap';		//className = "btn"
import './OrderTable.css';
import { orderData } from '../../data/NEW/Order'

export default class OrderTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			new_goods_type: 'food',
			new_goods_name: '',
			new_goods_price: '',
			order: orderData
		};

		this.addAmount = this.addAmount.bind(this);
		this.delAmount = this.delAmount.bind(this);

		this.newOrder = this.newOrder.bind(this);
		this.deleteOrder = this.deleteOrder.bind(this);

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange = (e) => {
		e.preventDefault();

		const alt = e.target.alt;
		const name = e.target.name;
		let value = e.target.value;
		const order = { ...this.state.order };

		switch (name) {
			case "goods_name":
				order[this.props.type][alt][name] = value;
				break;
			case "goods_price":
				value = parseFloat(value);
				value = value.toFixed(2);
				if (value === 'NaN') value = 0.00.toFixed(2);
				order[this.props.type][alt][name] = value;
				break;
			case "new_goods_type":
				value = value.toLowerCase()
			default:
				this.setState({
					[name]: value
				})
				return;
		}


		this.setState({
			order: order
		})

	}

	newOrder = () => {
		// add new order to back-end
		// then get data again

		// this.state.new_goods_type
		// this.state.new_goods_name
		// this.state.new_goods_price
	}

	deleteOrder = (e) => {
		const index = parseInt(e.target.name);
		let newOrder = { ...this.state.order };

		newOrder[this.props.type] = [...newOrder[this.props.type].slice(0, index), ...newOrder[this.props.type].slice(index + 1)]	// Slice order[index] out

		this.setState({
			order: newOrder
		})
	}

	addAmount = (e) => {
		const index = e.target.name;
		let newOrder = { ...this.state.order };

		newOrder[this.props.type][index].left += 1;

		this.setState({
			order: newOrder
		})
	}

	delAmount = (e) => {
		const index = e.target.name;
		let newOrder = { ...this.state.order };

		if (newOrder[this.props.type][index].left > 0) {
			newOrder[this.props.type][index].left -= 1;

			this.setState({
				order: newOrder
			})
		}
	}

	render() {
		return (
			<Table striped bordered responsive="sm" variant="dark" style={{ width: 400 }} id="order-table">
				<thead>
					<tr>
						<th style={{ textAlign: 'center', borderRight: '0px', fontSize: 20 }}>{this.props.type.toUpperCase()}</th>
						{/* <th colSpan={thCol3} style={{ textAlign: 'center', borderLeft: '0px', paddingLeft: '0px', paddingRight: '0px' }}>Amount</th> */}
					</tr>
				</thead>

				{

					(this.state.order[this.props.type] !== null) &&
					< tbody style={{ maxHeight: this.props.maxHeight }}>
						{	// Loop create item in table
							this.state.order[this.props.type].map((data, i) => {
								return (
									<tr key={i}>
										{
											this.props.addToCart
												? //show add to cart button (use in user order)
												<>
													<td className="menu-name" width="85%">
														{data.goods_name}
														<br />
														<div id="menu-price"> {data.goods_price} ฿</div>
													</td>
													<td className="menu-button" width="15%">
														<Button variant="info"
															size="sm"
															onClick={() => { this.props.addToCart() }}
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
															{data.goods_name}
															<br />
														</td>
														<td>
															<div id="menu-price">{data.goods_price} ฿</div>
														</td>
													</>
													:	// can delet menu when role == owner, manager
													this.props.role === 'sm'
														?	// shop manager view branch
														<>
															<td className="menu-name"
																width="66%"
																style={{ borderWidth: '1px 0px 1px 1px' }}>
																{data.goods_name}
																<br />
																<div id="menu-price"> {data.goods_price} ฿</div>
															</td>

															<td className="menu-button"
																width="12%"
																style={{ borderWidth: '1px 0px 1px 0px' }}>
																<Button variant="info"
																	size="sm"
																	name={i}
																	onClick={this.delAmount}>
																	-
																</Button>
															</td>

															<td className="menu-button"
																width="10%"
																style={{ borderWidth: '1px 0px 1px 0px', textAlign: 'center' }}>
																{data.left}
															</td>

															<td className="menu-button"
																width="12%"
																style={{ borderWidth: '1px 1px 1px 0px' }}>
																<Button variant="info"
																	size="sm"
																	name={i}
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
																		alt={i}
																		step="0.1"
																		disabled={!this.props.edit}
																		onChange={this.handleChange}
																		value={data.goods_name}
																		style={{ textAlign: "left", width: "100%" }} />
																	<div className="menu-price" name="goods_name"> {data.goods_price} ฿</div>
																</td>

																<td className="menu-button"
																	width="25%"
																	style={{ borderWidth: '1px 0px 1px 0px' }}>
																	<input className="menu-price"
																		name="goods_price"
																		alt={i}
																		step="0.1"
																		disabled={!this.props.edit}
																		onChange={this.handleChange}
																		value={data.goods_price}
																		style={{ textAlign: "right", width: "100%" }}
																	/>
																</td>

																<td className="menu-button"
																	width="13%"
																	style={{ borderWidth: '1px 1px 1px 0px' }}>
																	<Button variant="info"
																		size="sm"
																		name={i}
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
																	{data.goods_name}
																	<br />
																</td>
																<td className="menu-button"
																	width="25%"
																	style={{ borderWidth: '1px 1px 1px 0px' }}>
																	<div className="menu-price" style={{ textAlign: "right" }}> {data.goods_price} ฿</div>
																</td>
															</>
										}
									</tr>)
							})}
						{
							this.props.role === 'ow' &&
							<tr>
								<td width="25%"
									style={{ borderWidth: '1px 0px 1px 1px' }}>
									<select className="custom-select my-1 mr-sm-2 form-control-lg"
										id="inlineFormCustomSelectPref"
										name="new_goods_type"
										style={{ margin: '0px' }}
										disabled={!this.props.edit}
										onChange={this.handleChange}>
										<option>Food</option>
										<option>Drink</option>
									</select>
								</td>

								<td width="52%"
									style={{ borderWidth: '1px 0px 1px 0px' }}>
									<input
										name="new_goods_name"
										style={{ width: '100%', verticalAlign: 'middle', marginBottom: 10 }}
										disabled={!this.props.edit}
										value={this.state.new_goods_name}
										placeholder="Name"
										onChange={this.handleChange}
									/>
									<input
										name="new_goods_price"
										style={{ width: '100%', verticalAlign: 'middle' }}
										disabled={!this.props.edit}
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