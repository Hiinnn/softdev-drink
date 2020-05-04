import React from 'react';
import './CheckTable.css';
import { partyOrderArray } from '../../data/NEW/partyOrder';
import Axios from 'axios';

class CheckTable extends React.Component {
	constructor() {
		super()
		this.state = {
			total: [1000, 8000, 6800, 7800, 4920, 1230, 5320, 5890],
			party: partyOrderArray
		}
	}

	componentDidMount() {
		this.getManagerData()
	}

	getManagerData() {
		const date = new Date()
		const url = `${localStorage.getItem('url')}/ordering/party/bill/?search=${date.getFullYear()}-${(date.getMonth + 1) % 12}-${date.getDate()}`
		const head = {
			Authorization: `Bearer ${localStorage.getItem('access')}`
		}
		Axios.get(url, { headers: head })
			.then((res) => {
				console.log('check ta', res)
			})
			.catch((err) => {
				console.log('check ta err', err.response);
			})
	}

	render() {
		return (
			<div className="tableCheck-container" >
				<table className="tbCheck"
					style={
						{ float: 'left' }} >
					<thead >
						<tr >
							<th className="thCheck" > Table </th>
							<th className="thCheck" > Menu </th>
							<th className="thCheck" > Total </th>
							<th className="thCheck" > Check </th>
							<th className="thCheck" > Clear </th>
						</tr>
					</thead>

					<tbody>
						{
							Object.keys(this.state.party).map((i) => {
								return (
									<tr className="data-tableCheck"
										key={i} >
										<td style={{ padding: "3%" }} > {this.state.party[i].party_id} </td>
										<td className="add" > add </td>
										<td > {this.state.party[i].total} </td>
										<td className="true" > ✔ </td>
										<td className="false" > ✘ </td>
									</tr>
								);
							})
						}
					</tbody>
				</table>
				<div style={{ paddingTop: '280px', width: '500px', height: '25px', float: 'left', position: 'relative', left: '50%', transform: 'translateX(-50%)' }} >
					<img className="imageplus"
						src={require("../../asset/icon/plus.png")}
						alt="" />
				</div>
			</div>
		);
	}
}
export default CheckTable;