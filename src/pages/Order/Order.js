import React from 'react';
import Navbar from '../../component/Nav-bar/Nav-bar';
import Table from '../../component/Table/Table';
import './Order.css';

class Order extends React.Component {
	render() {
		const data = {
			Food: [
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
			Drink: [
				'cola',
				'Lavender Lemonade',
				'punch',
				'Açai Pome Blue Mojito',
				'Winter Shandy',
				'Shirley Ginger',
				'Tahitian Coffee',
				'Strawberry Fields',
				'Citrus Fizz',
				'Mango Mule',
				'Berry Burlesque',
				'Hot Apple Cider'
			],
			Cart: [
				'cola',
				'Lavender Lemonade',
				'punch',
				'Açai Pome Blue Mojito',
				'Winter Shandy',
				'Shirley Ginger'
			]
		}

		return ( <
			div >
			<
			Navbar / >
			<
			div className = "order-container" >
			<
			div className = "food" > < Table type = 'FOOD'
			data = { data.Food }
			/></div >
			<
			div className = "food" > < Table type = 'DRINK'
			data = { data.Drink }
			/></div >
			<
			div className = "food" >
			<
			Table type = 'CART'
			data = { data.Cart }
			/> <
			br / >
			<
			Table type = 'TABLE'
			tableNum = '3' / >
			<
			br / > < button className = "button" > Order Now < /button> <
			/div> <
			/div> <
			/div>
		);
	}
}
export default Order;




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