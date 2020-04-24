import React, { Component } from 'react';
import './Result.css';
import { Results } from '../../data/ResultData';
import BookingTime from '../Party/BookingTime';
import PartyList from '../Party/Party';

const partyData = [
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
]

class Result extends Component {

	constructor(props) {
		super(props);
		this.state = this.createLike();
		// this.state = [true,false,true,false,true,false]
	}

	createLike = () => {
		let temp = [];
		for (let i = 0; i < Results.length; i++) {
			temp.push(Results[i].like)
		}
		// temp = [true,false,true,false,true,false]
		return temp;
	}

	likeClick = () => {
		this.setState(state => ({
			toggle: !state.toggle
		}));
	}

	render() {
		return (
			<div className="main-container" >
				<div className="result-container" >
					<h5 style={
						{ marginBottom: "10px" }} > Result </h5> {
						Results.map((result, i) => {
							return (
								<div key={i}>
									<div className="left-container" >
										<img className="imgShop"
											src={result.url}
											alt={result.name}
											align="left" />
										<br />
										<div style={
											{ clear: "both", width: "450px", height: "110px", fontSize: "12px" }} > {result.about} </div>
										<div className="learnBox" > LEARN MORE </div>
										<div className="detailShop" > open - close: {result.open_close} </div>
										<div className="detailShop" > location: {result.location} </div>
										<div className="detailShop" > type: {result.type} </div>
										<div className="detailShop" > contact: {result.contact} </div>
									</div>

									<div className="right-container" >
										<div style={
											{ width: "315px", float: "left", fontSize: "18px", marginTop: "5px" }} > {result.name}
										</div>
										<div style={
											{ height: "50px" }} >
											<img src={this.state.toggle ? require("../../asset/icon/heart.png") : require("../../asset/icon/heart2.png")}
												onClick={this.likeClick}
												alt="heart"
												style={
													{ width: "35px", height: "35px", float: "left", marginTop: "5px" }}
											/>
										</div>

										<BookingTime sm={true} />

										<div className="party-list-container">
											{Object.keys(partyData).map((i) => {
												return (<PartyList partyData={partyData[i]} key={i} sm={true} />)
											})}
										</div>
									</div>
									<hr className="hrcss"
										style={
											{ height: "490px" }} />
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

