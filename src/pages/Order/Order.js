import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Navbar from '../../component/Nav-bar/Nav-bar';
import OrderTable from '../../component/OrderTable/OrderTable';
import './Order.css';

class Order extends React.Component {

	constructor() {
		super()
		this.data = {
			Food: {
				type: 'FOOD',
				name: [
					'Onion rings',
					'Papaya salad',
					'Lasagne',
					'Porridge with fish',
					'Tom Yum Kung',
					'Crisp fried calamari',
					'Chicken Green Curry',
					'Jelly noodle soup',
					'Apple crumble',
					'Cheesecake',
					'Sausage and mash',
					'Crème brûlée'
				]
			},
			Drink: {
				type: 'DRINK',
				name: [
					'Cola',
					'Lavender Lemonade',
					'Punch',
					'Açai Pome Blue Mojito',
					'Winter Shandy',
					'Shirley Ginger',
					'Tahitian Coffee',
					'Strawberry Field',
					'Citrus Fizz',
					'Mango Mule',
					'Berry Burlesque',
					'Hot Apple Cider'
				]
			}
		}
		this.state = {
			order: null
		}
	}

	cart_addOrder = (name) => {
		console.log('cart add', name)

		if (this.state.order === null) {			// Initial cart order
			this.setState({
				order: [{
					name: name, amount: 1
				}]
			})
		}
		else {
			if (this.state.order.findIndex(i => i.name === name) === -1) {		// Check if order doesn't exist => add order to cart
				this.setState({
					order: this.state.order.concat([{ name: name, amount: 1 }])
				})
			}
		}
	}

	cart_deleteOrder = (name) => {
		let index = this.state.order.findIndex(i => i.name === name)
		let newOrder = [...this.state.order]
		newOrder = [...newOrder.slice(0, index), ...newOrder.slice(index + 1, newOrder.length)]	// Slice order[index] out
		this.setState({
			order: newOrder
		})
	}

	increaseOrder = (name) => {
		let index = this.state.order.findIndex(i => i.name === name)
		let newOrder = [...this.state.order]
		if (newOrder[index].amount > 0) {
			newOrder[index].amount += 1
			this.setState({
				order: newOrder
			})
		}
	}

	decreaseOrder = (name) => {
		let i = this.state.order.findIndex(i => i.name === name)
		let newOrder = [...this.state.order]
		newOrder[i].amount -= 1
		if (newOrder[i].amount <= 0) {
			this.cart_deleteOrder(name)
			return;
		}
		this.setState({
			order: newOrder
		})
	}

	render() {
		return (
			<div >
				<Navbar />
				<div className="order-container">
					<div className="order-table-container">
						{
							Object.keys(this.data).map((item) => {
								console.log(this.data[item].type)
								return (
									<div key={this.data[item].type + " table"} className="order-table">
										<OrderTable type={this.data[item].type} name={this.data[item].name} addToCart={this.cart_addOrder.bind(this)} />
									</div>
								)
							})
						}

						<div className="order-table" style={{ marginRight: '0px' }}>
							<CartTable order={this.state.order} increase={this.increaseOrder.bind(this)} decrease={this.decreaseOrder.bind(this)} />
						</div>
						<br />
						<Button style={{ display: 'block', float: 'right', width: "300px", fontSize: "20px" }} >Order now</Button>
					</div>
				</div>
			</div>
		);
	}
}
export default Order;

class CartTable extends React.Component {
	render() {
		return (
			<Table striped bordered responsive="sm" variant="dark" style={{ width: 300 }} id="order-cart">
				<thead>
					<tr>
						<th colSpan="4" style={{ textAlign: 'center' }}>Your Order</th>
					</tr>
				</thead>
				<tbody>
					{this.props.order && Object.keys(this.props.order).map((name, i) => {
						console.log(this.props.order[name], i)
						return (
							<tr key={'cart' + i}>
								<td width="60%" style={{ borderRight: '0px' }}>
									{this.props.order[name].name}
								</td>
								<td style={{ textAlign: "center", borderLeft: '0px', borderRight: '0px' }}
									width="10%"
									onClick={() => { this.props.decrease(this.props.order[name].name) }}>
									-
								</td>
								<td style={{ textAlign: "center", borderLeft: '0px', borderRight: '0px' }}
									width="10%">
									{this.props.order[name].amount}
								</td>
								<td style={{ textAlign: "center", borderLeft: '0px' }}
									width="10%"
									onClick={() => { this.props.increase(this.props.order[name].name) }}>
									+
								</td>
							</tr>
						)
					})}
				</tbody>
			</Table>
		)
	}
}