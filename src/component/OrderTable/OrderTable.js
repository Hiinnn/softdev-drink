import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'; 		//className = "table"
import { Button, Dropdown } from 'react-bootstrap';		//className = "btn"
import './OrderTable.css';

export default class OrderTable extends Component {
	constructor(props) {
		super(props);
		this.state = {

		};
		console.log();
		this.newOrder = this.newOrder.bind(this);
		this.deleteOrder = this.deleteOrder.bind(this);
	}

	newOrder() {

	}

	deleteOrder() {

	}

	render() {
		return (
			<Table striped bordered responsive="sm" variant="dark" style={{ width: 400 }} id="order-table">
				<thead>
					<tr>
						<th style={{ textAlign: 'center', borderRight: '0px' }}>{this.props.type}</th>
						{/* <th colSpan={thCol3} style={{ textAlign: 'center', borderLeft: '0px', paddingLeft: '0px', paddingRight: '0px' }}>Amount</th> */}
					</tr>
				</thead>

				<tbody style={{ maxHeight: this.props.maxHeight }}>
					{	// Loop create item in table
						this.props.name.map((name, i) => {
							return (
								<tr key={i}>
									{
										this.props.addToCart
											? //show add to cart button
											<>
												<td id="menu-name" width="85%">
													{name[0]}
													<br />
													<div id="menu-price"> {name[1]} ฿</div>
												</td>
												<td id="menu-button" width="15%">
													<Button variant="info" size="sm" onClick={() => { this.props.addToCart(name) }} block>
														+
													</Button>
												</td>
											</>
											:
											this.props.disableBt === true // branch detail page
												?	// show only menu (user)
												<>
													<td id="menu-name" width="85%">
														{name[0]}
														<br />
													</td>
													<td>
														<div id="menu-price">{name[1]} ฿</div>
													</td>
												</>
												:	// can delet menu when role == owner, manager
												<>
													<td id="menu-name" width="85%">
														{name[0]}
														<br />
														<div id="menu-price"> {name[1]} ฿</div>
													</td>
													<td id="menu-button" width="15%">
														<Button variant="info" size="sm" onClick={this.deleteOrder}>
															-
													</Button>
													</td>
												</>
									}
								</tr>)
						})}
					<tr>
						<td  width="25%">
							<div className="" style={{ alignItems: "center", alignContent: "center" }}>
								<select className="custom-select my-1 mr-sm-2 form-control-lg"
									id="inlineFormCustomSelectPref"
									style={{ margin: '0px' }}>
									<option>Food</option>
									<option>Drink</option>
								}
							</select>
							</div>
						</td>
						<td width="50%" style={{ alignItems: "center", alignContent: "center" }}>
							<input style={{width:'100%'}}></input>
						</td>
						<td id="menu-button" width="15%">
							<Button variant="info" size="sm" onClick={this.deleteOrder}>
								+
							</Button>
						</td>
					</tr>
				</tbody>
			</Table>
		)
	}
}

OrderTable.defaultProps = {
	addToCart: false,
	width: 400,
	maxHeight: 300,
	// maxHeight: 'none',
}