import React from 'react';
import './nav-bar.css';

// class navBar extends React {
function navBar(){
    return (
        <div className="nav-bar-wrapper">
            <a className="logo" href=""><img src={require('../../asset/drink-logo.png')}/></a>
            <a className="profile" href=""></a>

        </div>
    ) ;
}

export default navBar;