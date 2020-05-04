import React, { Component } from 'react';
import './Nav-bar.css';
import { Link, Redirect } from 'react-router-dom';
import Axios from 'axios';

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
        if (localStorage.getItem('access') !== null) {
            this.loggedIn();
        }
    }

    componentDidUpdate = () => {
        if (this.props.auth && this.state.profile === null && this.state.shopId === null && localStorage.getItem('role') !== 'ow') {
            this.loggedIn();
        }
        else if (!this.props.auth && this.state.profile !== null) {
            this.loggedOut();
        }
    }

    setSearchType = (e) => {
        this.setState({ searchType: e.target.value })
    }

    search = () => {
        const key = this.state.searchKey
        const redirect = '/search'

        localStorage.setItem('searchKey', key);

        this.setState({
            searchKey: '',
            home: '/',
        })

        this.render = () => {
            return <>{this.navComponent()}<Redirect to={{ pathname: redirect, state: { key: key } }} /></>
        }
    }
    handleChange = (e) => {
        this.setState({ searchKey: e.target.value })
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
                        console.log('get profile error', err)
                    })
                break;
            case 'ow':
                this.setState({
                    home: `/owner`
                })
                break;
            default:
                this.setState({
                    home: `/`
                })
                break;
        }
    }

    navComponent = () => {
        return (
            <div className="nav-bar-container">
                <Link to={this.state.home}>
                    <div className="drink-logo"> DRINK </div>
                </Link>
                {!this.props.auth && <Link to="/login"><div className="nav-bar-button" style={{ paddingRight: 20 }}> Login </div></Link>}

                {
                    this.props.auth &&
                    <div className="nav-bar-button"
                        onClick={() => {
                            this.props.logout()
                            this.setState({
                                shopId: null,
                                profile: null
                            });
                        }}
                        style={{ paddingRight: 20 }}> Logout </div>
                }
                {
                    this.props.auth &&
                    localStorage.getItem('role') === 'dk' &&
                    <Link to='/drinker/profile/'>
                        <img src={`${localStorage.getItem('url') + this.state.profile}`} className="nav-profile-pic" alt=""/>
                    </Link>
                }

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
            </div>
        )
    }

    render() {
        return (this.navComponent())
    }
}

export default Navbar;