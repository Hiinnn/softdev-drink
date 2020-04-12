import React, { Component } from 'react';
import './ShopOwnerTable.css';
import { shops } from '../../data/ShopOwnerData.js';

class ShopOwnerTable extends Component {

	render() {
		return ( <
			div >
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
						td > { shop.name } < br / > { shop.details } < /td> <
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