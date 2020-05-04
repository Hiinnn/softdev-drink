import React, { Component } from 'react';
import './ShopOwnerTable.css';
//import { shops } from '../../data/ShopOwnerData.js';
import ownerData from '../../data/NEW/Owner';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';

class ShopOwnerTable extends Component {

	constructor(props) {

		super(props);
		this.state = {
			redirect: null,
			ownerData: ownerData
		};

		// this.redirect = this.redirect.bind(this)
	}

	componentDidMount() {
		this.getOwnerData()
	}

	getOwnerData() {
		const url = `${localStorage.getItem('url')}/owner/profile/my_profile/`
		// const body = {}
		const head = {
			Authorization: `Bearer ${localStorage.getItem('access')}`
		}
		Axios.get(url, { headers: head })
			.then((res) => {
				this.setState({
					ownerData: res.data
				})
			})
			.catch((err) => {
				console.log(err.response);
			})
	}

	redirect(...e) {
		console.log(e[0])
		this.setState({
			redirect: `/shop/${e[0]}`
		})
	}

	render() {
		if (this.state.redirect) {
			return <Redirect to={this.state.redirect} />
		}

		return (
			<div className=" ownerhome-container" >
				<table className="table-shop-owner">
					<tbody>
						{
							this.state.ownerData.related_shop.map((shop, i) => {
								return (
									<tr key={i} >
										<td >
											<img className="imgshop"
												src={shop.shop_picture}
												alt={shop.shop_name}
											/>
										</td >
										<td className="nameAddress" >
											<h4 className="name" onClick={this.redirect.bind(this, shop.shop_id)}> {shop.shop_name} </h4>
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
