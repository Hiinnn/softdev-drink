import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'; 		//className = "table"
import Button from 'react-bootstrap/Button';	//className = "btn"
import './OrderTable.css';

export default class OrderTable extends Component {
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
											? //show buuton
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
											: //dont show button
											<>
												<td id="menu-name" colSpan="80%" style={{height:'70px', verticalAlign: 'middle'}}>{name[0]}</td>
												<td id="menu-price" colSpan="20%" style={{verticalAlign: 'middle'}}> {name[1]} ฿</td>
											</>
									}
								</tr>)
						})}
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