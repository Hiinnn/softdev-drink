import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'; 		//className = "table"
import Button from 'react-bootstrap/Button';	//className = "btn"
import './OrderTable.css';

export default class OrderTable extends Component {
	render() {
		return (
			<Table striped bordered responsive="sm" variant="dark" style={{ width: 300 }} id="order-table">
				<thead>
					<tr>
						<th colSpan="2" style={{ textAlign: 'center' }}>{this.props.type}</th>
					</tr>
				</thead>

				<tbody>
					{/* Loop for item in table */}
					{this.props.name.map((name, i) => {
						// console.log('child name'+name)
						return (
							<tr key={i}>
								<td id="menu-name" width="85%">{name}</td>
								<td id="menu-button"><Button variant="info" size="sm" onClick={() => {this.props.addToCart(name)}}>+</Button></td>
							</tr>
						)
					})}
				</tbody>
			</Table>
		)
	}
}