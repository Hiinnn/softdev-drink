import React from 'react'

import './Myfav.css';
import './Profile.css';
import './Password.css';


import userData from '../../data/NEW/Drinker';
import Axios from 'axios';
import { Link } from 'react-router-dom';

export default class UserProfile extends React.Component {

    constructor(props) {
        super(props);
        this.dataForm = {
            first_name: ['Name', 'text', 118],
            email: ['Email', 'email', 116],
            birth_date: ['Birth Month', 'month', 65],
            phone_number: ['Phone', 'text', 111],
        }
        this.passForm = {
            old_password: ['Old Password', 'password', 55],
            new_password: ['New Password', 'password', 48],
            new_password_confirm: ['Confirm Password', 'password', 20],
        }

        this.state = {
            userData: userData,
            shopArray: '',
            passwordChange: {
                old_password: '',
                new_password: '',
                new_password_confirm: '',
            },
            editableData: false,
            editablePassword: false,
        };

        this.editData = this.editData.bind(this)
        this.editPassword = this.editPassword.bind(this)
        this.handleDataChange = this.handleDataChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
    }

    componentDidMount() {
        this.getUserData()
        this.getUserFav()
    }

    getUserData() {
        const url = `${localStorage.getItem('url')}/user/profile/my_profile/`
        const head = {
            Authorization: `Bearer ${localStorage.getItem('access')}`
        }

        Axios.get(url, { headers: head })
            .then((res) => {
                let newData = res.data;
                newData.birth_date = newData.birth_date.slice(0, 7);
                newData.phone_number = newData.phone_number.replace('+66', 0)
                this.setState({
                    userData: newData
                })
            })
            .catch((err) => {
                console.log('prof', err.response);
            })
    }

    getUserFav() {
        const url = `${localStorage.getItem('url')}/user/profile/favorite_shop/`
        const head = {
            Authorization: `Bearer ${localStorage.getItem('access')}`
        }

        Axios.get(url, { headers: head })
            .then((res) => {
                let newData = res.data;
                this.setState({
                    shopArray: newData
                })
                console.log(this.state);

            })
            .catch((err) => {
                console.log('fav err', err.response);
            })
    }

    handleDataChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const newData = { ...this.state.userData };

        newData[name] = value;

