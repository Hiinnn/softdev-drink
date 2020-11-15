import React from 'react';
import Axios from 'axios';
import './ShopOwnerTable.css';
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

class ShopOwnerTable extends React.Component {

	constructor(props) {

		super(props);
		this.state = {
			redirect: null,
			ownerData: null,
		};
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
				this.setState({
					ownerData: res.data
				})
			})
			.catch((err) => {
			})
	}

	createShop() {
		this.setState({
			redirect: `/owner/create`
		})
	}

	redirect(...e) {
		this.setState({
			redirect: `/shop/${e[0]}`
		})
	}

	render() {
		if (this.state.redirect) {
			return <Redirect to={this.state.redirect} />
		}

		if (this.state.ownerData)
			return (
				<div className=" ownerhome-container" >
					<div className="table-wrapper">
						<table className="table-shop-owner" >

							<tbody >
								{
									this.state.ownerData &&
									this.state.ownerData.related_shop.map((shop, i) => {
										return (
											<tr key={i} width='100%' >
												<td width='60%' >
													<img className="imgshop"
														src={`${localStorage.getItem('url')}${shop.pic}`}
														alt={shop.shop_name}
													/>
												</td >
												<td className="nameAddress"
													colSpan='40%' >
													<h1 className="name" onClick={this.redirect.bind(this, shop.shop_id)} > {shop.shop_name} </h1>
												</td>
											</tr>
										)
									})
								}
								<tr className="row justify-content-center">
									<td>
										<Button onClick={this.createShop.bind(this)} style={{ marginTop: 30 }}> Create new shop </Button></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			);
		else
			return <></>
	}
}
export default ShopOwnerTable;