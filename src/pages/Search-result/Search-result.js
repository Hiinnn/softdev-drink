import React from 'react';
import Navbar from '../../component/Nav-bar/Nav-bar';
import Result from '../../component/Result/Result';
import './Search-result.css';

class SearchResult extends React.Component {

	render() {
		return (
			<div >
				<Navbar />
				<Result />
			</div>
		);
	}
}
export default SearchResult;