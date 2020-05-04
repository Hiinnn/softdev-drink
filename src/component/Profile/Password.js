import React, { Component } from 'react';
import './Password.css';

export default class Password extends Component {

    constructor(props) {

        super(props);

        this.state = {
            editable: false
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

        // e.preventDefault();

        const password = e.target.password;
        this.setState({
        })

        console.log(this.state)
    }

    render() {

        return (

            <div className="password-container" style={{ marginLeft: "50%" }}>

                <label className="textheader" style={{ marginLeft: 20 }}> Password Reset </label>
                <br /><br />

                <label className="text" style={{ marginLeft: 20 }}> Current Password
                    <input className="input-password" type="password" style={{ marginLeft: 104 }}
                        password="old_password"
                        disabled={!this.state.editable}
                        onChange={this.handleChange}
                    >
                    </input></label>
                <br /><br />

                <label className="text" style={{ marginLeft: 20 }}> New Password
                    <input className="input-password" type="password" style={{ marginLeft: 129 }}
                        password="new_password"
                        disabled={!this.state.editable}
                        onChange={this.handleChange}
                    >
                    </input></label>
                <br /><br />

                <label className="text" style={{ marginLeft: 20 }}> Confirm New Password
                    <input className="input-password" type="password" style={{ marginLeft: 60 }}
                        password="new_password_confirm"
                        disabled={!this.state.editable}
                        onChange={this.handleChange}
                    >
                    </input></label>
                <br /><br /><br />

                <div className="two-button" onClick={this.edit}>
                    {this.state.editable === true ? 'Save Password' : 'Reset my password'}
                </div>
                <br /><br /><br />

            </div>
        );
    }
}
