import React, { Component } from 'react';
import './Nav-bar.css';
import { Link } from 'react-router-dom';

// class navBar extends React {
class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLogin: this.props.isLogin,
        }
    }

    login = () => {
        this.setState({
            isLogin: !this.state.isLogin
        })
    };

    render() {
        return (

            <div className="nav-bar-container">
                <Link to="/home"><div className="drink-logo"> DRINK </div></Link>

                {!this.state.isLogin && <Link to="/login"><div className="nav-bar-button" onClick={this.login} style={{ paddingRight: 20 }}> Login </div></Link>}

                {this.state.isLogin && <div className="nav-bar-button" onClick={this.login} style={{ paddingRight: 20 }}> Logout </div>}
                {this.state.isLogin && <a href="eiei"><img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" className="nav-profile-pic" alt="" /></a>}

                <div className="search-box-wrapper">
                    <input className="search-box" type="text" placeholder="Search"></input>
                    <div className="search-icon-wrapper">
                        <img className="search-icon" src={require('../../asset/Navbar/searchIcon.png')} alt=""></img>
                    </div>
                </div>
            </div>
        );
    }
}

export default Navbar;


