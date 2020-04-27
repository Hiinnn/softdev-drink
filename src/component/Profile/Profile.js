import React, { Component } from 'react';
import './Profile.css';
import userData from '../../data/NEW/Drinker';

export default class Profile extends Component {

    constructor(props) {

        super(props);

        this.userData = userData;

        this.state = {
            editable: false,
            userData: userData
        };
        this.edit = this.edit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    edit = () => {

        if (this.state.editable === true) {
            //send data to back-end
        }
        this.setState(() => {
            return { editable: !this.state.editable }
        })

    }

    handleChange = (e) => {

        e.preventDefault();

        const name = e.target.name;
        const value = e.target.value;
        const newData = {...this.state.userData};

        newData[name] = value;

        this.setState({
            userData: newData
        })
    }

    render() {
        return (
            <div className="picandpro-container">

                <div className="profile-pic-container">
                    <img className="profile-pic" src={require('../../asset/Profile/UserIcon.png')} width="200" height="200" align="left" alt=""></img>
                </div>

                <div className="profile-container">
                        <div>
                            <label className="textheader" style={{ marginLeft: 20 }} > Profile </label>
                            <br /><br />

                            <label className="text" style={{ marginLeft: 20 }}> Name
                            <input className="input" type="text" style={{ marginLeft: 89 }}
                                    name="new_name"
                                    disabled={!this.state.editable}
                                    value={this.state.userData.username}
                                    onChange={this.handleChange} />
                            </label>
                            <br /><br />

                            <label className="text" style={{ marginLeft: 20 }}> E-mail <input className="input" type="text" style={{ marginLeft: 82 }}
                                /*disabled={!this.state.editable}*/
                                value={this.state.userData.email}
                                onChange={this.handleChange}
                            >
                            </input></label>
                            <br /><br />

                            <label className="text" style={{ marginLeft: 20 }}> Mobile <input className="input" type="text" style={{ marginLeft: 82 }}
                                /*disabled={!this.state.editable}*/
                                value={this.state.userData.phone_number}
                                onChange={this.handleChange}
                            >
                            </input> </label>
                            <br /><br />

                            <label className="text" style={{ marginLeft: 20 }}> Date of birth <input className="input" type="text" style={{ marginLeft: 30 }}
                                /*disabled={!this.state.editable}*/
                                value={this.state.userData.birth_date}
                                onChange={this.handleChange}
                            >
                            </input></label>
                            <br /><br /><br />

                            <label className="text" style={{ marginLeft: 20 }}> Description </label>
                            <br /><br />

                            <textarea className="textarea" style={{ marginLeft: 20 }} type="text" placeholder={"Description..."} ></textarea>
                            <br /><br />
                        </div>
                    <div className="one-button" onClick={this.edit} >
                        {this.state.editable === true ? 'Save Profile' : 'Edit'}
                    </div>
                    <br /><br /><br />

                </div>

            </div>
        );
    }
}
