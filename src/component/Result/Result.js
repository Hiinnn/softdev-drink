import React, { Component } from 'react';
import './Result.css';
import { Results } from '../../data/ResultData';

class Result extends Component {

	constructor(props) {
		super(props);
		this.state = this.createLike();
	}

	createLike = () => {
		let temp = []
		for (let i = 0; i < Results.length; i++) {
			temp.push(Results[i].like)
		}
		return temp;
	}

	likeClick = (i) => {
		const ar = this.state;
		ar[i] = !ar[i]
		this.setState({
			this: ar
		})
	}

	render() {
		return ( <
			div className = "main-container" >
			<
			div className = "result-container" >
			<
			h5 style = {
				{ marginBottom: "10px" } } > Result < /h5> {
				Object.keys(Results).map((i) => {
					console.log(this.state[i])
					return ( <
						div >
						<
						div className = "left-container" >
						<
						img className = "imgShop"
						src = { Results[i].url }
						alt = { Results[i].name }
						align = "left" / >
						<
						br / >
						<
						div style = {
							{ clear: "both", width: "450px", height: "110px", fontSize: "12px" } } > { Results[i].about } < /div> <
						div className = "learnBox" > LEARN MORE < /div> <
						div className = "detailShop" > open - close: { Results[i].open_close } < /div> <
						div className = "detailShop" > location: { Results[i].location } < /div> <
						div className = "detailShop" > type: { Results[i].type } < /div> <
						div className = "detailShop" > contact: { Results[i].contact } < /div> <
						/div>

						<
						div className = "right-container" >
						<
						div style = {
							{ width: "315px", float: "left", fontSize: "18px", marginTop: "5px" } } > { Results[i].name } <
						/div> <
						div style = {
							{ height: "50px" } } >
						<
						img src = { this.state[i] ? require("../../asset/icon/heart.png") : require("../../asset/icon/heart2.png") }
						onClick = {
							() => this.likeClick(i) }
						alt = "heart"
						style = {
							{ width: "35px", height: "35px", float: "left", marginTop: "5px", cursor: "pointer" } }
						/> <
						/div> <
						hr style = {
							{ borderTop: "1.5px solid #1e1e1e" } }
						/> <
						div style = {
							{ height: "80px" } } > { /*createParty*/ } < /div> <
						hr style = {
							{ borderTop: "1.5px solid #1e1e1e" } }
						/> <
						div > { /*showParty*/ } < /div> <
						/div> <
						hr className = "hrcss"
						style = {
							{ height: "490px" } }
						/> <
						/div>
					)
				})
			} <
			hr className = "hrcss" / >
			<
			/div> <
			/div>
		);
	}
}
export default Result;