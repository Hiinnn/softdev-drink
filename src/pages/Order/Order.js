import React from 'react';
import Table from 'react-bootstrap/Table';
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
		console.log('function', name)
		
		if (this.state.order === null) {
			this.setState({
				order: [{ 
					name: name, amount: 0 }]
			})
		}
		// console.log('state', this.state)
		else {
			if (this.state.order.indexOf({ name: name, amount: 0 }) !== -1) {
				// console.log
				this.setState({
					order: this.state.order.concat([{ name: name, amount: 0 }])
				})
			}
		}
	}

	increaseOrder = () => {
	}

	decreaseOrder = () => {

	}

	render() {
		return (
			<div >
				<Navbar />
				<div className="order-container" >
					{
						Object.keys(this.data).map((item) => {
							console.log(this.data[item].type)
							return (
								<div key={this.data[item].type + " table"} className="table-conatiner">
									<OrderTable type={this.data[item].type} name={this.data[item].name} addToCart={this.cart_addOrder.bind(this)} />
								</div>
							)
						})
					}

					<div className="table-conatiner"> \
						<CartTable order={this.state.order} />
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
							<tr>
								<td width="60%" style={{ borderRight: '0px' }}>{this.props.order[name].name}</td>
								<td style={{ textAlign: "center", borderLeft: '0px', borderRight: '0px' }} width="10%"> - </td>
								<td style={{ textAlign: "center", borderLeft: '0px', borderRight: '0px' }} width="10%"> {this.props.order[name].amount} </td>
								<td style={{ textAlign: "center", borderLeft: '0px' }} width="10%"> + </td>
							</tr>
						)
					})}
				</tbody>
			</Table>
		)
	}
}


//  <div className="food"> <OrderTable type={this.data.Food.type} data={this.data.Food} amount={this.state.amount} subOrder={this.subOrder.bind(this)} addOrder={this.addOrder.bind(this)} /></div>
// 					<div className="food"> <OrderTable type='DRINK' data={this.data.Drink} amount={this.state.amount} subOrder={this.subOrder.bind(this)} addOrder={this.addOrder.bind(this)} /></div>
// 					<div className="food">
// 						<OrderTable type='CART' data={this.data.Cart} amount={this.state.amount} />
// 						<br />
// 						<OrderTable type='TABLE' tableNum='3' />
// 						<br />
// 						<button className="order-button"> Order Now </button>
// 					</div> 

// const data = {
// 	Food: [
// 		{ name: 'Onion rings', amount: 0 },
// 		{ name: 'Papaya salad', amount: 0 },
// 		{ name: 'lasagne', amount: 0 },
// 		{ name: 'Porridge with fish', amount: 0 },
// 		{ name: 'Tom Yum Kung', amount: 0 },
// 		{ name: 'Crisp fried calamari', amount: 0 },
// 		{ name: 'Chicken Green Curry', amount: 0 },
// 		{ name: 'Jelly noodle soup', amount: 0 },
// 		{ name: 'Apple crumble', amount: 0 },
// 		{ name: 'Cheesecake', amount: 0 },
// 		{ name: 'Sausage and mash', amount: 0 },
// 		{ name: 'Crème brûlée', amount: 0 }
// 	],
// 	Drink: [
// 		{ name: 'cola', amount: 0 },
// 		{ name: 'Lavender Lemonade', amount: 0 },
// 		{ name: 'punch', amount: 0 },
// 		{ name: 'Açai Pome Blue Mojito', amount: 0 },
// 		{ name: 'Winter Shandy', amount: 0 },
// 		{ name: 'Shirley Ginger', amount: 0 },
// 		{ name: 'Tahitian Coffee', amount: 0 },
// 		{ name: 'Strawberry Fields', amount: 0 },
// 		{ name: 'Citrus Fizz', amount: 0 },
// 		{ name: 'Mango Mule', amount: 0 },
// 		{ name: 'Berry Burlesque', amount: 0 },
// 		{ name: 'Hot Apple Cider', amount: 0 }
// 	],
// 	Cart: [
// 		{ name: 'cola', amount: 0 },
// 		{ name: 'Lavender Lemonade', amount: 0 },
// 		{ name: 'punch', amount: 0 },
// 		{ name: 'Açai Pome Blue Mojito', amount: 0 },
// 		{ name: 'Winter Shandy', amount: 0 },
// 		{ name: 'Shirley Ginger', amount: 0 }
// 	]
// }


{
	/* <div className="order-container" >
		<div className="food" > < Table type='FOOD'
			data1='Onion rings'
			data2='Papaya salad'
			data3='lasagne'
			data4='Porridge with fish'
			data5='Tom Yum Kung'
			data6='Crisp fried calamari'
			data7='Chicken Green Curry'
			data8='Jelly noodle soup'
			data9='Apple crumble'
			data10='Cheesecake'
			data11='Sausage and mash'
			data12='Crème brûlée' />
		</div>
		<div className="food" > < Table type='DRINK'
			data1='cola'
			data2='Lavender Lemonade'
			data3='punch'
			data4='Açai Pome Blue Mojito'
			data5='Winter Shandy'
			data6='Shirley Ginger'
			data7='Tahitian Coffee'
			data8='Strawberry Fields'
			data9='Citrus Fizz'
			data10='Mango Mule'
			data11='Berry Burlesque'
			data12='Hot Apple Cider' />
		</div>
		<div className="food" >
			<Table type='CART'
				data1='cola'
				data2='Lavender Lemonade'
				data3='punch'
				data4='Açai Pome Blue Mojito'
				data5='Winter Shandy'
				data6='Shirley Ginger' />
			<br />
			<Table type='TABLE' tableNum='3' />
			<br /> <button class="button"> Order Now </button>
		</div>
	</div> */
}