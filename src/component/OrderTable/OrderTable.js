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

{/* <table className="tably" >
	<thead className={this.props.type} >
		<tr>
			<th className="col1" >{this.props.type}</th>
			{this.props.tableNum && <th className="col2">{this.props.tableNum}</th>}
			{!this.props.tableNum && <th className="col2">AMOUNT</th>}
		</tr>
	</thead>

	{
		!this.props.tableNum && this.props.data.name.map((data, i) => {
			return (
				<tbody key={'menu' + this.props.type + i}>
					<tr>
						<td className="or" > {data} </td>
						<td className="data" key={this.props.amount[i]}>
							<img onClick={() => this.props.subOrder(i)} className="image" src={require("../../asset/MainBackground/minus.png")} alt="" />
							{this.props.amount[i]}
							<img onClick={() => this.props.addOrder(i)} className="image" src={require("../../asset/MainBackground/plus.png")} alt="" />
						</td>
					</tr>
				</tbody>
			);
		})
	}
</table> */}