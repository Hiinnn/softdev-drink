import React, { Component } from 'react';
import './Result.css';
import Axios from 'axios';
import { Redirect, Link } from 'react-router-dom';



class Result extends Component {
	constructor(props) {
		super(props);
		this.state = {
			shopData: '',
		}
	}

	getData = () => {
		const key = localStorage.getItem('searchKey')
		const url = localStorage.getItem('url')
		const token = localStorage.getItem('access')

		localStorage.removeItem('searchKey')

		Axios.get(`${url}/manager/shop/?search=${key}`,
			{
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			.then((res) => {
				this.setState({ shopData: res.data })
			})
			.catch((err) => {
				console.log('search did mount err', err)
			})
	}

	componentDidMount = () => {
		this.getData()
	}

	componentDidUpdate = () => {
		if (localStorage.getItem('searchKey')) this.getData()
	}

	toggleLike = (i) => {
		const newShopData = { ...this.state.shopData }
		newShopData[i].is_fav.is_fav = !this.state.shopData[i].is_fav.is_fav
		this.setState({
			shopData: newShopData
		}, () => {
			const url = localStorage.getItem('url')
			const token = localStorage.getItem('access')

			if (this.state.shopData[i].is_fav.is_fav) {
				Axios.post(`${url}/user/profile/favorite_shop/`,
					{ shop_id: this.state.shopData[i].shop_id },
					{
						headers: {
							Authorization: `Bearer ${token}`
						}
					})
					.then((response) => {
					})
					.catch((err) => {
						console.log('like post err', err);
					})
			}
			else {
				Axios.delete(`${url}/user/profile/favorite_shop/${this.state.shopData[i].is_fav.is_fav}`,
					{
						headers: {
							Authorization: `Bearer ${token}`
						}
					})
					.then((response) => {
					})
					.catch((err) => {
						console.log('like del err', err.response);
					})
			}
		})
	}

	render() {
		
		return (
			<div className="main-container" >
				<div className="result-container" >
					<h5 style={{ marginBottom: "10px" }}> Result </h5> {
						Object.keys(this.state.shopData).map((i) => {
							return (
								<div key={i}>
									<div className="left-container" >
										<img className="imgShop"
											src={`${localStorage.getItem('url')}${this.state.shopData[i].picture}`}
											alt={this.state.shopData[i].shop_name}
											align="left" />
									</div>


									<div className="right-container" >
										<div style={{ display: "block", width: "315px", float: "left", fontSize: "18px", marginTop: "10px" }}>
											{this.state.shopData[i].shop_name}
										</div>


										<div style={{ height: "50px" }}>
											{
												localStorage.getItem('role') === 'dk' &&
												<img src={this.state.shopData[i].is_fav.is_fav ? require("../../asset/icon/heart2.png") : require("../../asset/icon/heart.png")}
													onClick={() => this.toggleLike(i)}
													alt="heart"
													style={{ width: "35px", height: "35px", float: "left", marginTop: "5px", cursor: "pointer" }} />
											}
										</div >

										<div style={{ display: "block", width: "340px", wordWrap: "break-word", height: "90px", paddingTop: "10px", fontSize: "12px" }}>
											{this.state.shopData[i].detail}
										</div>
										<div className="detailShop"
											style={{ paddingTop: "20px" }}>
											{/* open - close:  */}
										</div>
										<div className="detailShop" > location: {this.state.shopData[i].address} </div>
										{/* < div className = "detailShop" > type: { this.state.shopData[i].type } </div > */}
										<div className="detailShop" > contact: {this.state.shopData[i].phone_number.replace('+66', 0)} </div>
										<Link
											to={{
												pathname: `/shop/${this.state.shopData[i].shop_id}`,
											}}>
											<div className="learnBox"> LEARN MORE </div>
										</Link>

										{
											// <BookingTime sm={true} />
											// <div style={
											// 	{ maxHeight: '240px', overflow: 'auto' }} > {
											// 		Object.keys(partyData).map((i) => {
											// 			return (< PartyList partyData={partyData[i]}
											// 				key={i}
											// 				sm={true}
											// 			/>)
											// 		})}
											// </div> 
										}

									</div>
									<hr className="hrcss"
										style={{ height: "280px" }}
									/>
								</div >
							)
						})
					} <hr className="hrcss" />
				</div>
			</div >
		);
	}
}
export default Result;