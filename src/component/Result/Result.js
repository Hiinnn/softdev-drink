import React, { Component } from 'react';
import './Result.css';
import { Results } from '../../data/ResultData';

class Result extends Component {

	constructor(props) {
		super(props);
		this.state = { toggle: true };
	}

	likeClick = () => {
		this.setState(state => ({
			toggle: !state.toggle
		}));
	}

	render() {
		return ( <
			div className = "main-container" >
			<
			div className = "result-container" >
			<
			h5 style = {
				{ marginBottom: "10px" } } > Result < /h5> {
				Results.map((result) => {
					return ( <
						div >
						<
						div className = "left-container" >
						<
						img className = "imgShop"
						src = { result.url }
						alt = { result.name }
						align = "left" / >
						<
						br / >
						<
						div style = {
							{ clear: "both", width: "450px", height: "110px", fontSize: "12px" } } > { result.about } < /div> <
						div className = "learnBox" > LEARN MORE < /div> <
						div className = "detailShop" > open - close: { result.open_close } < /div> <
						div className = "detailShop" > location: { result.location } < /div> <
						div className = "detailShop" > type: { result.type } < /div> <
						div className = "detailShop" > contact: { result.contact } < /div> <
						/div>

						<
						div className = "right-container" >
						<
						div style = {
							{ width: "315px", float: "left", fontSize: "18px", marginTop: "5px" } } > { result.name } <
						/div> <
						div style = {
							{ height: "50px" } } >
						<
						img src = { this.state.toggle ? require("../../asset/icon/heart.png") : require("../../asset/icon/heart2.png") }
						onClick = { this.likeClick }
						alt = "heart"
						style = {
							{ width: "35px", height: "35px", float: "left", marginTop: "5px" } }
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