import React, {Component} from 'react';
import './Nav-bar.css';

// class navBar extends React {
class Navbar extends Component{
    clicked = () => {
        alert('eiei');
        // go to sign up page
    };

    render() {
        return (
            <div className="nav-bar-container">
                <div className="drink-logo"> DRINK </div>
                <div className="nav-bar-button" onClick={this.clicked} style={{paddingRight:20}}> Sign-in </div>
                <div className="search-box-wrapper">
                    <input className="search-box" type="text" placeholder="Search"></input>
                    <div className="search-icon-wrapper">
                        <img className="search-icon" src={require('../../asset/Navbar/searchIcon.png')} alt=""></img>
                    </div>
                </div>
            </div>
        ) ;
    }
}

export default Navbar;


