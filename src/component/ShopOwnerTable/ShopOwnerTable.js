import React, { Component } from 'react';
import './ShopOwnerTable.css';
//import { shops } from '../../data/ShopOwnerData.js';
import ownerData from '../../data/NEW/Owner';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';

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
		const head = {
			Authorization: `Bearer ${localStorage.getItem('access')}`
		}
		Axios.get(url, { headers: head })
			.then((res) => {
				console.log('resss', res.data);

				this.setState({
					ownerData: res.data
				})
			})
			.catch((err) => {
				console.log(err.response);
			})
	}

	createShop() {
		this.setState({
			redirect: `/owner/create`
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

		const tempPic = 'https://image.freepik.com/free-photo/minimalist-background-with-green-leaves-white_23-2147752433.jpg';

		return (
			<div className=" ownerhome-container" >
				<table className="table-shop-owner">
					<tbody>
						{
							this.state.ownerData.related_shop.map((shop, i) => {
								return (
									<tr key={i} width='100%'>
										<td width='60%'>
											<img className="imgshop"
												src={shop.pic === '/media/black.jpg' ? tempPic : `${localStorage.getItem('url')}${shop.pic}`}
												alt={shop.shop_name}
											/>
										</td >
										<td className="nameAddress" colSpan='40%'>
											<h4 className="name" onClick={this.redirect.bind(this, shop.shop_id)}> {shop.shop_name} </h4>
										</td>
									</tr>
								)
							})
						}
						<tr width='100%'>
							<td width='60%'></td>
							<td width='40%'>
								<Button onClick={this.createShop.bind(this)}> Create new shop</Button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}
export default ShopOwnerTable;
