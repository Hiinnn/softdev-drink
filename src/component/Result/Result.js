import React, { Component } from 'react';
import './Result.css';
import { Results } from '../../data/ResultData';
// import BookingTime from '../Party/BookingTime';
import PartyList from '../Party/Party';
import ShopDataArray from '../../data/NEW/ShopDataArray';



class Result extends Component {
	constructor(props) {
		super(props);
		this.state = {
			shopData: ShopDataArray
		}
	}

	getTime = () => {
		const date = new Date()
		this.state.shopData.map((i) => {

			// console.log(this.state.shopData[i].officeday.forEach(work => work.weekday === date.getDay()));
		})
	}

	createLike = () => {
		// let temp = []
		// for (let i = 0; i < shopData.length; i++) {
		// 	temp.push(shopData[i].like)
		// }

		// return temp;
	}

	likeClick = (i) => {
		// const ar = this.state;
		// ar[i] = !ar[i]
		// this.setState({
		// 	this: ar
		// })
	}

	render() {
		return (
			<div className="main-container" >
				<div className="result-container" >
					<h5 style={
						{ marginBottom: "10px" }
					} > Result </h5>
					{
						Object.keys(this.state.shopData).map((i) => {
							console.log(this.state.shopData[i].picture_main)
							return (
								<div >

									<div className="left-container" >
										<img className="imgShop"
											src={this.state.shopData[i].picture_main}
											alt={this.state.shopData[i].shop_name}
											align="left" />
									</div>


									<div className="right-container" >
										<div style={
											{ display: "block", width: "315px", float: "left", fontSize: "18px", marginTop: "10px" }} > {this.state.shopData[i].shop_name}
										</div>

										<div style={
											{ height: "50px" }} >
											<img src={this.state[i] ? require("../../asset/icon/heart.png") : require("../../asset/icon/heart2.png")}
												onClick={
													() => this.likeClick(i)}
												alt="heart"
												style={
													{ width: "35px", height: "35px", float: "left", marginTop: "5px", cursor: "pointer" }} />
										</div>

										<div style={{ display: "block", width: "340px", wordWrap: "break-word", height: "90px", paddingTop: "10px", fontSize: "12px" }} > {this.state.shopData[i].detail} </div>
										<div className="detailShop" style={{ paddingTop: "5px" }} > open - close: { /*{this.state.shopData[i].open_close}*/} </div>
										<div className="detailShop" > location: {this.state.shopData[i].address} </div> { /* <div className="detailShop" > type : {this.state.shopData[i].type} </div> */}
										<div className="detailShop" > contact: {this.state.shopData[i].phone_number.replace('+66', 0)} </div>
										<div className="learnBox" > LEARN MORE </div>

										{
											/* <BookingTime sm={true} />
																					<div style={
																						{ maxHeight: '240px', overflow: 'auto' }} > {
																							Object.keys(partyData).map((i) => {
																								return (< PartyList partyData={partyData[i]}
																									key={i}
																									sm={true}
																								/>)
																							})}
																					</div> */
										}

									</div>
									<hr className="hrcss"
										style={
											{ height: "280px" }
										}
									/>
								</div>
							)
						})
					} <hr className="hrcss" />

				</div>
			</div>
		);
	}
}
export default Result;