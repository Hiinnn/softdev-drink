import React from 'react';
import Navbar from '../../component/Nav-bar/Nav-bar';
import './TableCheck.css';
import CheckTable from '../../component/CheckTable/CheckTable';

class TableCheck extends React.Component {

	render() {
		return ( <
			div >
			<
			Navbar / >
			<
			div className = "tableCheck-container" >
			<
			CheckTable / >
			<
			/div> <
			/div>
		);
	}
}
export default TableCheck;