        this.setState({
            userData: newData
        })
    }

    editData = () => {
        if (this.state.editableData === true) {
            const data = {
                new_first_name: this.state.userData.first_name,
                new_email: this.state.userData.email,
                new_birth_date: `${this.state.userData.birth_date}-01`,
                new_phone_number: this.state.userData.phone_number.replace(/^0/, '+66'),
            }
            console.log(data);

            this.patchChangeProfile(data)
        }

        this.setState(() => {
            console.log('toggle data');
            return { editableData: !this.state.editableData }
        })

    }

    handlePasswordChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const newPassword = { ...this.state.passwordChange };

        newPassword[name] = value;
        console.log(name, value, newPassword, e);

        this.setState({
            passwordChange: newPassword
        })
    }

    editPassword = () => {
        if (this.state.editablePassword === true) {
            const data = {
                old_password: this.state.passwordChange.old_password,
                new_password: this.state.passwordChange.new_password,
                new_password_confirm: this.state.passwordChange.new_password_confirm,
            }
            this.patchChangeProfile(data)
        }

        this.setState(() => {
            console.log('toggle pass');

            return { editablePassword: !this.state.editablePassword }
        })

    }

    patchChangeProfile(body) {
        const url = `${localStorage.getItem('url')}/user/profile/my_profile/`
        const head = {
            Authorization: `Bearer ${localStorage.getItem('access')}`
        }

        Axios.patch(url, body, { headers: head })
            .then((res) => {
            })
            .catch((err) => {
                console.log(('change err', err.response));
            })
    }

    deleteFav(i) {
        const url = `${localStorage.getItem('url')}/user/profile/favorite_shop/${i}`
        const head = {
            Authorization: `Bearer ${localStorage.getItem('access')}`
        }

        Axios.delete(url, { headers: head })
            .then((res) => {
                console.log('del fav', res);
            })
            .catch((err) => {
                console.log('del fav', err.response);
            })
    }

    render() {
        return (
            <>
                <div className="picandpro-container">
                    <div className="profile-pic-container">
                        <img className="profile-pic" src={`${localStorage.getItem('url')}${this.state.userData.picture}`} width="200" height="200" align="left" alt=""></img>
                    </div>

                    <div className="profile-container">
                        <div>
                            <label className="textheader" style={{ marginLeft: 20 }} > Profile </label>
                            <br /><br />
                            {
                                Object.keys(this.dataForm).map((val) => {
                                    return (
                                        <div key={val}>
                                            <label className="text" style={{ marginLeft: 20 }}> {this.dataForm[val][0]}
                                                < input className='input-text' type={this.dataForm[val][1]} style={{ marginLeft: this.dataForm[val][2] }}
                                                    name={val}
                                                    disabled={!this.state.editableData}
                                                    value={this.state.userData[val]}
                                                    onChange={this.handleDataChange}
                                                >
                                                </input>
                                            </label>
                                            <br />
                                            <br />
                                        </div>
                                    )
                                })
                            }
                        </div>

                        <br />
                        <div className="one-button" onClick={this.editData} >
                            {this.state.editableData === true ? 'Save Profile' : 'Edit'}
                        </div>
                        <br /><br /><br />
                    </div>

                    <div className="password-container">
                        <label className="textheader" style={{ marginLeft: 20 }}> Password Reset </label>
                        <br /><br />
                        {
                            Object.keys(this.passForm).map((keys) => {
                                return (
                                    <div key={keys}>
                                        <label className="text" style={{ marginLeft: 20 }}> {this.passForm[keys][0]}
                                            <input className="input-password" type="password" style={{ marginLeft: this.passForm[keys][2] }}
                                                name={keys}
                                                disabled={!this.state.editablePassword}
                                                onChange={this.handlePasswordChange}
                                                value={this.state.passwordChange[keys]}
                                            >
                                            </input>
                                        </label>
                                        <br /><br />
                                    </div>
                                )
                            })
                        }
                        <br />
                        <div className="two-button" onClick={this.editPassword}>
                            {this.state.editablePassword === true ? 'Save Password' : 'Reset password'}
                        </div>
                        <br /><br />

                        <Link to='/drinker/party'>
                            <div className="two-button" >
                                My Party
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="myfav-main-container" >

                    <div className="myfav-container" >
                        <h5 style={{ marginBottom: "10px" }}> My favourite </h5> {
                            Object.keys(this.state.shopArray).map((i) => {
                                return (
                                    <div key={i}>
                                        <div className="left-container" >
                                            <img className="imgShop"
                                                src={this.state.shopArray[i].picture_main}
                                                alt={this.state.shopArray[i].shop_name}
                                                align="left" />
                                        </div>

                                        <div className="right-container" >
                                            <div style={{ display: "block", width: "315px", float: "left", fontSize: "18px", marginTop: "10px" }}>
                                                {this.state.shopArray[i].shop_name}
                                            </div>

                                            <div style={{ height: "50px" }}>
                                                <img src={require("../../asset/icon/heart2.png")}
                                                    onClick={() => this.deleteFav(this.state.shopArray[i].pk)}
                                                    alt="heart"
                                                    style={{ width: "35px", height: "35px", float: "left", marginTop: "5px", cursor: "pointer" }} />
                                            </div >

                                            <div style={{ display: "block", width: "340px", wordWrap: "break-word", height: "90px", paddingTop: "10px", fontSize: "12px" }}>
                                                {this.state.shopArray[i].detail}
                                            </div>

                                            <div className="detailShop" > location: {this.state.shopArray[i].address} </div>
                                            <div className="detailShop" > contact: {this.state.shopArray[i].phone_number.replace('+66', 0)} </div>
                                            <Link to={`/shop/${this.state.shopArray[i].pk}`}><div className="learnBox" > LEARN MORE </div></Link>
                                        </div>
                                        <hr className="hrcss"
                                            style={{ height: "280px" }}
                                        />
                                    </div >
                                )
                            })
                        } <hr className="hrcss" />
                        <br />
                    </div>
                </div >
            </>
        );
    }
}