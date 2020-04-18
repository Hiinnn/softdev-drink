import React, { Component } from 'react';
import './ShopOwnerTable.css';
import { shops } from '../../data/ShopOwnerData.js';

class ShopOwnerTable extends Component {

	render() {
		return ( <
			div className = " ownerhome-container" >
			<
			table className = "table-shop-owner" > {
				shops.map((shop) => {
					return ( <
						tr >
						<
						td > < img className = "imgshop"
						src = { shop.url }
						alt = { shop.name }
						/></td >
						<
						td className = "nameAddress" >
						<
						h4 className = "name" > { shop.name } < /h4> <
						p className = "address" > { shop.details } < /p> <
						/td> <
						/tr>
					)
				})
			} <
			/table> <
			/div>
		);
	}



}
export default ShopOwnerTable;