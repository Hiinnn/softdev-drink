import React from 'react';
import Navbar from '../../component/Nav-bar/Nav-bar';
import Table from '../../component/Table/Table';
import './Order.css';

class Order extends React.Component {

	constructor() {
		super()
		this.data = {
			Food: {
				name: [
					'Onion rings',
					'Papaya salad',
					'lasagne',
					'Porridge with fish',
					'Tom Yum Kung',
					'Crisp fried calamari',
					'Chicken Green Curry',
					'Jelly noodle soup',
					'Apple crumble',
					'Cheesecake',
					'Sausage and mash',
					'Crème brûlée'
				],
				amount: [
					0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
				],
				type: 'FOOD'
			},
			Drink: {
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
				],
				amount: [
					0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
				],
				type: 'DRINK'
			}
		}
		this.state = [[...this.data.Food.amount], [...this.data.Drink.amount]]
		console.log(this.state)
	}

	addOrder = (i) => {
		this.setState({
			
		})
	}

	render() {

		return (

			<div >
				<Navbar />
				<div className="order-container" >
					<div className="food" > < Table type={this.data.Food.type} data={this.data.Food} addHandle={this.addOrder.bind(this)} /></div >
					{/* <div className="food" > < Table type='DRINK' data={data.Drink}/></div > */}
					{/* <div className="food" >
						<Table type='CART' data={data.Cart} />
						<br />
						<Table type='TABLE' tableNum='3' />
						<br />
						<button className="button"> Order Now </button>
					</div> */}
				</div>
			</div>
		);
	}
}
export default Order;


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