import React, { Component } from 'react';
import './Result.css';
import { Results } from '../../data/ResultData';
import BookingTime from '../Party/BookingTime';
import PartyList from '../Party/Party';
import shopData from '../../data/NEW/Shop';

const shopDataArray = [
	{
		"shop_id": 1,
		"shop_name": "Chill Bar BKK",
		"max_seat": 50,
		"created": "2020-04-23T13:52:24.817347Z",
		"address": "ไม่บอกหรออยู่บนโลกนี้แน่นอนนอนนอนอ",
		"phone_number": "+66882673235",
		"detail": "Starbuck ที่พาซิโอ อ่อนนุชลาดกระบัง จอดรถสะดวกสบาย ที่นั่งสองชั้น บรรยากาศชิวๆยามเช้า eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
		"updated": "2020-04-23T13:52:24.817347Z",
		"officeday": [
			{
				"weekday": 0,
				"open_time": "2020-04-24T16:15:30Z",
				"close_time": "2020-04-24T16:1532Z",
			},
			{
				"weekday": 1,
				"open_time": "2020-04-24T16:15:30Z",
				"close_time": "2020-04-24T16:1532Z",
			},
			{
				"weekday": 2,
				"open_time": "2020-04-24T16:15:30Z",
				"close_time": "2020-04-24T16:1532Z",
			},
			{
				"weekday": 3,
				"open_time": "2020-04-24T16:15:30Z",
				"close_time": "2020-04-24T16:1532Z",
			},
			{
				"weekday": 4,
				"open_time": "2020-04-24T16:15:30Z",
				"close_time": "2020-04-24T16:1532Z",
			},
			{
				"weekday": 5,
				"open_time": "2020-04-24T16:15:30Z",
				"close_time": "2020-04-24T16:1532Z",
			},
			{
				"weekday": 6,
				"open_time": "2020-04-24T16:15:30Z",
				"close_time": "2020-04-24T16:1532Z",
			},
		],
		"picture_main": require('../../asset/MainBackground/bgor.jpeg'),
		"picture_sub": [
			{
				"pk": 1,
				"url": require('../../asset/MainBackground/bgor.jpeg'),
			},
			{
				"pk": 2,
				"url": require('../../asset/MainBackground/bgor.jpeg'),
			},
		],
		"picture_mini": [
			{
				"pk": 1,
				"url": require('../../asset/MainBackground/bgor.jpeg'),
			},
			{
				"pk": 2,
				"url": require('../../asset/MainBackground/bgor.jpeg'),
			},
			{
				"pk": 3,
				"url": require('../../asset/MainBackground/bgor.jpeg'),
			},
			{
				"pk": 4,
				"url": require('../../asset/MainBackground/bgor.jpeg'),
			},
			{
				"pk": 5,
				"url": require('../../asset/MainBackground/bgor.jpeg'),
			},
		],
		"party": [
			{
				name: 'Big\'s Party',
				member: [
					{ profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
					{ profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
					{ profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
					{ profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
					{ profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
					{ profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
					{ profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
					{ profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
					{ profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
					{ profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
				]
			},
			{
				name: 'Zeer O\'s',
				member: [
					{ profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
					{ profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
					{ profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
					{ profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
					{ profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
					{ profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
					{ profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
					{ profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
					{ profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
					{ profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
					{ profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
					{ profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
				]
			},
			{
				name: 'Wachira',
				member: [
					{ profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
					{ profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
					{ profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
					{ profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
					{ profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
				]
			},
	
		],
		"like": '',
	},
	{
		"shop_id": 1,
		"shop_name": "Chill Bar BKK",
		"max_seat": 50,
		"created": "2020-04-23T13:52:24.817347Z",
		"address": "ไม่บอกหรออยู่บนโลกนี้แน่นอนนอนนอนอ",
		"phone_number": "+66882673235",
		"detail": "Starbuck ที่พาซิโอ อ่อนนุชลาดกระบัง จอดรถสะดวกสบาย ที่นั่งสองชั้น บรรยากาศชิวๆยามเช้า eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
		"updated": "2020-04-23T13:52:24.817347Z",
		"officeday": [
			{
				"weekday": 0,
				"open_time": "2020-04-24T16:15:30Z",
				"close_time": "2020-04-24T16:1532Z",
			},
			{
				"weekday": 1,
				"open_time": "2020-04-24T16:15:30Z",
				"close_time": "2020-04-24T16:1532Z",
			},
			{
				"weekday": 2,
				"open_time": "2020-04-24T16:15:30Z",
				"close_time": "2020-04-24T16:1532Z",
			},
			{
				"weekday": 3,
				"open_time": "2020-04-24T16:15:30Z",
				"close_time": "2020-04-24T16:1532Z",
			},
			{
				"weekday": 4,
				"open_time": "2020-04-24T16:15:30Z",
				"close_time": "2020-04-24T16:1532Z",
			},
			{
				"weekday": 5,
				"open_time": "2020-04-24T16:15:30Z",
				"close_time": "2020-04-24T16:1532Z",
			},
			{
				"weekday": 6,
				"open_time": "2020-04-24T16:15:30Z",
				"close_time": "2020-04-24T16:1532Z",
			},
		],
		"picture_main": require('../../asset/MainBackground/bgor.jpeg'),
		"picture_sub": [
			{
				"pk": 1,
				"url": require('../../asset/MainBackground/bgor.jpeg'),
			},
			{
				"pk": 2,
				"url": require('../../asset/MainBackground/bgor.jpeg'),
			},
		],
		"picture_mini": [
			{
				"pk": 1,
				"url": require('../../asset/MainBackground/bgor.jpeg'),
			},
			{
				"pk": 2,
				"url": require('../../asset/MainBackground/bgor.jpeg'),
			},
			{
				"pk": 3,
				"url": require('../../asset/MainBackground/bgor.jpeg'),
			},
			{
				"pk": 4,
				"url": require('../../asset/MainBackground/bgor.jpeg'),
			},
			{
				"pk": 5,
				"url": require('../../asset/MainBackground/bgor.jpeg'),
			},
		],
		"party": [
			{
				name: 'Big\'s Party',
				member: [
					{ profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
					{ profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
					{ profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
					{ profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
					{ profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
					{ profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
					{ profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
					{ profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
					{ profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
					{ profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
				]
			},
			{
				name: 'Zeer O\'s',
				member: [
					{ profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
					{ profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
					{ profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
					{ profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
					{ profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
					{ profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
					{ profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
					{ profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
					{ profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
					{ profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
					{ profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
					{ profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
				]
			},
			{
				name: 'Wachira',
				member: [
					{ profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
					{ profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
					{ profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
					{ profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
					{ profile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
				]
			},
	
		],
		"like": '',
	}
]

class Result extends Component {
	constructor(props) {
		super(props);
		this.state = {
			shopData: shopDataArray
		}
	}

	getTime = () => {
		const date = new Date()
		this.state.shopData.map((i)=>{
			
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
						{ marginBottom: "10px" }} > Result </h5> {
						Object.keys(this.state.shopData).map((i) => {
							console.log(i)
							return (
								<div >
									<div className="left-container" >
										<img className="imgShop"
											src={this.state.shopData[i].picture_main}
											alt={this.state.shopData[i].shop_name}
											align="left" />
										<br />
										<div style={
											{ clear: "both", width: "450px", height: "110px", fontSize: "12px" }} > {this.state.shopData[i].detail} </div>
										<div className="learnBox" > LEARN MORE </div>
										{/* <div className="detailShop" > open - close: {this.state.shopData[i].open_close} </div> */}
										<div className="detailShop" > location: {this.state.shopData[i].address} </div>
										{/* <div className="detailShop" > type: {this.state.shopData[i].type} </div> */}
										<div className="detailShop" > contact : {this.state.shopData[i].phone_number.replace('+66',0)} </div>
									</div>

									<div className="right-container" >
										<div style={
											{ width: "315px", float: "left", fontSize: "18px", marginTop: "5px" }
										} > {this.state.shopData[i].name}
										</div>

										<div style={
											{ height: "50px" }
										} >
											<img src={this.state[i] ? require("../../asset/icon/heart.png") : require("../../asset/icon/heart2.png")}
												onClick={() => this.likeClick(i)}
												alt="heart"
												style={{ width: "35px", height: "35px", float: "left", marginTop: "5px", cursor: "pointer" }}
											/>
										</div>

										{/* <BookingTime sm={true} />
										<div style={
											{ maxHeight: '240px', overflow: 'auto' }} > {
												Object.keys(partyData).map((i) => {
													return (< PartyList partyData={partyData[i]}
														key={i}
														sm={true}
													/>)
												})}
										</div> */}
									</div>
									<hr className="hrcss"
										style={
											{ height: "490px" }}
									/>
								</div>
							)
						})
					}
					<hr className="hrcss" />

				</div>
			</div>
		);
	}
}
export default Result;