import React from 'react';
import './Nav-bar.css';

// class navBar extends React {
function Navbar(){
    return (
        <div className="nav-bar-container">
            <a className="logo" href=""><img src={require('../../asset/drink-logo.png')}/></a>
            <div className="search-box-container">
                <input className="search-box" type="text" placeholder="Search"></input>
                <div><i className="search-icon"></i></div>
            </div>
            <a className="stat" href=""></a>
            <a className="profile" href=""></a>
        </div>
    ) ;
}

export default Navbar;