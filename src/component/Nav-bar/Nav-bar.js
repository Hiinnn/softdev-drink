import React, { Component } from 'react';
import './Nav-bar.css';
import { Link } from 'react-router-dom';
import Axios from 'axios';

// class navBar extends React {
class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            profile: null,
        }
        this.loggedIn = this.loggedIn.bind(this)
    }

    componentDidMount = () => {
        if (localStorage.getItem('access') !== null) {
            this.loggedIn();
        }
    }

    componentDidUpdate = () => {
        if (this.props.auth && this.state.profile === null) {
            this.loggedIn();
        }
        else if (!this.props.auth && this.state.profile !== null) {
            this.loggedOut();
        }
    }

    loggedIn = () => {
        const url = localStorage.getItem('url');
        const token = localStorage.getItem('access');
        const role = localStorage.getItem('role');

        switch (role) {
            case 'dk':
                Axios.get(`${url}/user/profile/my_profile/`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then((res) => {
                        if (this.state.profile !== res.data.picture) {
                            this.setState({ profile: res.data.picture });
                        }
                    })
                break;
            case 'ow':
                break;
            case 'sm':
                break;
            default:
                break;
        }
    }

    loggedOut = () => {
        this.setState({ profile: null });
        localStorage.removeItem('role');
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        localStorage.removeItem('profile');
    }

    render() {
        return (

            <div className="nav-bar-container">
                <Link to="/home"><div className="drink-logo"> DRINK </div></Link>
                {!this.props.auth && <Link to="/login"><div className="nav-bar-button" style={{ paddingRight: 20 }}> Login </div></Link>}

                {this.props.auth && <div className="nav-bar-button" onClick={this.props.logout} style={{ paddingRight: 20 }}> Logout </div>}
                {this.props.auth && <a href="eiei"><img src={`${localStorage.getItem('url') + this.state.profile}`} className="nav-profile-pic" alt="" /></a>}

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