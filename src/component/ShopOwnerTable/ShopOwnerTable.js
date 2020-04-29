import React, { Component } from 'react';
import './ShopOwnerTable.css';
//import { shops } from '../../data/ShopOwnerData.js';
import ownerData from '../../data/NEW/Owner';

class ShopOwnerTable extends Component {

	constructor(props) {

		super(props);

		this.ownerData = ownerData;

		this.state = {
			ownerData: ownerData
		};

	}

	render() {
		return (
			<div className=" ownerhome-container" >
				<table className="table-shop-owner">
					<tbody>

						{
							this.state.ownerData.related_shop.map((shop, i) => {
								return (
									<tr key={i}>
										<td > < img className="imgshop"
											src={shop.shop_picture}
											alt={shop.name}
										/>
										</td >
										<td className="nameAddress" >
											<h4 className="name"> {shop.shop_name} </h4>
											<p className="address"> {shop.shop_address} </p>
										</td>
									</tr>
								)
							})
						}
					</tbody>
				</table>
			</div>
		);
	}
}
export default ShopOwnerTable;
