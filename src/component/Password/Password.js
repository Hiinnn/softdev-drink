import React, { Component } from 'react';
import './Password.css';

export default class Password extends Component {

    handleClick = () => {
        alert('Save')
    };

    render() {
        
        return (

            <div className="password-container" style={{ marginLeft: "50%" }}>

                <label className="textheader" style={{ marginLeft: 20 }}> Password Reset </label>
                <br /><br />

                <label className="text" style={{ marginLeft: 20 }}> Current Password <input className="input" type="password" style={{ marginLeft: 104 }}>
                </input></label>
                <br /><br />

                <label className="text" style={{ marginLeft: 20 }}> New Password <input className="input" type="password" style={{ marginLeft: 129 }}>
                </input></label>
                <br /><br />

                <label className="text" style={{ marginLeft: 20 }}> Confirm New Password <input className="input" type="password" style={{ marginLeft: 60 }}>
                </input></label>
                <br /><br /><br />

                <div className="two-button" onClick={this.handleClick}> Save Password </div>
                <br /><br /><br />

            </div>
        );
    }
}
