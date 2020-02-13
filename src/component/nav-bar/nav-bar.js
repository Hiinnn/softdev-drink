import React from 'react';
import './Nav-bar.css';

// class navBar extends React {
function Navbar(){
    return (
        <div className="nav-bar-wrapper">
            <a className="logo" href=""><img src={require('../../asset/drink-logo.png')}/></a>
            <a className="stat">eiei</a>
            <a className="profile" href=""></a>
        </div>
    ) ;
}

export default Navbar;