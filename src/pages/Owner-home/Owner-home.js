import React from 'react';
import Navbar from '../../component/Nav-bar/Nav-bar';
import ShopOwnerTable from '../../component/ShopOwnerTable/ShopOwnerTable';
import './Owner-home.css';

class OwnerHome extends React.Component {
	render() {
		return (
			<div>
				<Navbar />
				<div className="ownerhome-container">
					<ShopOwnerTable />
				</div>
			</div>
		);
	}
}
export default OwnerHome;