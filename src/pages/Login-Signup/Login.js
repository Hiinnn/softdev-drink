import React from 'react';
import LoginForm from '../../component/Login-Sigup/Login-form';
import Navbar from '../../component/Nav-bar/Nav-bar'

export default class LoginPage extends React.Component {
    render() {
        return (
            <div>
                <Navbar />
                <LoginForm />
            </div>
        )
    }
}