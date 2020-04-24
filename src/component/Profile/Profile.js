import React, { Component } from 'react';
import './Profile.css';

export default class Profile extends Component {
    
    handleClick = () => {
        alert('Save')
    };

    render() {
        return (
            <div className="picandpro-container">

                <div className="profile-pic-container">
                    <img className="profile-pic" src={require('../../asset/Profile/UserIcon.png')} width="200" height="200" align="left" alt=""></img>
                </div>

                <div className="profile-container">

                    <label className="textheader" style={{ marginLeft: 20 }} > Profile </label>
                    <br /><br />

                    <label className="text" style={{ marginLeft: 20 }}> Name < input className="input" type="text" style={{ marginLeft: 89 }}>
                    </input></label>
                    <br /><br />

                    <label className="text" style={{ marginLeft: 20 }}> E-mail <input className="input" type="text" style={{ marginLeft: 82 }}>
                    </input></label>
                    <br /><br />

                    <label className="text" style={{ marginLeft: 20 }}> Mobile <input className="input" type="text" style={{ marginLeft: 82 }}>
                    </input> </label>
                    <br /><br />

                    <label className="text" style={{ marginLeft: 20 }}> Date of birth <input className="input" type="text" style={{ marginLeft: 30 }}>
                    </input></label>
                    <br /><br /><br />

                    <label className="text" style={{ marginLeft: 20 }}> Gender <input type="radio" name="gender" style={{ marginLeft: 75 }}>
                    </input> <label> Male </label> <input type="radio" name="gender" style={{ marginLeft: 50 }}></input> <label> Female </label> </label>
                    <br /><br />

                    <label className="text" style={{ marginLeft: 20 }}> Description </label>
                    <br /><br />

                    <textarea className="textarea" style={{ marginLeft: 20 }} type="text" placeholder={"Description..."} ></textarea>
                    <br /><br />

                    <div className="one-button" onClick={this.handleClick} > Save Profile </div>
                    <br /><br /><br />

                </div>

            </div>
        );
    }
}
