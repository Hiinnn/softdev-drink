import React from 'react';
import Navbar from '../../component/Nav-bar/Nav-bar';
/*import Table from '../../component/Table/Table';*/
import './TableCheck.css';

class TableCheck extends React.Component {
	constructor() {
		super()
		this.data = {
			total: [1000, 8000, 6800]
		}
	}
	render() {
		return (
			<div >
				<Navbar />
				<div className="tableCheck-container" >
					<table className="tbCheck" >
						<thead >
							<th className="thCheck" > Table </th>
							<th className="thCheck" > Menu </th>
							<th className="thCheck" > Total </th>
							<th className="thCheck" > Check </th>
							<th className="thCheck" > Clear </th>
						</thead>

						{
							this.data.total.map((total, i) => {
								return (
									<tbody key={'total' + i} >
										<tr className="data" >
											<td style={
												{ padding: "3%" }} > {i + 1} </td>
											<td className="add" > add </td>
											<td> {total} </td> <td className="true" > ✔ </td>
											<td className="false" > ✘ </td>
										</tr>
									</tbody>
								);
							})
						}
					</table>
					<img className="imageplus"
						src={require("../../asset/MainBackground/plus.png")}
						alt="" />
				</div>
			</div>
		);
	}
}
export default TableCheck;