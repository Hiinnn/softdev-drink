import React, { Component } from 'react';
import Axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

import './Nav-bar.css';

// class navBar extends React {
class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            profile: null,
            searchKey: '',
            redirect: '',
            home: ''
        }
        this.search = this.search.bind(this)
        this.loggedIn = this.loggedIn.bind(this)
    }

    componentDidMount = () => {
        // if logged in before -> re login
        if (localStorage.getItem('access') !== null) {
            this.loggedIn();
        }
    }

    componentDidUpdate = () => {
        // refresh navbar when login 
        if (this.props.auth && this.state.profile === null && this.state.shopId === null) {
            this.loggedIn();
        }
        // refresh navbar when logout
        else if (!this.props.auth && this.state.profile !== null) {
            this.props.loggedOut();
        }
    }

    search = () => {
        const key = this.state.searchKey
        const redirect = '/search'

        localStorage.setItem('searchKey', key);

        this.setState({
            searchKey: '',
        })

        // redirect to search path
        this.render = () => {
            return <>
                {this.navComponent()}
                <Redirect to={{ pathname: redirect, state: { key: key } }} />
            </>
        }
    }

    handleChange = (e) => {
        // change state when search
        this.setState({ searchKey: e.target.value })
    }

    loggedIn = () => {
        const url = localStorage.getItem('url');
        const token = localStorage.getItem('access');
        const role = localStorage.getItem('role');

        // set home page for each role
        switch (role) {
            case 'dk':
                Axios.get(`${url}/user/profile/my_profile/`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then((res) => {
                        if (this.state.profile !== res.data.picture) {
                            this.setState({
                                profile: res.data.picture,
                                home: `/`
                            });
                        }
                    })
                    .catch((err) => {
                        console.log('get profile error', err.response)
                    })
                break;
            case 'sm':
                Axios.get(`${url}/manager/profile/my_profile/`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then((res) => {
                        this.setState({
                            shopId: res.data.related_shop.shop_id,
                            home: `/shop/${res.data.related_shop.shop_id}`
                        });
                    })
                    .catch((err) => {
                        console.log('get profile error', err.response)
                    })
                break;
            case 'ow':
                if (this.state.home !== '/owner')
                    this.setState({
                        home: `/owner`
                    })
                break;
            default:
                break;
        }
    }

    navComponent = () => {
        return (
            <div className="nav-bar-container">

                {/* Home Logo */}
                <Link to={this.state.home}>
                    <div className="drink-logo"> DRINK </div>
                </Link>

                {/* Login */}
                {!this.props.auth && <Link to="/login"><div className="nav-bar-button" style={{ paddingRight: 20 }}> Login </div></Link>}

                {/* Logout */}
                {
                    this.props.auth &&
                    <div className="nav-bar-button"
                        onClick={() => {
                            this.props.logout()
                            this.setState({
                                shopId: null,
                                profile: null
                            });
                            this.render = () => {
                                return <>
                                    {this.navComponent()}
                                    <Redirect to='/' />
                                </>
                            }
                        }}
                        style={{ paddingRight: 20 }}> Logout </div>
                }

                {/* Redirect to Profile (drinker) */}
                {
                    this.props.auth &&
                    localStorage.getItem('role') === 'dk' &&
                    <Link to='/drinker/profile/'>
                        <img src={`${localStorage.getItem('url')}${this.state.profile}`} className="nav-profile-pic" alt="" />
                    </Link>
                }

                {/* Searchbox (drinker) */}
                {
                    localStorage.getItem('role') !== 'ow' &&
                    localStorage.getItem('role') !== 'sm' &&
                    <div className="search-box-wrapper">
                        <input className="search-box" type="text"
                            placeholder="Search"
                            onChange={this.handleChange}
                            value={this.state.searchKey}
                            onKeyPress={event => {
                                if (event.key === 'Enter') this.search();
                            }} />
                        <div className="search-icon-wrapper">
                            <img className="search-icon" src={require('../../asset/Navbar/searchIcon.png')} alt="" onClick={this.search}></img>
                        </div>
                    </div>
                }
            </div>
        )
    }

    render() {
        return (this.navComponent())
    }
}

export default Navbar;